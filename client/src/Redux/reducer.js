const initialState = {
    videogames : [],
    comments : []
}

function rootReducer (state = initialState , action) {
    switch(action.type){

        case "LEAVE_COMMENT":
            return {
                ...state,
                comments : state.comments.concat(action.payload)
            }
        
        case "GET_COMMENTS" : 
            return {
                ...state,
                comments : action.payload
            }

        case "GET_GAMES":
            return {
                ...state,
                videogames: action.payload
            }

        default:
            return {
                ...state
            }
    }
}

export default rootReducer