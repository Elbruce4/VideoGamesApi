import { useSelector , useDispatch } from "react-redux"
import { useEffect , useState } from "react"
import { GetAllPosts , CreateNewPost } from "../Redux/actions";
import Posts from "./Posts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {    Div,
            DivNewComment,
            Form,
            Input,
            TextArea,
            CancelNewComment,
            Button } from "../Styles/Foro"
import {BsPencilSquare} from "react-icons/bs"            

const Foro = () => {

    const { register, handleSubmit, trigger, formState: { errors } } = useForm();

    let [open , setOpen] = useState(false)
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

    const ChangeOpen = () => setOpen(!open)

    useEffect(()=>{
        dispatch(GetAllPosts())
    },[dispatch])

    return (
        <div>
            {
                <div>
                    <DivNewComment open={open} onClick={ChangeOpen}>
                        <BsPencilSquare title="Nuevo Comentario"/>
                    </DivNewComment>
                    <Div open={open}>
                        <CancelNewComment onClick={ChangeOpen}>X</CancelNewComment>
                        <Form onSubmit={handleSubmit(handleSubmitForm)}>
                            <label>Title: </label>
                            <Input 
                                type="text" 
                                name="title" 
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
                    </Div>
                </div>
            }
            {
                posts && posts.map((obj , index) => {
                    return <Posts id={obj.id} data={obj} key={index}></Posts>
                })
            }

            
        </div>
    )
}

export default Foro