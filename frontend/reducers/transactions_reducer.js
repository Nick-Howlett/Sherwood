import {RECEIVE_TRANSACTION} from '../actions/stock_actions';
import {RECEIVE_USER} from "../actions/session_actions";

export default (state = {}, action) => {
  switch(action.type){
    case RECEIVE_TRANSACTION:
      return Object.assign({}, state, {[action.payload.transaction.id]: action.payload.transaction});
    case RECEIVE_USER:
      return Object.assign({}, action.user.transactions);
    default:
      return state;
  }
}