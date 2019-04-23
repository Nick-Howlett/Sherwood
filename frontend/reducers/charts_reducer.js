import {RECEIVE_CHART, RECEIVE_PREV_CLOSE} from "../actions/stock_actions";
export default (state = {}, action) => {
  switch(action.type){
    case RECEIVE_CHART:
      return Object.assign({}, state, action.chart);
    case RECEIVE_PREV_CLOSE:
      return Object.assign({}, state, {prev: action.prev});
    case CLEAR_CHARTS:
      return {};
    default:
      return state;
  }
}