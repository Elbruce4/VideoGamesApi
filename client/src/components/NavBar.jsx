import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { LogOut } from "../Redux/actions";

const NavBar = () => {

    let dispatch = useDispatch();

    return (
        <div>
            <Link to="/">
                <h2>Home</h2>
            </Link>
            <Link to="/createGame">
                <h5>Add a game</h5>
            </Link>
            <Link to="/foro">
                <h5>Foro</h5>
            </Link>
            <Link to="/login">
                <h5 onClick={dispatch(LogOut)}>Log Out</h5>
            </Link>
        </div>
    )
}

export default NavBar