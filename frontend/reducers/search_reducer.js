import {RECEIVE_SEARCH} from "../actions/stock_actions";

export default (state = {}, action) => {
  switch(action.type){
    case RECEIVE_SEARCH:
      return Object.assign({}, state, action.search);
    default:
      return state;
  }
}