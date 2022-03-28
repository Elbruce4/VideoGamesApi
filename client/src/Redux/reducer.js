const initialState = {
    videogames : [],
    comments : []
}

function rootReducer (state = initialState , action) {
    switch(action.type){
        
        case "GET_COMMENTS" : 
            return {
                ...state,
                comments : action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default rootReducer