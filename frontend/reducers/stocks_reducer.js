import {RECEIVE_INFO, RECEIVE_PRICE} from "../actions/stock_actions";

export default  (state = {}, action) => {
  let stock;
  switch(action.type){
    case RECEIVE_INFO:
      stock = Object.assign({}, state[action.symbol], action.info);
      return Object.assign({}, state, {[action.symbol]: stock});
    case RECEIVE_PRICE:
      stock = Object.assign({}, state[action.symbol], {price: action.price});
      return Object.assign({}, state, {[action.symbol]: stock});
    default:
      return state;
  }
}