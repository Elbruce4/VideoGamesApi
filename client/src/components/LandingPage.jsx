import { Link } from "react-router-dom"

const LandingPage = () => {
    return (
        <div>
            <h1>Henry Videogames</h1>
            <Link to="/home">
                <button>Lets Play</button>
            </Link>
        </div>
    )
}

export default LandingPage