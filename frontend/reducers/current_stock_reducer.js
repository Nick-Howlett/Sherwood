import {combineReducers} from 'redux';
import InfoReducer from './info_reducer';
import NewsReducer from './news_reducer';
import ChartReducer from './chart_reducer';

export default combineReducers({
  info: InfoReducer,
  news: NewsReducer,
  charts: ChartReducer
})