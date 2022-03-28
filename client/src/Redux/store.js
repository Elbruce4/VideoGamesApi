import {createStore , applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import rootReducer from "./reducer.js"

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))