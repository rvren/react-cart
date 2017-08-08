import { checkoutCartActions } from '../actions'
import Immutable from 'immutable';
import { REHYDRATE } from 'redux-persist/constants';

const { PRODUCT_CART_PAYLOAD , REMOVE_PRODUCT_CART_PAYLOAD } = checkoutCartActions.names;

const initialState = Immutable.fromJS({
  productPayload:[]
});

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case PRODUCT_CART_PAYLOAD:
      var productPayload = state.productPayload || [];
      productPayload = productPayload.concat(action.payload)
      return {"productPayload": productPayload};

    case REMOVE_PRODUCT_CART_PAYLOAD:
      var productPayload = state.productPayload || [];
      productPayload.forEach(function(element, index, productPayload) {
        if (element.id == action.payload.id) {
             productPayload.splice(index, 1); 
             return;
        }
      }, this);
      return {"productPayload": productPayload};

    case REHYDRATE:
      if(action.payload.checkoutCart) {
        return Immutable.fromJS(action.payload.checkoutCart);
      }

    default:
      return state;
  }
}



