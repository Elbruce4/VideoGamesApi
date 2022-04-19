import { useSelector , useDispatch } from "react-redux"
import { useState , useEffect } from "react"
import { GetAllPosts } from "../Redux/actions";
import Posts from "./Posts";

const Foro = () => {

    let posts = useSelector(obj => obj.posts);
    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(GetAllPosts())
    },[dispatch])

    return (
        <div>
            {
                posts && posts.map(obj => {
                    return <Posts id={obj.id} data={obj}></Posts>
                })
            }
        </div>
    )
}

export default Foro