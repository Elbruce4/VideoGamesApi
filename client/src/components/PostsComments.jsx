import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Div , H5 , P  , Ptitle} from "../Styles/PostComents"

const PostsComments = ({data}) => {

    let users = useSelector(obj => obj.users);
    let user = users.find(obj => obj.id === data.userId)

    useEffect(()=>{

    },[])

    return (
        <Div>
            <Ptitle>{user?user.name + " " + user.lastName : "Autor anonimo" } </Ptitle>
                <H5>{data.title}</H5>
                <P>{data.text}</P>
        </Div>
    )
}

export default PostsComments