import { useParams } from "react-router-dom"
import { useDispatch , useSelector } from "react-redux"
import { useEffect } from "react"
import { SearchByName , ClearState } from "../Redux/actions"

const OneGame = () => {

    let params = useParams()
    console.log(params.game);
    let game = useSelector(obj => obj.oneGame);
    let dispatch = useDispatch();

    console.log(game);

    useEffect(() => {
        dispatch(SearchByName(params.game))
    },[dispatch , params.game])

    useEffect(()=>{
        return () => dispatch(ClearState());
    },[dispatch]);

    return (
        <div>
            {
                game && game.id ? 
                    <div>
                        <h2>{game.name}</h2>
                        <h4>{game.desc}</h4>
                    </div>
                    :
                <h2>Cargando...</h2>
            }
        </div>
    )
}

export default OneGame