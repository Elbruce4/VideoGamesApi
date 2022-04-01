
export const GetComments = (id) => {
    return function (dispatch) {
        fetch("http://localhost:3001/comments?id=" + id)
            .then(obj => obj.json())
            .then(obj => {
                console.log(obj)
                dispatch({
                    payload: obj,
                    type: "GET_COMMENTS"
                })
            })
    }
}

export const NewComment = (data) => {
    console.log("entro");
    console.log(data)
    return function (dispatch){
        fetch("http://localhost:3001/leaveComment",{
            method : "POST",
            body : JSON.stringify({
                title : data.title,
                text : data.text,
                videogameId : data.videogameId,
                userId : data.userId
            }),
            headers : {
                "Content-type" : "application/json"
            }
        })
            .then(obj => {obj.json()})
            .then(obj => {
                console.log(obj)
                return dispatch({
                payload : obj,
                type :  "LEAVE_COMMENT" 
            })})
    }
}

export const GetGames = () => {
    return function (dispatch){
        fetch("http://localhost:3001/")
            .then(obj => obj.json())
            .then(obj => dispatch({
                payload: obj,
                type: "GET_GAMES"
            }))
    }
}

export const OrderByRating = (value) => {
    
    return {
        type : "ORDER_BY_RATING",
        payload : value
    }
}

export const SearchByName = (value) => {
    return function (dispatch){
        console.log(value)
        fetch("http://localhost:3001/" + value)
            .then(obj => obj.json())
            .then(obj => dispatch({
                payload: obj,
                type: "GET_ONE_GAME"
            }))
    }
}

