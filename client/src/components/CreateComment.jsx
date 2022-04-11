import {useState} from "react";
import { useParams } from "react-router-dom";
import { NewComment } from "../Redux/actions";
import { useDispatch  , useSelector} from "react-redux";
import { Link } from "react-router-dom";

const CreateComment = () => {

    let param = useParams();
    let dispatch = useDispatch();
    let user = useSelector(obj => obj.userLogIn)

    console.log( typeof param.id )

    const [data , setData] = useState({
        videogameId : param.id,
        userId : user.id ? user.id : 1,
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
            userId : user.id ? user.id : 1,
            text : " ",
            title : " "
        })

    }

    return (
        <form>
            <input type="text" placeholder="Title" name="title" onChange={e => handleChange(e)}/>
            <textarea type="text" placeholder="Comment" name="text" onChange={e => handleChange(e)}/>
            
                <button type="submit" onClick={handleSubmit}> <Link to={"/home"}>Comment</Link> </button>
        
        </form>
    )
}

export default CreateComment