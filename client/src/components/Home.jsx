import {useEffect} from "react"
import Games from "./Games";
import NavBar from "./NavBar";
import { useDispatch , useSelector } from "react-redux";
import { GetGames } from "../Redux/actions";

const Home = () => {

    const games = useSelector(obj => obj.videogames);
    const dispatch = useDispatch()

    console.log(games)

    useEffect(()=>{
        dispatch(GetGames())
    },[dispatch])

    return (
        <div>
            <NavBar></NavBar>
            {
                games ? 
                games.map(obj => {
                    return (
                        <Games key={obj.id} props={obj}></Games>
                    )
                })
                :
                "Cargando..."
            }
        </div>
    )
}

export default Home