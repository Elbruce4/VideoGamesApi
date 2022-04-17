import {useState} from "react";
import { Log } from "../Redux/actions";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";

const LogIn = () => {
    
    const { register, handleSubmit, trigger, formState: { errors } } = useForm();
    let dispatch = useDispatch();
    const navigate = useNavigate()
    const [user , setUser] = useState({
        email : null,
        password : null
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const hanldeSubmitForm = () => {
        dispatch(Log(user));
        navigate("/home");
    }

    return (
        <div>
            <form onSubmit={handleSubmit(hanldeSubmitForm)}>

                <label>Email :</label>
                <input 
                    type="text" 
                    name="email" 
                    onChange={handleChange}
                    {
                        ...register("email", {
                            required:{
                                value:true,
                                message: "Debe introducir el email"
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "El formato del email ingresado no es correcto.",
                            }
                        })
                        
                    }
                    onKeyUp={() => {
                        trigger("email");
                      }}
                    />
                    {
                        errors.email && <h4>{errors.email.message}</h4>
                    }
                
                <br />
                <label>Password :</label>
                <input  type="password" 
                        name="password" 
                        onChange={handleChange}
                        {...register("password", {
                            required: {
                              value: true,
                              message: "Contraseña requerida.",
                            },
                            pattern: {
                              value: /^.{6,12}$/,
                              message:
                                "La contraseña debe contener entre 6 y 12 caracteres.",
                            },
                          })}
                          onKeyUp={() => {
                            trigger("password");
                          }}/>
                    {
                        errors.password && <h4>{errors.password.message}</h4>
                    }
                <br />
                <input type="submit" value="Loguearse" />

            </form>
        </div>
    )
}

export default LogIn