import {RECEIVE_STOCK, RECEIVE_PREV} from "../actions/stock_actions";
export default (state = {}, action) => {
  switch(action.type){
    case RECEIVE_STOCK:
      return Object.assign({}, state, action.stock.quote);
    case RECEIVE_PREV:
      return Object.assign({}, state, {prev: action.prev.close});
    default:
      return state;
  }
}