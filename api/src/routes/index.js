const { Router } = require('express');
const express = require('express');
const  axios  = require('axios');
const { Videogame , Gender , Post , User, Comment , PostComment } = require("../db");
const bcryptjs = require("bcryptjs");
const cookieparser = require('cookie-parser');
const { APIKEY , REFRESH_TOKEN_SECRET } = process.env;
const cors = require("cors");
const {verify} = require("jsonwebtoken")  
const {createAccessToken , createRefreshToken , sendAccessToken,
    sendRefreshToken} = require("../token.js");
const {isAuth} = require("../auth.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//const APIKEY = "3a27a92bca59469b80d14460d384d0aa";
//GET https://api.rawg.io/api/gems?key=APIKEY

const router = Router();

console.log("PostComments", PostComment)

router.use(cookieparser())
router.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))
router.use(express.urlencoded({extended:true}))
  

const getDBGames = async () => {
    try {
        let games = await Videogame.findAll({
            include : Gender
        })
        return games
    } catch (error) {
        res.send(error)
    }
}

const getApiGames = async () => {
    try {
        const data = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}`);
        const games = data.data.results.map(obj => {
            return {
                name : obj.name,    
                date : obj.released,
                rating: obj.rating,
                platforms : obj.platforms.map(obj2 => obj2.platform.name),
                desc : "Muy bonito jogo",
                genres: obj.genres.map(obj => obj.name)
            }
        })
        return games
    } catch (error) {
        return error
    }
}


const getAllGames = async () => {

    try {
        
        let arrayGames = [];
        let gamesDB = await getDBGames();
        let gamesApi = await getApiGames();
        await gamesApi.map(async obj => {
            try {
                let [game , isNew] = await Videogame.findOrCreate({
                    where:{
                        name: obj.name
                    },
                    defaults: {
                        name : obj.name,
                        desc : obj.desc,
                        date : obj.date,
                        rating : obj.rating,
                        platforms : obj.platforms
                    }
                })
                obj.genres.map(async obj2 => 
                    await Gender.findOne({
                        where : {
                            name : obj2
                        }
                    }).then(obj3 => game.addGender(obj3)))
                    arrayGames.push(game)
            } catch (error) {
                return error
            }
        })
        let games = arrayGames.concat(gamesDB);
        return games;

    } catch (error) {
        return error
    }
}

router.get("/" , async (req,res) => {
    try {
        const games = await getAllGames();
        res.send(games)
    } catch (error) {
        res.json({error: `${error}`})
    }
})

router.get("/users" , async (req,res) => {
    try {
        const users = await User.findAll();
        res.send(users)
    } catch (error) {
        res.send(error).status(404)
    }
})

router.get("/videogames/:nameGame" , async(req,res)=> {

    try {
        let {nameGame} = req.params;
        const games = await getAllGames();
        let gameSelected = games.find(obj => obj.name.toLocaleLowerCase() === nameGame.toLocaleLowerCase());
        if(gameSelected){
            res.send(gameSelected)
        } else {
            res.status(404).json({message : "No hay juego con ese nombre"})
        }
    } catch (error) {
        res.send(error)
    }
})

router.get("/videogames" , async (req,res) => {
    let { name } = req.query;
    try {
        if(!name){
            const games = await getAllGames();
            res.send(games)
        } else {
            const games = await getAllGames();
            let isGame = games.find(obj => obj.name === name)
            return res.send(isGame);
        }
        res.json({
            message : "Ocurrío un problema, vuelve a cargar por favor"
        })
    } catch (error) {
        res.send(error).status(404)
    }
})

router.post("/videogames" , async(req,res) => {

    let {name , desc , date , rating , platforms , gender} = req.body;
    try {
        if(!name || !desc) return res.send("Completar toda la data");
        let isGame = await Videogame.findOne({
            where: {
                name
            }
        });
        if(isGame){
            return res.send("Este juego ya fue creado")
        }
        let newGame = await Videogame.create({
            name,
            desc,
            date,
            rating,
            platforms,
            createnOnDb : true
        });
        if(newGame){
            gender.map(async obj => 
                await Gender.findOne({
                    where : {
                        name : obj
                    }
                }).then(obj => newGame.addGender(obj))
            );
            //await newGame.save()
            return res.send(newGame)
        }
        return res.status(404).send("algo salio mal")
    } catch (error) {
        res.send(error).status(404)
    }
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/genre" , async(req,res) => {

    try {
        let data = await axios.get("https://api.rawg.io/api/genres?key=" + APIKEY);
        let types = data.data.results.map(obj => obj.name);
        types.map(obj => {
            Gender.findOrCreate({where : {name :obj}})
        })
        res.send(types)
    } catch (error) {
        res.status(404).send(error)
    }
})


router.get("/videogame/:idGame" , async (req,res) => {

    let {idGame} = req.params
    try {

        let info = await getAllGames();
        let game = info.find(obj => obj.id === idGame.toString());
        if(!game) return res.send("No hay juego con ese ID").status(404)
        res.send(game);

    } catch (error) {
        res.status(404).send(error)
    }
})

router.get("/comments" , async(req,res)=>{
    
    let {id} = req.query;
    console.log(id);
    try {
        if(!id){
            let comments = await Comment.findAll();
            return res.send(comments)
        }
        let comments = await Comment.findAll({
            where : {
                videogameId : id
            }
        })
        return res.send(comments)
    } catch (error) {
        res.send("error").status(404)
    }
})

router.post("/leaveComment" , async(req,res) => {
    
    let {title,text,userId,videogameId} = req.body;
    
    try {
        if(!title || !text || !userId || !videogameId){

            res.json({
                message : "completar todos los campos"
            });

        } else {
            let comment = await Comment.create({
                title,
                text
            });
            let user = await User.findOne({
                where : {
                    id  : Number(userId)
                }
            })
            let info = await getAllGames();
            let game = info.find(obj => obj.id === videogameId.toString());
    
            await comment.setUser(user)
            await comment.setVideogame(game)
    
            res.send(game)
        }
    } catch (error) {
        res.status(404).send(error)
    }
});

/* router.post("/createUser" , async(req,res)=> {

    try {
        let {name, lastName, password, favs, text} = req.body;
        if(!name || !lastName || !password) return res.send("Estos campos son obligatorios");
        let newUser = await User.create({
            name, lastName, password, favs, text
        });
        res.status(404).send(newUser)
    } catch (error) {
        res.send(error).status(404)
    }


}) */

router.post("/createPost" , async(req,res) => {


    try {
        let {title , text , idUser} = req.body;
        if(!title || !text){
            return res.status(404).send("Complete los campos para crear el posteo")
        }
        let post = await Post.create({
            title , text
        });
        let user = await User.findOne({
            where : {
                id  : Number(idUser)
            }
        })

        await post.setUser(user);
        res.send(post)

    } catch (error) {
        res.status(404).send(error)
    }

})

router.get("/getPosts" , async (req,res) => {
    try {
        let posts = await Post.findAll();
        res.send(posts)
    } catch (error) {
        res.send(error)
    }
})

router.post("/post/comment/:idPost" , async(req,res) => {
    try {
        let {idPost} = req.params;
        let {title , text , idUser} = req.body;
        console.log(idUser , idPost);
        if(!title || !text) return res.json({message : "Completa todos los campos para comentar"});
        let comment = await PostComment.create({
            title,
            text
        })
        let post = await Post.findOne({
            where : {
                id : Number(idPost)
            }
        })
        let user = await User.findOne({
            where : {
                id : Number(idUser)
            }
        })

        console.log(post);

        await comment.setPost(post);
        await comment.setUser(user);

        res.send(comment)

    } catch (error) {
        res.send(error)
    }
})

router.get("/postComments" , async(req,res) => {
    try {
        let posts = await PostComment.findAll();
        res.send(posts);
    } catch (error) {
        res.send(error)
    }
})

router.post("/createUser" , async (req,res)=> {
    try {
        let {name , lastName , password, email} = req.body;

        if(!name || !lastName || !password || !email) {

            return res.json({
                message :
                "Debe completar todo los campos para crear un nuevo usuario"
            })

        }

        let isEmail = await User.findOne({
            where : {
                email
            }
        })
        if(isEmail) return res.json({
            message : "Es mail ya fue registrado"
        })

        bcryptjs.hash(password, 10).then((hash) => {
            User.create({
                name,
                lastName,
                email,
                password : hash
            }).then(() => {
                return res.status(200).json("Usuario registrado, con éxito!");
              })
              .catch((err) => {
                if (err) {
                  return res.status(400).json({ error: err });
                }
              });
        })


    } catch (error) {
        res.send(error).status(404);
    }
})

router.post("/loginUser" , async(req,res)=> {
    
    try {
        let {email , password} = req.body;
        let user = await User.findOne({
            where : {
                email,
            }
        })
        if(user){ 
            console.log(user.id)  
            bcryptjs.compare(password, user.password, async function(err, res2) {
                if(res2){
                    const accesToken = createAccessToken(user.id);
                    const refreshToken = createRefreshToken(user.id);
                    await User.update({refreshToken},{
                        where : {
                            email,
                        }
                    });
                    let user2 = await User.findOne({
                        where : {
                            email,
                        }
                    })
                    console.log("refresh:" , refreshToken)
                    sendRefreshToken(res, refreshToken);
                    sendAccessToken(req, res, accesToken , user2);
                    console.log("headers:", req.headers)
                    /* return res.json({
                        message : "Logueo existoso",
                        user
                    }); */
                } else {
                    return res.json({
                        message : "Creedenciales incorrectas"
                    });
                }
            });
        } else {
            res.send("No hay usuarios con ese mail");
        }
    } catch (error) {
        res.send(error.message);
    }
})

router.post("/logout" , async(req,res) => {
    res.clearCookie("refreshToken" , {path : "/refresh_token"});
    return res.json({
        message : "User logged out"
    })
})

router.post("/protected" , async(req,res) => {
    console.log(req.headers)
    try {
        const userId = isAuth(req);
        if(userId){
            res.json({
                message : "this is protected data"
            })
        }
    } catch (error) {
        res.json({
            error : `${error.message}`
        })
    }
})

router.post("/refresh_token" , async (req,res) => {
    const token = req.cookies.refreshToken;
    if(!token) return res.send({accesToken : "No hay token"});
    let payload = null;
    try {
        payload = verify(token, REFRESH_TOKEN_SECRET)
    } catch (error) {
        return res.send({accesToken : "reboto en el segundo"});
    }
    console.log("payload" , payload)
    let user = await User.findOne({
        where : {
            id : payload.userId
        }
    });
    if(!user) return res.send({accesToken : "reboto en el tercero"});
    console.log("toke" , token)
    console.log("userToken" , user.refreshToken)
    if(user.refreshToken !== token) return res.send({accesToken : "reboto en el cuarto"});

    const accesToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);
    await User.update({refreshToken},{
        where : {
            email : user.email,
        }
    })
    res.send(accesToken)

})


module.exports = router;
