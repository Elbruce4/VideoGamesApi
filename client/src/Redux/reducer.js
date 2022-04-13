const initialState = {
    videogames : [],
    videogamesBackUp : [],
    comments : [],
    oneGame : {},
    userLogIn : {},
    users : []
}

function rootReducer (state = initialState , action) {
    switch(action.type){

        case "LEAVE_COMMENT":
            return {
                ...state,
                comments : action.name ? state.comments.concat(action.payload) : undefined
            }
        
        case "GET_COMMENTS" : 
            return {
                ...state,
                comments : action.payload
            }

        case "GET_GAMES":
            return {
                ...state,
                videogames: action.payload,
                videogamesBackUp: action.payload
            }

        case "ADD_NEW_GAME":
            return {
                ...state,
                videogames: action.payload,
                videogamesBackUp: action.payload
            }

        case "GET_ALL_USERS":
            return {
                ...state,
                users : action.payload
            }
        
        case "ORDER_BY_RATING":

            console.log(action.payload)
            if(action.payload === "none"){
                return {
                    ...state,
                    videogames : state.videogamesBackUp
                }
            } 
            let games = action.payload === "best" ? 
                state.videogamesBackUp.sort((a,b)=> {
                    if(a.rating > b.rating) return -1;
                    if(a.rating < b.rating) return 1;
                    return 0;
                }) :
                state.videogamesBackUp.sort((a,b)=> {
                    if(a.rating > b.rating) return 1;
                    if(a.rating < b.rating) return -1;
                    return 0;
                });

                
                return {
                    ...state,
                    videogames: games
                }
                
        case "GET_ONE_GAME_BY_NAME": 
            
            return {
                ...state,
                oneGame : action.payload
            }
        
        case "GET_GAME_BY_ID":

            return {
                ...state,
                oneGame : action.payload
            }

        case "CLEAR_STATE":

            return {
                ...state,
                oneGame : action.payload
            }

        case "CLEAN_COMMENTS":

            return {
                ...state,
                comments : action.payload
            }

        case "LOG_IN":

            if(action.payload.message === "Logueo existoso"){
                return {
                    ...state,
                    userLogIn : action.payload.user
                }
            } else {
                return {
                    ...state,
                    userLogIn : undefined
                }
            }
        
        default:
            return {
                ...state
            }
    }
}

export default rootReducer