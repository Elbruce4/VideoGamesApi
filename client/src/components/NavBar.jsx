import { Link } from "react-router-dom"

const NavBar = () => {

    return (
        <div>
            <Link to="/">
                <h2>Home</h2>
            </Link>
            <Link to="/createGame">
                <h5>Add a game</h5>
            </Link>
            <Link to="/">
                <h5>Foro</h5>
            </Link>
        </div>
    )
}

export default NavBar