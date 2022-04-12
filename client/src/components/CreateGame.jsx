import { useState } from "react";
import { useDispatch } from "react-redux";
//import { Link } from "react-router-dom";
import { AddNewGame } from "../Redux/actions";


const CreateGame = () => {

    const dispatch = useDispatch();
    const [data,setData] = useState({
        name : "",
        desc : "",
        date : "",
        rating : 0,
        platforms : "",
        genre : ""
    })

    const handleChange = (e) => {
        console.log(data)
        if(e.target.name === "rating"){
            setData({
                ...data,
                [e.target.name] : Number(e.target.value)
            }) 
        } else {
            setData({
                ...data,
                [e.target.name] : e.target.value
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(AddNewGame(data))
    }

    return (
        <div>
            <form>
                <label>Name</label>
                <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
                <label>Desc</label>
                <input type="text" placeholder="Desc" name="desc" onChange={handleChange}/>
                <label>Date</label>
                <input type="text" placeholder="Date" name="date" onChange={handleChange}/>
                <label>Rating</label>
                <input type="number" placeholder="Rating" name="rating" onChange={handleChange} />
                <label>Platforms</label>
                <input type="text" placeholder="Platforms" name="platforms" onChange={handleChange}/>
                <label>Genre</label>
                <input type="text" placeholder="Genre" name="genre" onChange={handleChange}/>
                <input type="submit" value="Enviar" onClick={handleSubmit}/>
            </form>
        </div>
    )
}

export default CreateGame