import { useState } from "react";
import { useDispatch } from "react-redux";
import { AddNewGame } from "../Redux/actions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CreateGame = () => {

    const { register, handleSubmit, trigger, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [data,setData] = useState({
        name : "",
        desc : "",
        date : "",
        rating : 0,
        platforms : "",
        genre : ""
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

    const handleSubmitForm = (e) => {
        e.preventDefault();
        dispatch(AddNewGame(data));
        navigate("/home");
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <label>Name</label>
                <input 
                    type="text" 
                    placeholder="Name" 
                    name="name" 
                    onChange={handleChange}
                    {...register("name", {
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
                <label>Desc</label>
                <input 
                    type="text" 
                    placeholder="Desc" 
                    name="desc" 
                    onChange={handleChange}
                    {...register("desc",{
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
                <label>Date</label>
                <input type="text" placeholder="Date" name="date" onChange={handleChange}/>
                <label>Rating</label>
                <input type="number" placeholder="Rating" name="rating" onChange={handleChange} />
                <label>Platforms</label>
                <input type="text" placeholder="Platforms" name="platforms" onChange={handleChange}/>
                <label>Genre</label>
                <input type="text" placeholder="Genre" name="genre" onChange={handleChange}/>
                <input type="submit" value="Enviar" />
            </form>
        </div>
    )
}

export default CreateGame