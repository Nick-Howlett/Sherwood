import {RECEIVE_NEWS} from "../actions/stock_actions";
export default (state = [], action) => {
  switch(action.type){
    case RECEIVE_NEWS:
      return action.news;
    default:
      return state;
  }
};