import { combineReducers } from 'redux';
import listing from './listing';
import checkoutCart from './checkoutCart'


const rootReducer = combineReducers({
  listing,
  checkoutCart
});

export default rootReducer;


