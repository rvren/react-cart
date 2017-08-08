import { createAction } from 'redux-actions'

////////////////////////////////////////////////////////////////////////////////
// NAMES
export const PRODUCT_CART_PAYLOAD = 'PRODUCT_CART_PAYLOAD';
export const REMOVE_PRODUCT_CART_PAYLOAD = 'REMOVE_PRODUCT_CART_PAYLOAD';

////////////////////////////////////////////////////////////////////////////////
// CREATORS
export const  productPayload = createAction(PRODUCT_CART_PAYLOAD);
export const  removeProductPayload = createAction(REMOVE_PRODUCT_CART_PAYLOAD);

////////////////////////////////////////////////////////////////////////////////
// ACTIONS
export const updateSelectedPayload = (data) => {
    return function(dispatch, getState) {
        dispatch( productPayload(data));
    }
}

export const removeSelectedPayload = (data) => {
    return function(dispatch, getState) {
        dispatch( removeProductPayload(data));
    }
}


////////////////////////////////////////////////////////////////////////////////
// MODULE AND NAME EXPORTS
export default {
    names: {
        PRODUCT_CART_PAYLOAD,
        REMOVE_PRODUCT_CART_PAYLOAD
    },
    creators: {
         productPayload,
         removeProductPayload
    }
}


