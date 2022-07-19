
import { combineReducers } from "redux";
import product from './product';


const appReducer = combineReducers({
    product,
})
const rootReducer = (state, action) => {
   
    return appReducer(state, action)
}
export default rootReducer
