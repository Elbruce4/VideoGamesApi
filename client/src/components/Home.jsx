import {useEffect , useState} from "react"
import Games from "./Games";
import NavBar from "./NavBar";
import { useDispatch , useSelector } from "react-redux";
import { GetGames , OrderByRating } from "../Redux/actions";

const Home = () => {

    const [search , setSearch] = useState("")
    const [refresh , setRefresh] = useState(false)
    const games = useSelector(obj => obj.videogames);
    const dispatch = useDispatch()
    console.log("¿Recarga?")

    const ratingFilter = (e) => {

        dispatch(OrderByRating(e.target.value));
        setRefresh(!refresh)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const searchByName = () => {
        console.log(search)
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
                <div>
                    <label htmlFor="">Search by name</label>
                    <input type="text" onChange={handleSearch} />
                    <button onClick={searchByName}>Search</button>
                </div>
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