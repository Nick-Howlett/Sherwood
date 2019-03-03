import {RECEIVE_INFO} from "../actions/stock_actions";

export default  (state = {}, action) => {
  switch(action.type){
    case RECEIVE_INFO:
      let stock;
      stock = Object.assign({}, state[action.symbol], action.info);
      return Object.assign({}, state, {[action.symbol]: stock});
    default:
      return state;
  }
}