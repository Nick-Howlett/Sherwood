import {RECEIVE_USER} from "../actions/session_actions";
import {RECEIVE_WATCH, DELETE_WATCH, RECEIVE_WATCHLIST_INFO} from '../actions/stock_actions';
import {formatChart} from "../utils/chart_utils";

export default (state = {}, action) => {
  let newState;
  switch(action.type){
    case RECEIVE_USER:
      return Object.assign({}, state, action.user.watchlist);
    case RECEIVE_WATCH:
      return Object.assign({}, state, {[action.watch.id]: action.watch});
    case RECEIVE_WATCHLIST_INFO:
      newState = Object.assign({}, state);
      action.watchedStocks.forEach(watch => {
        const symbol = watch.symbol;
        watch.chart = formatChart(action.info[symbol].chart);
        watch.price = action.info[symbol].quote.latestPrice;
        watch.prev = action.info[symbol].quote.close_yesterday;
        newState[watch.id] = watch;
      });
      return newState;
    case DELETE_WATCH:
      newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    default: 
      return state;
  }
};