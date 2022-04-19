import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Posts = ({data}) => {

    let users = useSelector(obj => obj.users);
    let userPost = users.find(obj => obj.id === data.userId);

    return (
        <div>
            <p>{userPost? userPost.name + " " + userPost.lastName : "Autor anonimo" } </p>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
            <Link to= {"/foro/" + data.id}>
                <button >ver</button>
            </Link>
        </div>
    )
}

export default Posts