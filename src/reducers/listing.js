import { listActions } from '../actions'
import Immutable from 'immutable';

const { LIST_ITEM_REQUEST, LIST_ITEM_RECEIVE, LIST_ITEM_ERROR} = listActions.names

const initialState = Immutable.fromJS({
  isRequesting:false,
  listArray : null,
  error:null,
  isComplete: false,
});

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case LIST_ITEM_REQUEST:
        return state.merge({'isRequesting':true})

    case LIST_ITEM_RECEIVE:
      return state.merge({
            'isRequesting':false,
            'isComplete': true, 
            'listArray': action.payload
        })

    case LIST_ITEM_ERROR:
      return state.merge({
          'isRequesting': false, 
          'error': action.payload,
          'isComplete': false
        })

    default:
      return state;
  }
}