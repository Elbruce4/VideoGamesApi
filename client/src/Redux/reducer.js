const initialState = {
    videogames : [],
    videogamesBackUp : [],
    comments : [],
    oneGame : {},
    userLogIn : {},
    users : [],
    genre: [],
    errors : "",
    posts : [],
    postsComments : []
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
                videogames: state.videogames.concat(action.payload),
                videogamesBackUp: state.videogamesBackUp.concat(action.payload)
            }

        case "GET_ALL_USERS":
            return {
                ...state,
                users : action.payload
            }

        case "GET_ALL_POSTS":

            return {
                ...state,
                posts: action.payload
            }

        case "GET_ALL_POSTS_COMMENTS":

            return {
                ...state,
                postsComments : action.payload
            }

        case "ORDER_BY_NAME":

            if(action.payload === "top") {
                let games = state.videogamesBackUp.sort((a,b)=> {
                    if(a.name > b.name) return 1;
                    if(b.name > a.name) return -1;
                    return 0
                })
                return {
                    ...state,
                    videogames : games
                }
                
            } else {
                let games = state.videogamesBackUp.sort((a,b)=> {
                    if(a.name > b.name) return -1;
                    if(b.name > a.name) return 1;
                    return 0
                })
                return {
                    ...state,
                    videogames : games
                }
            }

        case "CREATE_NEW_POST_COMMENT":

            return {
                ...state,
                postsComments : state.postsComments.concat(action.payload)
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

        case "ORDER_BY_CREATED":

            if(action.payload === "db") {
                let games = state.videogamesBackUp.filter(obj => obj.createnOnDb === true);
                if(games.length > 0){
                    return {
                        ...state,
                        videogames : games 
                    }
                } else {
                    return {
                        ...state,
                        videogames: null,
                        errors: "No hay juegos creados en la DB"
                    }
                }
            } else {
                let games = state.videogamesBackUp.filter(obj => obj.createnOnDb === false);
                return {
                    ...state,
                    videogames : games
                }
            }
                
        case "GET_ONE_GAME_BY_NAME": 
            
            return {
                ...state,
                oneGame : action.payload
            }
            

        case "GET_GENRES":

            return {
                ...state,
                genre : action.payload
            }

        case "FILTER_BY_GENRE":

            let games2 = state.videogamesBackUp.filter(obj => {
                return obj.genders.map(obj2 => obj2.name).includes(action.payload)
            });
            if(games2.length > 0){
                return {
                    ...state,
                    videogames : games2
                }
            } else {
                return {
                    ...state,
                    videogames: null,
                    errors: "No hay ningún juego de ese género"
                }
            }

        case "CLEAN_ONE_GAME":

            return {
                ...state,
                oneGame : {}
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
                sessionStorage.setItem("AccessToken" , action.payload.accessToken);
                console.log(action.payload.user)
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

        case "LOG_OUT":

            return {
                ...state,
                userLogIn : undefined
            }
        
        case "REFRESH_TOKEN":

            sessionStorage.setItem("AccessToken" , action.payload)
            return {
                ...state,
                
            }
        
        default:
            return {
                ...state
            }
    }
}

export default rootReducer