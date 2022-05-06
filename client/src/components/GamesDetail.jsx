import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { Link } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux"
import { GetComments , CleanComments , GetGameById } from "../Redux/actions.js";
import UserComment from "./UserWhoComment.jsx";
import { Div , H3, H6 , CommentsDiv , P , H4 , DivButton} from "../Styles/GameDetail"
import {BsPencilSquare} from "react-icons/bs"


const GameDetail = () => {

    let dispatch = useDispatch();
    let params = useParams();
    const comments = useSelector(obj => obj.comments);
    const game = useSelector(obj => obj.oneGame)

    console.log(params.id)
    
    useEffect(()=> {

        dispatch(GetComments(params.id));
        dispatch(GetGameById(params.id));

    },[dispatch , params.id])

    useEffect(()=>{
        return () => dispatch(CleanComments()) 
    },[dispatch])

    return (
        <div>
            
            <div>
                <Link to={"leaveComment"}>
                    <DivButton>
                        <BsPencilSquare title="Dejar nuevo comentario"/>
                    </DivButton>

                </Link>
                {

                    game ? 
                        <Div>
                            <H3>{game?.name}</H3>
                            <H6>{game?.desc}</H6>
                            <H6>Realizado: {game?.date}</H6>
                            <H6>Rating: {game?.rating}</H6>
                        </Div>
                    :
                        undefined
                }
                
                <H4>Comentarios: </H4>
                {
                    comments && comments.length > 0 ? comments.map(obj => {
                        return (
                            <CommentsDiv key={obj.id}>
                                <H4>{obj.title}</H4>
                                <P>{obj.text}</P>
                                <UserComment idUser={obj.userId} idGame={obj.videogameId} id={obj.id}/>
                            </CommentsDiv>
                        )
                    }) :
                    <div>
                        <h3>Este juego aún no tiene ningún comentario</h3>

                    </div>
                }

                <br />
                <br />
            </div>
            
        </div>
    )
}

export default GameDetail