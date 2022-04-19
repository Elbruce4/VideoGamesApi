import {useEffect , useState} from "react"
import Games from "./Games";
import NavBar from "./NavBar";
import { useDispatch , useSelector } from "react-redux";
import {GetGames, 
        OrderByRating , 
        GetAllUsers , 
        RefreshToken , 
        OrderGameByName , 
        OrderByCreated,
        GetGenres,
        FilterGenre
          } from "../Redux/actions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Paginado from "./Paginado";


const Home = () => {

    const [search , setSearch] = useState("")
    const [refresh , setRefresh] = useState(false)
    const games = useSelector(obj => obj.videogames);
    const user = useSelector(obj => obj.userLogIn);
    const genres = useSelector(obj => obj.genre);
    const errors = useSelector(obj => obj.errors)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //paginado:
    const [gamesxPagina ] = useState(6);
    const [pagActual , setPaginaActual] = useState(1);
    const indexUltimoGame = pagActual * gamesxPagina;
    const indexPrimerGame = indexUltimoGame - gamesxPagina;
    const gamesActuales = games?.slice(indexPrimerGame,indexUltimoGame);

    const paginado = e => {
        setPaginaActual(e)
    }

    const ratingFilter = (e) => {

        dispatch(OrderByRating(e.target.value));
        setRefresh(!refresh)
    }

    const orderByName = (e) => {
        console.log(e.target.value)
        dispatch(OrderGameByName(e.target.value));
        setRefresh(!refresh);
    }

    const orderByCreation = (e) => {
        dispatch(OrderByCreated(e.target.value));
        setRefresh(!refresh);
    }

    const banFilters = () => {
        dispatch(GetGames());
        setRefresh(!refresh);
    }

    const filterByGenre = (e) => {
        dispatch(FilterGenre(e.target.value));
        setRefresh(!refresh);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    useEffect(()=>{
        dispatch(GetGames());
        dispatch(GetAllUsers());
        dispatch(RefreshToken());
        dispatch(GetGenres());
    },[dispatch])

    return (

        
        user? user.refreshToken ? 

        <div>
            <NavBar></NavBar>
            <select onClick={filterByGenre}>
                {
                    genres && genres.map((obj,index) => <option key={index} value={obj}>{obj}</option>)
                }
            </select>
            {
                <select onClick={ratingFilter}>
                    <option value="none">None</option>
                    <option value="best">Best Rating</option>
                    <option value="worst">Worst Rating</option>
                </select>
            }
            {
                <select onClick={orderByName}>
                    <option value="top">A-Z</option>
                    <option value="bottom">Z-A</option>
                </select>
            }
            {
                <select onClick={orderByCreation}>
                    <option value="db">Created on DB</option>
                    <option value="api">Created on API</option>
                </select>
            }
            {
                <button onClick={banFilters}>Ban all filters</button>
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
                gamesActuales && gamesActuales.length > 0 ? 
                gamesActuales.map(obj => {
                    return (
                        <Games key={obj.id} props={obj}></Games>
                    )
                })
                :
                errors ? <h3>{errors}</h3> : <h3>Cargando...</h3>
            }
            <Paginado paginado={paginado} cantidad={games?.length} cantidadXPagina = {6} ></Paginado>

        </div>

        :
        
        <div>
            {navigate("/login")}
        </div>

        : <h4>Cargando...</h4>
        
    )
}

export default Home