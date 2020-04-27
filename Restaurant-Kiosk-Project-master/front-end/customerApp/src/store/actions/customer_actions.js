import { SET_CUSTOMER_ID } from './types';

export const setCustomerID = (customerID) => dispatch => {
    dispatch({
        type: SET_CUSTOMER_ID,
        newCustomerID: customerID
    });
};