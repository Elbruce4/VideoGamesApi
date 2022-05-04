import { useSelector , useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { DivContainer,
         P,
         Div,
         Button,
         H2

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
                <H2>{data.title}</H2>
                <Link to= {"/foro/" + data.id}>
                    <Button>ver</Button>
                </Link>
            </Div>
            
        </DivContainer>
    )
}

export default Posts