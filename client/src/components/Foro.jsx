import { useSelector , useDispatch } from "react-redux"
import { useEffect , useState } from "react"
import { GetAllPosts , CreateNewPost } from "../Redux/actions";
import Posts from "./Posts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Foro = () => {

    const { register, handleSubmit, trigger, formState: { errors } } = useForm();

    let posts = useSelector(obj => obj.posts);
    let dispatch = useDispatch();
    let navigate = useNavigate()
    const userLogueado = useSelector(obj => obj.userLogIn)
    let [input , setInput] = useState({
        title : "",
        text : "",
        userId : userLogueado.id,
    });

    const handleSubmitForm = () => {
        console.log("¿ENTRA?");
        dispatch(CreateNewPost(input));
        navigate("/home");
    }

    const handleChange = (e) => {
        console.log(input)
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    useEffect(()=>{
        dispatch(GetAllPosts())
    },[dispatch])

    return (
        <div>
            {
                posts && posts.map((obj , index) => {
                    return <Posts id={obj.id} data={obj} key={index}></Posts>
                })
            }

            {
                <div>
                    <h3>New Post:</h3>
                    <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <label>Title: </label>
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Title"
                        {...register("title", {
                            onChange: (e) => handleChange(e),
                            required: {
                            value: true,
                            message: "title requerido",
                        },
                            
                        })}
                        onKeyUp={() => {
                            trigger("title");
                          }}
                    />
                        {errors.title && <p>{errors.title.message}</p> }                           
                    <label>Comment: </label>

                    <textarea
                        type="text" 
                        name="text" 
                        placeholder="text" 
                        {...register("text", {
                            onChange: (e) => handleChange(e),
                            required: {
                            value: true,
                            message: "text requerido",
                        },
                            
                        })}
                        onKeyUp={() => {
                            trigger("text");
                          }}
                    />
                        {errors.text && <p>{errors.text.message}</p> }
                    <input type="submit" value="Comentar" />
                    </form>
                </div>
            }
        </div>
    )
}

export default Foro