import {RECEIVE_OWNED_STOCK} from "../actions/stock_actions";
export default (state = [], action) => {
  switch(action.type){
    case RECEIVE_OWNED_STOCK:
      return state.concat([action.stock]);
    default:
      return state;
  }
};