import { useSelector , useDispatch } from "react-redux"
import {  useEffect } from "react"
import { GetAllPostsComments , GetAllPosts } from "../Redux/actions";
import { useParams } from "react-router-dom";
import PostsComments from "./PostsComments";

const PostsDetail = () => {

    let dispatch = useDispatch();
    let params = useParams();

    //Los comentarios y filtrar al que corresponda este Post
    let comments = useSelector(obj => obj.postsComments);
    let AllComments = comments.filter(obj => obj.postId === Number(params.postId))
    
    //Traer el post original:
    let posts = useSelector(obj => obj.posts);
    let OnePost = posts.find(obj => obj.id === Number(params.postId));

    //Traer a los usuarios que realizaron cada posteo
    let users = useSelector(obj => obj.users);
    let user = users.find(obj => obj.id === OnePost.userId)

    console.log(params)
    console.log(OnePost)

    useEffect(()=> {
        dispatch(GetAllPostsComments());
        dispatch(GetAllPosts());
    },[dispatch])

    return (
        <div>
            {
                <div>
                    <p>{user?.name} {user?.lastName}</p>
                    <h2>{OnePost.title}</h2>
                    <p>{OnePost.text}</p>
                </div>
            }
            {
                AllComments && AllComments.map(obj => {

                    return  <PostsComments key={obj.id} data={obj}>
                            </PostsComments>
                        
                })
            }
        </div>
    )
}

export default PostsDetail