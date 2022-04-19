import { useSelector } from "react-redux"
import { useEffect } from "react"

const PostsComments = ({data}) => {

    let users = useSelector(obj => obj.users);
    let user = users.find(obj => obj.id === data.userId)

    useEffect(()=>{

    },[])

    return (
        <div>
            <p>{user?user.name + user.lastName : "Autor anonimo" } </p>
            <h5>{data.title}</h5>
            <p>{data.text}</p>
        </div>
    )
}

export default PostsComments