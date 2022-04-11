import { Link } from "react-router-dom"

const LandingPage = () => {
    return (
        <div>
            <h1>Henry Videogames</h1>
            {/* <Link to="/home">
                <button>Lets Play</button>
            </Link> */}
            <Link to="/signIn">
                <button>Sign In</button>
            </Link>
            <Link to="/logIn">
                <button>Log In</button>
            </Link>
        </div>
    )
}

export default LandingPage