import {RECEIVE_USER} from "../actions/session_actions";
import {RECEIVE_WATCH, DELETE_WATCH} from '../actions/stock_actions';

export default (state = {}, action) => {
  switch(action.type){
    case RECEIVE_USER:
      return Object.assign({}, state, action.user.watchlist);
    case RECEIVE_WATCH:
      return Object.assign({}, state, {[action.watch.id]: action.watch});
    case DELETE_WATCH:
      const newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    default: 
      return state;
  }
};