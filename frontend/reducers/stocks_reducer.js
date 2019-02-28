import {RECEIVE_STOCK} from "../actions/stock_actions";
import {combineReducers} from 'redux';
import QuoteReducer from './quotereducer'

export default combineReducers({
  quote: QuoteReducer,
  news: NewsReducer,
  charts: ChartReducer
})