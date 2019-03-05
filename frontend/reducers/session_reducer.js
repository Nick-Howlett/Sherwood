import {RECEIVE_USER, LOGOUT_USER} from "../actions/session_actions";

export default (state = {}, action) => {
  switch(action.type){
    case RECEIVE_USER:
      return {id: action.user.user.id};
    case LOGOUT_USER:
      return {id: null};
    default:
      return state;
  }
}