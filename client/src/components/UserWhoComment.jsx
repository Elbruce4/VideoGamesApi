import {useEffect} from "react"
import { useDispatch , useSelector } from "react-redux"
import { GetAllUsers , DeleteComment } from "../Redux/actions";
import { useNavigate } from "react-router-dom";
import { CommentsDivName , H4 , Button} from "../Styles/GameDetail";

const UserComment = ({idUser , idGame}) => {

    
    let navigate = useNavigate()
    let allUsers = useSelector(obj => obj.users)
    let user = allUsers ? allUsers.find(obj => obj.id === idUser) : undefined;
    let dispatch = useDispatch();
    const userLogueado = useSelector(obj => obj.userLogIn);
    console.log("datitos" , idUser , idGame)

    useEffect(()=>{
        dispatch(GetAllUsers());
    },[dispatch]);

    const handleDelete = (idUser , idGame) => {
        console.log(idUser , idGame)
        console.log(idUser)
        console.log(idGame)
        console.log("entra")
        dispatch(DeleteComment(idUser , idGame))
        alert("Comentario eliminado con éxito");
        navigate("/home")
    }

    return (
        <CommentsDivName>
            <H4>{user.name} {user.lastName}</H4>
            
            {
                userLogueado.id === idUser ? <Button onClick={() => handleDelete(idUser , idGame)}>Eliminar comentario</Button> : undefined
            }
        </CommentsDivName>
    )
}

export default UserComment;