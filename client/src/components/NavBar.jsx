import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { LogOut } from "../Redux/actions";
import { Div , H2 , H5 } from "../Styles/NavBar"

const NavBar = () => {

    let dispatch = useDispatch();

    const logOutUser = () => {
        dispatch(LogOut())
    }

    return (
        <Div>
            <Link to="/home">0
                <H2>Home</H2>
            </Link>
            <Link to="/createGame">
                <H5>Add a game</H5>
            </Link>
            <Link to="/foro">
                <H5>Foro</H5>
            </Link>
            <Link to="/login">
                <H5 onClick={logOutUser}>Log Out</H5>
            </Link>
        </Div>
    )
}

export default NavBar