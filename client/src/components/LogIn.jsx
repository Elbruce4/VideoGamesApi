import {useState} from "react";
import { Log } from "../Redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const LogIn = () => {
    
    let dispatch = useDispatch()
    const [user , setUser] = useState({
        email : "",
        password : ""
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(Log(user));
    }

    return (
        <div>
            <form onClick={handleSubmit}>

                <label>Email :</label>
                <input type="text" name="email" onChange={handleChange} />
                <br />
                <label>Password :</label>
                <input type="password" name="password" onChange={handleChange}/>
                <br />
                <Link to="/home">
                    <input type="submit" value="Loguearse" />
                </Link>

            </form>
        </div>
    )
}

export default LogIn