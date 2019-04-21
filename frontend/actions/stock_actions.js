import * as APIUtil from "../utils/stock_api_utils";
import {formatChart, createProfileCharts, createProfile1dChart} from '../utils/chart_utils';
import {uniq} from 'lodash';

export const RECEIVE_STOCK = "RECEIVE_STOCK";
export const RECEIVE_CHART = "RECEIVE_CHART";
export const RECEIVE_NEWS = "RECEIVE_NEWS";
export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const RECEIVE_TRANSACTIONS = "RECEIVE_TRANSACTIONS";
export const RECEIVE_SEARCH = "RECEIVE_SEARCH";
export const RECEIVE_TRANSACTION_ERRORS = "RECEIVE_TRANSACTION_ERRORS";
export const RECEIVE_WATCH = "RECEIVE_WATCH";
export const DELETE_WATCH = "DELETE_WATCH";
export const RECEIVE_WATCHLIST_INFO = "RECEIVE_WATCHLIST_INFO";


export const getStock = symbol => dispatch => {
  const stock = {};
  const charts = {};
  return Promise.all([APIUtil.fetchStock(symbol), 
               APIUtil.getInfo(symbol), 
               APIUtil.getHistoricalChart(symbol),
               APIUtil.getIntradayChart(symbol)])
  .then(values => {
      values.slice(0, 2).forEach(value => Object.assign(stock, value));
      values.slice(2).forEach(value => Object.assign(charts, formatChart(value)));
      stock.charts = charts;
      return dispatch(receiveStock({[symbol]: stock}));
  });
};


export const makeTransaction = transaction => dispatch => {
  return APIUtil.makeTransaction(transaction).then(payload => dispatch(receiveTransaction(payload)), 
  ({responseJSON}) => dispatch(receiveErrors(responseJSON)));
};

export const getNews = name => dispatch => {
  APIUtil.getNews(name).then(news => dispatch(receiveNews(news)));
};


export const getSearch = () => dispatch => {
  return APIUtil.getSearch().then(search => dispatch(receiveSearch(search)));
};

export const watchStock = (id, symbol) => dispatch => {
  return APIUtil.watchStock(id, symbol).then(watch => dispatch(receiveWatch(watch)));
};

export const removeWatch = id => dispatch => {
  return APIUtil.deleteWatch(id).then(({id}) => dispatch(deleteWatch(id)));
};


export const receiveErrors = errors => ({
  type: RECEIVE_TRANSACTION_ERRORS,
  errors
});

export const receiveTransaction = payload => ({
  type: RECEIVE_TRANSACTION,
  payload
});

export const receiveTransactions = transactions => ({
  type: RECEIVE_TRANSACTIONS,
  transactions
});


export const receiveStock = stock => ({
  type: RECEIVE_STOCK,
  stock
});

export const receiveNews = news => ({
  type: RECEIVE_NEWS,
  news
});


export const receiveChart = chart => ({
  type: RECEIVE_CHART,
  chart
});

export const receiveSearch = search => ({
  type: RECEIVE_SEARCH,
  search
})

export const receiveWatch = watch => ({
  type: RECEIVE_WATCH,
  watch
});

export const deleteWatch = id => ({
  type: DELETE_WATCH,
  id
});

export const receiveWatchlistInfo = (info, watchedStocks) => ({
  type: RECEIVE_WATCHLIST_INFO,
  info,
  watchedStocks
});

