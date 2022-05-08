import { useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { AddNewGame } from "../Redux/actions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Div,
         Form,
         Input,
         InputSubmit,
         Label } from "../Styles/CreateGame"

const CreateGame = () => {

    const { register, handleSubmit, trigger, formState: { errors } } = useForm();
    const genres = useSelector(obj => obj.genre)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [data,setData] = useState({
        name : "",
        desc : "",
        date : "",
        rating : 0,
        platforms : "",
        genre : []
    })

    const handleChange = (e) => {
        console.log(data)   
        if(e.target.name === "rating"){
            setData({
                ...data,
                [e.target.name] : Number(e.target.value)
            }) 
        } else {
            setData({
                ...data,
                [e.target.name] : e.target.value
            })
        }
    }

    const handleGenre = (e) => {
        console.log(data);
        if(e.target.value !== "nothing") {
            let isGenre = data.genre.find(obj => obj === e.target.value)
            if(!isGenre){
                setData({
                    ...data,
                    genre : [...data.genre, e.target.value]
                })
            }
        }
        e.target.value = "nothing"
    }

    const removeGenre = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setData({
            ...data,
            genre : data.genre.filter(obj => obj !== e.target.value)
        })
    }

    const handleSubmitForm = () => {
        dispatch(AddNewGame(data));
        navigate("/home");
    }

    return (
        <Div>
            <Form onSubmit={handleSubmit(handleSubmitForm)}>
                <Label>Name</Label>
                <Input 
                    type="text" 
                    placeholder="Name" 
                    name="name" 
                    
                    {...register("name", {
                        onChange : (e) => handleChange(e),
                        required: {
                          value: true,
                          message: "Nombre requerido",
                        },
                        pattern: {
                          value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/,
                          message: "El nombre solo admite letras y espacios en blanco",
                        },
                        minLength: {
                          value: 3,
                          message: "El nombre debe contener mínimo 3 caracteres",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("name");
                      }}/>
                      {
                          errors.name && <h4>{errors.name.message}</h4>
                      }
                <Label>Desc</Label>
                <Input 
                    type="text" 
                    placeholder="Desc" 
                    name="desc" 
                    {...register("desc",{
                        onChange : (e) => handleChange(e),
                        required:{
                            value:true,
                            message: "Descripción requerida"
                        }
                    })}
                    onKeyUp={() => {
                        trigger("desc");
                      }}/>
                      {
                          errors.desc && <h4>{errors.desc.message}</h4>
                      }
                <Label>Date</Label>
                <Input type="text" placeholder="Date" name="date" onChange={handleChange}/>
                <Label>Rating</Label>
                <Input type="number" placeholder="Rating" name="rating" onChange={handleChange} />
                <Label>Platforms</Label>
                <Input type="text" placeholder="Platforms" name="platforms" onChange={handleChange}/>
                <Label>Genre</Label>
                <select onClick={handleGenre}>
                    <option value="nothing">Select Genre/s:</option>
                    {
                        genres ? genres.map((obj , index) => <option id={index} name="genre">{obj}</option>)
                         : undefined
                    }
                </select>
                    {
                        data.genre.length > 0 ? data.genre.map((obj , index) => 
                        <div key={index}>
                            <p>{obj}</p>
                            <button value={obj} onClick={removeGenre}>x</button>
                        </div>
                        ) : undefined
                    }
                <InputSubmit type="submit" value="Enviar" />
            </Form>
        </Div>
    )
}

export default CreateGame