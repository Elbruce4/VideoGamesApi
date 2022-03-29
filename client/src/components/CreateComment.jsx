import {useState} from "react";
import { useParams } from "react-router-dom";
import { NewComment } from "../Redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const CreateComment = () => {

    let param = useParams();
    let dispatch = useDispatch();

    console.log( typeof param.id )

    const [data , setData] = useState({
        videogameId : param.id,
        userId : 1,
        text : "",
        title : ""
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
        console.log(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(NewComment(data));
        setData({
            videogameId : param.id,
            userId : 1,
            text : " ",
            title : " "
        })

    }

    return (
        <form>
            <input type="text" placeholder="Title" name="title" onChange={e => handleChange(e)}/>
            <textarea type="text" placeholder="Comment" name="text" onChange={e => handleChange(e)}/>
            <Link to={"/" + param.id}>
                <button type="submit" onClick={handleSubmit}> Comment </button>
            </Link>
        </form>
    )
}

export default CreateComment