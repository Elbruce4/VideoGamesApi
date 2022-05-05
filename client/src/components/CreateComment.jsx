import {useState} from "react";
import { useParams } from "react-router-dom";
import { NewComment } from "../Redux/actions";
import { useDispatch  , useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextArea , Input , Form , Button} from "../Styles/CreateComments";

const CreateComment = () => {

    let navigate = useNavigate()
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
        navigate("/home")
    }

    return (
        <Form>
            <Input type="text" placeholder="Title" name="title" onChange={e => handleChange(e)}/>
            <TextArea type="text" placeholder="Comment" name="text" onChange={e => handleChange(e)}/>
            
                
                    <Button type="submit" onClick={handleSubmit}>
                        Comment
                    </Button>
        
        </Form>
    )
}

export default CreateComment