import {useState} from "react";
import { Sign } from "../Redux/actions";
import { Link } from "react-router-dom";

const SignIn = () => {


    const [user , setUser] = useState({
        name : "",
        lastName : "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Sign(user)
    } 

    return (
        <div>
            <form onClick={handleSubmit}>

                <label htmlFor="">Name:</label>
                <input type="text" name="name" onChange={handleChange} />
                <br />
                <label htmlFor="">Last Name:</label>
                <input type="text" name="lastName" onChange={handleChange}/>
                <br />
                <label htmlFor="">Email:</label>
                <input type="text" name="email" onChange={handleChange}/>
                <br />
                <label htmlFor="">Password:</label>
                <input type="text" name="password" onChange={handleChange}/>
                <br />
                <Link to="/logIn">
                    <input type="submit" value="Registrarse" />
                </Link>

            </form>
        </div>
    )
}

export default SignIn