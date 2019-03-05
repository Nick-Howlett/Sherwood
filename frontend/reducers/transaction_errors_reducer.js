import {RECEIVE_TRANSACTION, RECEIVE_TRANSACTION_ERRORS} from "../actions/stock_actions";


export default (state = [], action) => {
  switch(action.type){
    case RECEIVE_TRANSACTION:
      return [];
    case RECEIVE_TRANSACTION_ERRORS:
      return action.errors;
    default:
      return state;
  }
}