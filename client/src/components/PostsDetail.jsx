import { useSelector , useDispatch } from "react-redux"
import { useEffect , useState } from "react"
import { GetAllPostsComments , GetAllPosts , CreateNewPostComment } from "../Redux/actions";
import { useParams , useNavigate } from "react-router-dom";
import PostsComments from "./PostsComments";
import { useForm } from "react-hook-form";

const PostsDetail = () => {

    const { register, handleSubmit, trigger, formState: { errors } } = useForm();
    let userLogueado = useSelector(obj => obj.userLogIn);
    let dispatch = useDispatch();
    let params = useParams();
    let navigate = useNavigate();
    console.log(userLogueado)
    
    let [input , setInput] = useState({
        title : "",
        text : "",
        idUser : userLogueado.id,
        idPost : params.postId
    });

    //Los comentarios y filtrar al que corresponda este Post
    let comments = useSelector(obj => obj.postsComments);
    let AllComments = comments.filter(obj => obj.postId === Number(params.postId))
    
    //Traer el post original:
    let posts = useSelector(obj => obj.posts);
    let OnePost = posts.find(obj => obj.id === Number(params.postId));

    //Traer a los usuarios que realizaron cada posteo
    let users = useSelector(obj => obj.users);
    let user = users.find(obj => obj.id === OnePost.userId)

    const handleChange = e => {
        console.log(input)
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmitForm = () => {
        dispatch(CreateNewPostComment(input));
        console.log("entro")
        navigate("/home");
    }

    useEffect(()=> {
        dispatch(GetAllPostsComments());
        dispatch(GetAllPosts());
    },[dispatch])

    return (
        <div>
            {
                <div>
                    <p>{user?.name} {user?.lastName}</p>
                    <h2>{OnePost?.title}</h2>
                    <p>{OnePost?.text}</p>
                </div>
            }
            {
                AllComments && AllComments.map(obj => {

                    return  <PostsComments key={obj.id} data={obj}>
                            </PostsComments>
                        
                })
            }
            {
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
            }
        </div>
    )
}

export default PostsDetail