import { useParams } from "react-router-dom"
import { useDispatch , useSelector } from "react-redux"
import { useEffect } from "react"
import { SearchByName } from "../Redux/actions"

const OneGame = () => {

    let params = useParams()
    console.log(params.game);
    let game = useSelector(obj => obj.oneGame);
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(SearchByName(params.game))
    },[dispatch , params.game])

    return (
        <div>
            {
                game ? 
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