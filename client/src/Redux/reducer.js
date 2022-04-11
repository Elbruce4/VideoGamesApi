const initialState = {
    videogames : [],
    videogamesBackUp : [],
    comments : [],
    oneGame : {},
    userLogIn : {}
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
                videogames: action.payload,
                videogamesBackUp: action.payload
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
                
        case "GET_ONE_GAME": 
            
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
            } else if (action.payload.message === "Creedenciales incorrectas"){
                return {
                    ...state,
                    userLogIn : undefined
                }
            }

        break;
        
        default:
            return {
                ...state
            }
    }
}

export default rootReducer