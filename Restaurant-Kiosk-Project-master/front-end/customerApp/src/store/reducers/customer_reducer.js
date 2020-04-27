import { SET_CUSTOMER_ID } from '../actions/types';

const initialState = {
    customerID: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CUSTOMER_ID:
            return {
                customerID: action.newCustomerID
            }
        default:
            return state;
    }
}