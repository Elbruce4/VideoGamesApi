import { useParams } from "react-router-dom"
import { useEffect , useState } from "react"

const GameDetail = () => {

    let params = useParams();
    let [comments , setComments] = useState([])

    useEffect(()=> {
        fetch("http://localhost:3001/comments")
            .then(obj => obj.json())
            .then(obj => setComments(obj.filter(obj => obj.videogameId === params.id)))
    },[params.id])

    return (
        <div>
            {
                comments && comments.map(obj => {
                    return (
                        <div>
                            <h3>{obj.title}</h3>
                            <p>{obj.text}</p>
                            
                        </div>
                    )
                })
            }
        </div>
    )
}

export default GameDetail