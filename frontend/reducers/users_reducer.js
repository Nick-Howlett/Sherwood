import {RECEIVE_USER} from "../actions/session_actions";
import {RECEIVE_TRANSACTION} from "../actions/stock_actions";

export default (state = {}, action) => {
  switch(action.type){
    case RECEIVE_USER:
      return Object.assign({}, state, {[action.user.user.id]: action.user.user});
    case RECEIVE_TRANSACTION:
      const newState = Object.assign({}, state);
      newState[action.payload.transaction.user_id].buying_power = action.payload.user.buying_power;
      return newState;
    default:
      return state;
  }
}