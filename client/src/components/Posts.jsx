import { useSelector , useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { DivContainer,
         P,
         Div

 } from "../Styles/Posts";      
import { GetAllUsers } from "../Redux/actions";

const Posts = ({data}) => {

    let dispatch = useDispatch()
    let users = useSelector(obj => obj.users);
    let userPost = users.find(obj => obj.id === data.userId);
    console.log(userPost)

    useEffect(()=>{
        dispatch(GetAllUsers())
    },[dispatch])

    return (
        <DivContainer>
            <P>{userPost? userPost.name + " " + userPost.lastName : "Autor anonimo" } </P>
            <Div>
                <h2>{data.title}</h2>
                <Link to= {"/foro/" + data.id}>
                    <button >ver</button>
                </Link>
            </Div>
            
        </DivContainer>
    )
}

export default Posts