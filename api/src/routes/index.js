const { Router } = require('express');
const  axios  = require('axios');
const { Videogame , Gender , Post , User, Comment } = require("../db");
const { route } = require('next/dist/server/router');
const bcryptjs = require("bcryptjs");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const APIKEY = "3a27a92bca59469b80d14460d384d0aa";
//GET https://api.rawg.io/api/gems?key=APIKEY

const router = Router();

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
        //console.log(data.data)
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
        
        let arrayGames = []
        let gamesDB = await getDBGames();
        let gamesApi = await getApiGames();
        console.log(gamesApi)
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
        res.send(error).status(404)
    }
})

router.get("/:nameGame" , async(req,res)=> {
    try {
        let {nameGame} = req.params;
        const games = await getAllGames();
        let gameSelected = games.find(obj => obj.name.toLocaleLowerCase() === nameGame.toLocaleLowerCase());
        if(gameSelected){
            res.send(gameSelected)
        } else {
            res.status(404).send("No hay juego con ese nombre")
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
    } catch (error) {
        res.send(error).status(404)
    }
})

router.post("/videogames" , async(req,res) => {

    let {name , desc , date , rating , platforms , gender} = req.body;
    console.log(name , desc , date , rating , platforms , gender)
    try {
        if(!name || !desc) return res.send("Completar toda la data");
        let isGame = await Videogame.findOne({
            where: {
                name
            }
        });
        console.log("is game: ", isGame)
        if(isGame){
            return res.send("Este juego ya fue creado")
        }
        let newGame = await Videogame.create({
            name,
            desc,
            date,
            rating,
            platforms
        });
        console.log("newGame: " , newGame)
        if(newGame){
            gender.map(async obj => 
                await Gender.findOne({
                    where : {
                        name : obj
                    }
                }).then(obj => newGame.addGender(obj))
            );
            console.log(newGame)
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
            Gender.create({name :obj})
        })
        res.send(types)
    } catch (error) {
        res.status(404).send(error)
    }
})

// https://api.rawg.io/api/games?search={game}

router.get("/videogame/:idGame" , async (req,res) => {

    let {idGame} = req.params
    console.log(idGame)
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
    
    try {
        let {id} = req.query;
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
        res.send(error).status(404)
    }
})

router.post("/leaveComment" , async(req,res) => {
    
    let {title,text,userId,videogameId} = req.body;
    console.log(title,text,userId,videogameId);
    
    try {
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
        console.log(game);

        await comment.setUser(user)
        await comment.setVideogame(game)

        res.send(game)
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

    let {idUser} = req.query;
    console.log(idUser)

    try {
        let {title , text} = req.body;
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

router.post("/createUser" , async (req,res)=> {
    try {
        let {name , lastName , password, email} = req.body;
        if(!name || !lastName || !password || !email) {

            res.json({
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
            bcryptjs.compare(password, user.password, function(err, res2) {
                if(res2){
                    return res.json({
                        message : "Logueo existoso",
                        user
                    });
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
        res.send(error);
    }
})


module.exports = router;
