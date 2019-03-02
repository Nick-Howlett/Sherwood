import {RECEIVE_STOCK} from "../actions/stock_actions";
export default (state = {}, action) => {
  switch(action.type){
    case RECEIVE_STOCK:
      return Object.assign({}, state, action.stock.news);
    default:
      return state;
  }
}