import {RECEIVE_CHART} from "../actions/stock_actions";
export default (state = {}, action) => {
  switch(action.type){
    case RECEIVE_CHART:
      return Object.assign({}, state, action.chart);
    default:
      return state;
  }
}