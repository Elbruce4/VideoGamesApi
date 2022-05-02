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
import { Div , SelectDiv , Options , Button , DivGames , DivFilters , DivContainer , DivSearch} from "../Styles/Home"


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

        <Div>
            <NavBar></NavBar>
            <DivContainer>
                <DivFilters>
                    <SelectDiv onClick={filterByGenre}>
                        {
                            genres && genres.map((obj,index) => <Options key={index} value={obj}>{obj}</Options>)
                        }
                    </SelectDiv>
                    {
                        <SelectDiv onClick={ratingFilter}>
                            <Options value="none">None</Options>
                            <Options value="best">Best Rating</Options>
                            <Options value="worst">Worst Rating</Options>
                        </SelectDiv>
                    }
                    {
                        <SelectDiv onClick={orderByName}>
                            <Options value="top">A-Z</Options>
                            <Options value="bottom">Z-A</Options>
                        </SelectDiv>
                    }
                    {
                        <SelectDiv onClick={orderByCreation}>
                            <Options value="db">Created on DB</Options>
                            <Options value="api">Created on API</Options>
                        </SelectDiv>
                    }
                    {
                        <Button onClick={banFilters}>Ban all filters</Button>
                    }
            
                    {
                        <DivSearch>
                            <label htmlFor="">Search by name</label>
                            <input type="text" onChange={handleSearch} />
                            <Link to={"/gameDetail/"+ search}>
                                <Button >Search</Button>
                            </Link>
                        </DivSearch>
                    }
                </DivFilters>
                <DivGames>
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
                </DivGames>
            </DivContainer>

            <Paginado paginado={paginado} cantidad={games?.length} cantidadXPagina = {6} ></Paginado>

        </Div>

        : 
        
            <div>
                {navigate("/login")}
            </div>

        : <h4>Cargando...</h4>
        
    )
}

export default Home