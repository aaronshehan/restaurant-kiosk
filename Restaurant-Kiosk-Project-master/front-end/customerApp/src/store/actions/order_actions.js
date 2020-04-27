import { SET_ORDER_ID } from './types';

export const setOrderID = (orderID) => dispatch => {
    dispatch({
        type: SET_ORDER_ID,
        newOrderID: orderID
    });
};