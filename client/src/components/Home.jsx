import {useState , useEffect} from "react"
import Games from "./Games";
import NavBar from "./NavBar";

const Home = () => {

    const [games , setGames] = useState();

    console.log(games)

    useEffect(()=>{
        fetch("http://localhost:3001/")
            .then(obj => obj.json())
            .then(obj => setGames(obj))
    },[])

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