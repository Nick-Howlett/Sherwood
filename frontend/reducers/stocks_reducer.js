import {RECEIVE_STOCKS} from "../actions/stock_actions";

export default  (state = {}, action) => {
  switch(action.type){
    case RECEIVE_STOCKS:
      Object.keys(action.stocks).forEach(symbol => {
        if(state[symbol]) action.stocks[symbol].charts = Object.assign(state[symbol].charts, action.stocks[symbol].charts);
      });
      return Object.assign({}, state, action.stocks);
    default:
      return state;
  }
};