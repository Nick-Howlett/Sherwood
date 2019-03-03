import {combineReducers} from "redux";
import UsersReducer from "./users_reducer";
import StocksReducer from "./stocks_reducer";
import ChartsReducer from './charts_reducer';
import NewsReducer from './news_reducer';

export default combineReducers({
  users: UsersReducer,
  stocks: StocksReducer,
  charts: ChartsReducer,
  news: NewsReducer
});
