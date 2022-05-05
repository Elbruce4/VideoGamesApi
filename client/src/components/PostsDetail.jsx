import { useSelector , useDispatch } from "react-redux"
import { useEffect , useState } from "react"
import { GetAllPostsComments , GetAllPosts , CreateNewPostComment , DeletePost } from "../Redux/actions";
import { useParams , useNavigate } from "react-router-dom";
import PostsComments from "./PostsComments";
import { useForm } from "react-hook-form";
import {    Div,
            P,
            H2,
            InsideDiv,
            PTitle,
            DivOutside,
            DivComments,
            DivForm,
            DivButton,
            CancelNewComment } from "../Styles/PostDetail"
import { 
    Form,
    Input,
    TextArea,
    Button } from "../Styles/Foro";
import {BsPencilSquare} from "react-icons/bs"

const PostsDetail = () => {

    const { register, handleSubmit, trigger, formState: { errors } } = useForm();
    let userLogueado = useSelector(obj => obj.userLogIn);
    let dispatch = useDispatch();
    let params = useParams();
    let navigate = useNavigate();
    let [open , setOpen] = useState(false)
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
    let user = users.find(obj => obj.id === OnePost.userId);

    const deletePosts = () => {
        dispatch(DeletePost(params.postId));
        alert("Post eliminado");
        navigate("/home");
    }

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

    const HandleOpen = () => setOpen(!open)

    useEffect(()=> {
        dispatch(GetAllPostsComments());
        dispatch(GetAllPosts());
    },[dispatch])



    return (
        <DivOutside>
            <DivButton open = {open}>
                <BsPencilSquare onClick={HandleOpen}/>
            </DivButton>
            <DivForm open={open}>
                <CancelNewComment onClick={HandleOpen}>X</CancelNewComment>
                {
                    <Form onSubmit={handleSubmit(handleSubmitForm)}>
                        <label>Title: </label>
                        <Input 
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

                        <TextArea
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
                        <Button type="submit" value="Comentar" />
                    </Form>
                }
            </DivForm>
            {
               userLogueado.id === OnePost.userId ? <button onClick={deletePosts}>Eliminar Post</button> : undefined
            }
            {
                <Div>
                    <PTitle>{user?user.name + " " + user.lastName : "Autor anonimo" } </PTitle>
                    <InsideDiv>
                        <H2>{OnePost?.title}</H2>
                        <P>{OnePost?.text}</P>
                    </InsideDiv>
                </Div>
            }
            <DivComments>
                {
                    AllComments && AllComments.map(obj => {

                        return  <PostsComments key={obj.id} data={obj}>
                                </PostsComments>
                            
                    })
                }
            </DivComments>
            
        </DivOutside>
    )
}

export default PostsDetail