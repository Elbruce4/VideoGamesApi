import {useEffect , useState} from "react"
import Games from "./Games";
import NavBar from "./NavBar";
import { useDispatch , useSelector } from "react-redux";
import { GetGames , OrderByRating } from "../Redux/actions";

const Home = () => {

    const [refresh , setRefresh] = useState(false)
    const games = useSelector(obj => obj.videogames);
    const dispatch = useDispatch()
    console.log("¿Recarga?")

    const ratingFilter = (e) => {
        
        dispatch(OrderByRating(e.target.value));
        setRefresh(!refresh)
    }

    useEffect(()=>{
        dispatch(GetGames())
    },[dispatch])

    return (
        <div>
            <NavBar></NavBar>
            {
                <select onClick={ratingFilter}>
                    <option value="none">None</option>
                    <option value="best">Best Rating</option>
                    <option value="worst">Worst Rating</option>
                </select>
            }
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