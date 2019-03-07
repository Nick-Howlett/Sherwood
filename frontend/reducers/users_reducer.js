import {RECEIVE_USER} from "../actions/session_actions";
import {RECEIVE_TRANSACTION, RECEIVE_PREV_CLOSES} from "../actions/stock_actions";

export default (state = {}, action) => {
  switch(action.type){
    case RECEIVE_USER:
      return Object.assign({}, state, {[action.user.user.id]: action.user.user});
    case RECEIVE_PREV_CLOSES:
      let total = 0;
      Object.keys(action.prevCloses).forEach(symbol => {
        total += action.prevCloses[symbol].quote.previousClose * action.stockShares[symbol];
      });
      const user = Object.assign({}, state[action.id], {prevCloses: total});
      return Object.assign({}, state, {[action.id]: user});
    case RECEIVE_TRANSACTION:
      const newState = Object.assign({}, state);
      newState[action.payload.transaction.userId].buyingPower = action.payload.user.buyingPower;
      return newState;
    default:
      return state;
  }
}