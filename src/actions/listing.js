import { createAction } from 'redux-actions'
import HackerEarthClient from '../api/HackerEarthClient'

////////////////////////////////////////////////////////////////////////////////
// NAMES
export const LIST_ITEM_REQUEST = 'LIST_ITEM_REQUEST';
export const LIST_ITEM_RECEIVE = 'LIST_ITEM_RECEIVE';
export const LIST_ITEM_ERROR = 'LIST_ITEM_ERROR';

////////////////////////////////////////////////////////////////////////////////
// CREATORS
export const  listItemRequest = createAction(LIST_ITEM_REQUEST);
export const  listItemReceive = createAction(LIST_ITEM_RECEIVE);
export const  listItemError = createAction(LIST_ITEM_ERROR);

////////////////////////////////////////////////////////////////////////////////
// ACTIONS
export const getProductList = () => {
    return function(dispatch, getState) {
        dispatch( listItemRequest());
        HackerEarthClient.getAllProducts()
        .then(result => {
          dispatch(listItemReceive(result))
        }).catch(err => {
            dispatch( listItemError(err))
        })
    }
}

////////////////////////////////////////////////////////////////////////////////
// MODULE AND NAME EXPORTS
export default {
    names: {
        LIST_ITEM_REQUEST,
        LIST_ITEM_RECEIVE,
        LIST_ITEM_ERROR
    },
    creators: {
         listItemRequest,
         listItemReceive,
         listItemError
    }
}



