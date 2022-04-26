import {useState} from "react";
import { Log } from "../Redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate , Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form , LinkSignIn , Title , Input , Bottom , Label } from "../Styles/LogIn";

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
            <Title>Ingresa con tu usuario.</Title>
            <Form onSubmit={handleSubmit(hanldeSubmitForm)}>

                <Label>Email :</Label>
                <Input 
                    type="text" 
                    name="email" 
                   
                    {
                        ...register("email", {
                            onChange: (e) => handleChange(e),
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
                <Label>Password :</Label>
                <Input  type="password" 
                        name="password" 
                        {...register("password", {
                            onChange: (e) => handleChange(e),
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
                <Bottom type="submit" value="Loguearse" />

            </Form>
            <Link to="/signIn">
                <LinkSignIn>¿Aún no tiene cuenta?</LinkSignIn>
            </Link>
        </div>
    )
}

export default LogIn