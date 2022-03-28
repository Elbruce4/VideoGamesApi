
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
    return function (dispatch){
        fetch("http://localhost:3001/leaveComments",{
            method : "POST",
            body : JSON.stringify({
                title : data.title,
                text : data.text,
                userId : data.userid,
                videogameId : data.videogameId
            }),
            headers : {
                "Content-type" : "application/json"
            }
        })
            .then(obj => obj.json())
            .then(obj => dispatch({
                payload : obj,
                type :  "LEAVE_COMMENT" 
            }))
    }
}