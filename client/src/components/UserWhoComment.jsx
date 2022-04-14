import {useEffect} from "react"
import { useDispatch , useSelector } from "react-redux"
import { GetAllUsers } from "../Redux/actions";

const UserComment = ({id}) => {

    
    let allUsers = useSelector(obj => obj.users)
    let user = allUsers ? allUsers.find(obj => obj.id === id) : undefined;
    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(GetAllUsers());
    },[dispatch]);

    return (
        <div>
            <h6>{user.name} {user.lastName}</h6>
        </div>
    )
}

export default UserComment;