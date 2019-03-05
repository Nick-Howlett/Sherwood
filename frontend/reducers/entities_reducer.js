import {combineReducers} from "redux";
import UsersReducer from "./users_reducer";
import StocksReducer from "./stocks_reducer";
import ChartsReducer from './charts_reducer';
import NewsReducer from './news_reducer';
import TransactionsReducer from './transactions_reducer';
import SearchReducer from './search_reducer';

export default combineReducers({
  users: UsersReducer,
  stocks: StocksReducer,
  charts: ChartsReducer,
  news: NewsReducer,
  transactions: TransactionsReducer,
  search: SearchReducer
});
