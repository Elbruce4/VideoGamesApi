import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { Link } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux"
import { GetComments , CleanComments , GetGameById } from "../Redux/actions.js";


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
                {

                    game ? 
                        <div>
                            <h3>{game.name}</h3>
                            <h6>{game.desc}</h6>
                            <h6>{game.date}</h6>
                            <h6>{game.rating}</h6>
                        </div>
                    :
                        undefined
                }
                {
            
                    
                    comments && comments.length > 0 ? comments.map(obj => {
                        return (
                            <div key={obj.id}>
                                <h4>Comentarios: </h4>
                                <h3>{obj.title}</h3>
                                <p>{obj.text}</p>
                            </div>
                        )
                    }) :
                    <div>
                        <h3>Este juego aún no tiene ningún comentario</h3>

                    </div>
                }
                <Link to={"leaveComment"}>
                            
                    <button>Dejar nuevo comentarios</button>

                </Link>
            </div>
            
        </div>
    )
}

export default GameDetail