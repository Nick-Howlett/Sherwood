import {RECEIVE_USER} from "../actions/session_actions";

export default (state = {}, action) => {
  switch(action.type){
    case RECEIVE_USER:
      return Object.assign({}, state, {[action.user.id]: action.user});
    default:
      return state;
  }
}