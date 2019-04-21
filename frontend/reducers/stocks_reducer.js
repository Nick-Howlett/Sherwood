import {RECEIVE_STOCK} from "../actions/stock_actions";

export default  (state = {}, action) => {
  let stock;
  switch(action.type){
    case RECEIVE_STOCK:
      return Object.assign({}, state, action.stock);
    default:
      return state;
  }
};