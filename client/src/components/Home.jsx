import {useEffect , useState} from "react"
import Games from "./Games";
import NavBar from "./NavBar";
import { useDispatch , useSelector } from "react-redux";
import { GetGames , OrderByRating } from "../Redux/actions";
import { Link } from "react-router-dom";

const Home = () => {

    const [search , setSearch] = useState("")
    const [refresh , setRefresh] = useState(false)
    const games = useSelector(obj => obj.videogames);
    const user = useSelector(obj => obj.userLogIn)
    const dispatch = useDispatch()
    console.log(user)

    const ratingFilter = (e) => {

        dispatch(OrderByRating(e.target.value));
        setRefresh(!refresh)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
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
                    <Link to={"/gameDetail/"+ search}>
                        <button >Search</button>
                    </Link>
                </div>
            }
            {
                games.length > 0 ? 
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