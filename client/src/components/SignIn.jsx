import {useState} from "react";
import { Sign } from "../Redux/actions";
import { useNavigate , Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignForm , Input , Bottom , Title , LinkLogIn, Label} from "../Styles/SignIn"

const SignIn = () => {


    const { register, handleSubmit, trigger, formState: { errors } } = useForm();
    const [user , setUser] = useState({
        name : "",
        lastName : "",
        email: "",
        password: "",
    })
    const navigate = useNavigate()

    const handleChangeForm = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmitForm = () => {
        Sign(user);
        navigate("/login");
    } 

    return (
      <div>
            <Title>Crea tu usuario.</Title>
            <SignForm onSubmit={handleSubmit(handleSubmitForm)}>

                <Label htmlFor="">Name:</Label>
                <Input 
                    type="text" 
                    name="name" 
                    {...register("name", {
                        onChange: (e) => handleChangeForm(e),
                        required: {
                          value: true,
                          message: "name requerid",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("name");
                      }}
                      />
                      {errors.name && <p>{errors.name.message}</p>}
                <br />
                <Label htmlFor="">Last Name:</Label>
                <Input 
                    type="text" 
                    name="lastName" 
                   
                    {...register("lastName", {
                        onChange: (e) => handleChangeForm(e),
                        required: {
                          value: true,
                          message: "LastName requerido.",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("lastName");
                      }}
                      />
                      {
                          errors.lastName && <p>{errors.lastName.message}</p>
                      }
                <br />
                <Label htmlFor="">Email:</Label>
                <Input 
                    type="text" 
                    name="email" 
                   
                    {...register("email", {
                        onChange: (e) => handleChangeForm(e),
                        required: {
                          value: true,
                          message: "Email requerido.",
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "El formato del email ingresado no es correcto.",
                        },
                      })}
                      onKeyUp={() => {
                        trigger("email");
                      }}
                      />
                      {errors.email && <p>{errors.email.message}</p>}
                <br />
                <Label htmlFor="">Password:</Label>
                <Input 
                    type="password" 
                    name="password" 
                    {...register("password", {
                        onChange: (e) => handleChangeForm(e),
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
                      }}
                      />
                      {errors.password && <p>{errors.password.message}</p>}
                    
                <br />
                <Bottom type="submit" value="Registrarse" />

            </SignForm>
            <Link to="/logIn">
              <LinkLogIn>¿Ya tenes tu cuenta?</LinkLogIn>
            </Link>
      </div>
    )
}

export default SignIn