import {combineReducers} from "redux";
import menuReducer from './menu_reducer.js';
import customerReducer from './customer_reducer.js';
import orderReducer from './order_reducer.js';

export default combineReducers({
    menReducer: menuReducer,
    custReducer: customerReducer,
    ordReducer: orderReducer
})