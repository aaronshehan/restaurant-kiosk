import { SET_ORDER_ID } from '../actions/types';

const initialState = {
    orderID: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ORDER_ID:
            return {
                orderID: action.newOrderID
            }
        default:
            return state;
    }
}