import {Link} from "react-router-dom"

const Games = ({props}) => {

    return (
        <div>
            <h2>{props.name}</h2>
            <h4>{props.date}</h4>
            <h4>{props.rating}</h4>
            <p>{props.desc}</p>
            <Link to={`/${props.id}`}>
                <button>View Details</button>
            </Link>
        </div>
    )

}

export default Games