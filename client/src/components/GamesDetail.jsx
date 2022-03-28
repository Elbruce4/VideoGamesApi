import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { Link } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux"
import { GetComments } from "../Redux/actions.js";

const GameDetail = () => {

    let dispatch = useDispatch();
    let params = useParams();
    const comments = useSelector(obj => obj.comments);
    
    useEffect(()=> {

        dispatch(GetComments(params.id));

    },[dispatch , params.id])

    return (
        <div>
            {
                comments.length > 0 ? comments.map(obj => {
                    return (
                        <div>
                            <h3>{obj.title}</h3>
                            <p>{obj.text}</p>
                            <Link to={"leaveComment"}>
                        
                                <button>Dejar nuevo comentarios</button>

                            </Link>
                        </div>
                    )
                }) :
                <div>
                    <h3>Este juego aún no tiene ningún comentario</h3>

                    <Link to={"leaveComment"}>
                        
                        <button>Dejar nuevo comentarios</button>

                    </Link>
                </div>
            }
        </div>
    )
}

export default GameDetail