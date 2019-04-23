import {RECEIVE_USER} from "../actions/session_actions";
import {RECEIVE_WATCH, DELETE_WATCH, RECEIVE_WATCHLIST_ITEM} from '../actions/stock_actions';

export default (state = {}, action) => {
  let newState;
  switch(action.type){
    case RECEIVE_USER:
      return Object.assign({}, state, action.user.watchlist);
    case RECEIVE_WATCH:
      return Object.assign({}, state, {[action.watch.id]: action.watch});
    case RECEIVE_WATCHLIST_ITEM:
      const newState = Object.assign({}, state);
      newState.watchList ? newState.watchList.push(action.item) : newState.watchList = [action.item];
      return newState;
    case DELETE_WATCH:
      newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    default: 
      return state;
  }
};