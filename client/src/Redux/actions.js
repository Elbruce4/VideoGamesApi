
export const GetComments = (id) => {
    console.log(id);
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
            .then(obj => obj.json())
            .then(obj2 => {
                console.log(obj2)
                return dispatch({
                    payload : obj2,
                    type :  "LEAVE_COMMENT" 
                })
            })
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

export const OrderGameByName = (value) => {
    return {
        type : "ORDER_BY_NAME",
        payload: value
    }
}

export const OrderByCreated = value => {
    return {
        type : "ORDER_BY_CREATED",
        payload: value
    }
}


export const SearchByName = (value) => {
    return function (dispatch){
        fetch("http://localhost:3001/videogames/" + value)
            .then(obj => obj.json())
            .then(obj => dispatch({
                payload: obj,
                type: "GET_ONE_GAME_BY_NAME"
            }))
    }
}

export const ClearState = () => {
    return {
        payload: null,
        type : "CLEAR_STATE"
    }
}

export const Sign = (data) => {
        fetch("http://localhost:3001/createUser",{
            method : "POST",
            body : JSON.stringify({
                name : data.name,
                lastName : data.lastName,
                email : data.email,
                password : data.password
            }),
            headers : {
                "Content-type" : "application/json"
            },
            credentials : "include"
        })
}

export const Log = (data) => {
    return function (dispatch) {
        fetch("http://localhost:3001/loginUser",{
            method : "POST",
            body : JSON.stringify({
                email : data.email,
                password : data.password
            }),
            headers : {
                "Content-type" : "application/json"
            },
            credentials : "include"
        })
        .then(obj => obj.json())
        .then(obj => dispatch({
            type : "LOG_IN",
            payload : obj
        }))
    }
}

export const LogOut = () => {
    return function (dispatch) {
        fetch("http://localhost:3001/logout" , {
            method : "POST",
            credentials : "include",
            headers : {
                "Content-type" : "application/json"
            }
        })
        .then(obj => obj.json())
        .then(obj => dispatch({
            type : "LOG_OUT",
            payload : obj
        }))
    }
}

export const CleanComments = () => {
    return {
        type: "CLEAN_COMMENTS",
        payload : null
    }
}

export const CleanOneGame = () => {
    return {
        type: "CLEAN_ONE_GAME",
        payload : null
    }
}

export const AddNewGame = (data) => {
    return function(dispatch) {
        fetch("http://localhost:3001/videogames",{
            method : "POST",
            body : JSON.stringify({
                name : data.name,
                desc : data.desc,
                date : data.date,
                rating : data.rating,
                platforms :[data.platforms],
                gender : [data.genre]
            }),
            headers : {
                "Content-type" : "application/json"
            }
        })
        .then(obj => obj.json())
        .then(obj => dispatch({
            type : "ADD_NEW_GAME",
            payload : obj
        }))
    }
}

export const GetGameById = (id) => {
    return function (dispatch) {
        fetch(`http://localhost:3001/videogame/${id}`)
            .then(obj => obj.json())
            .then(obj => dispatch({
                type : "GET_GAME_BY_ID",
                payload : obj
            }))
    }
}

export const GetAllUsers = () => {
    return function (dispatch) {
        fetch("http://localhost:3001/users")
            .then(obj => obj.json())
            .then(obj => dispatch({
                type : "GET_ALL_USERS",
                payload : obj
            }))
    }
}

export const RefreshToken = () => {
    return function (dispatch) {
        fetch("http://localhost:3001/refresh_token" , {
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            credentials : "include"
        })
        .then(obj => obj.json())
        .then(obj => {
            console.log(obj)
            return dispatch({
            type : "REFRESH_TOKEN",
            payload : obj
            })}
        )
    }
}

export const GetGenres = () => {
    return function (dispatch) {
        fetch("http://localhost:3001/genre")
            .then(obj => obj.json())
            .then(obj => dispatch({
                type : "GET_GENRES",
                payload : obj
            }))
    }
}

export const FilterGenre = value => {
    return {
        payload: value,
        type : "FILTER_BY_GENRE"
    }
}
