import * as APIUtil from "../utils/stock_api_utils";
import {formatChart, createProfileCharts, createProfile1dChart} from '../utils/chart_utils';

export const RECEIVE_STOCKS = "RECEIVE_STOCKS";
export const RECEIVE_CHART = "RECEIVE_CHART";
export const RECEIVE_NEWS = "RECEIVE_NEWS";
export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const RECEIVE_TRANSACTIONS = "RECEIVE_TRANSACTIONS";
export const RECEIVE_SEARCH = "RECEIVE_SEARCH";
export const RECEIVE_TRANSACTION_ERRORS = "RECEIVE_TRANSACTION_ERRORS";
export const RECEIVE_WATCH = "RECEIVE_WATCH";
export const DELETE_WATCH = "DELETE_WATCH";
export const RECEIVE_WATCHLIST_INFO = "RECEIVE_WATCHLIST_INFO";


export const getStockDisplay = symbols => dispatch => { //Get any info we need to display the page's initial state
  const stocks = {};
  const promises = [];
  symbols.forEach(symbol => {
      promises.push(Promise.all([APIUtil.fetchStock(symbol), 
                  APIUtil.getInfo(symbol),
                  APIUtil.getIntradayChart(symbol)])
      .then(values => {
          values.slice(0, 2).forEach(value => Object.assign(stocks, {[symbol]: value}));
          const charts = {};
          Object.assign(charts, formatChart(values[2]));
          stocks[symbol].charts = charts;
      }));
  });
  return Promise.all(promises).then(() => {
    dispatch(receiveStocks(stocks));
  });
};

export const getStockHistoricalCharts = symbols => dispatch => { //load in additional stock charts
  const stocks = {};
  const promises = [];
  symbols.forEach(symbol => {
    promises.push(APIUtil.getHistoricalChart(symbol).then(chart => {
      Object.assign(stocks, {[symbol]: {charts: formatChart(chart)}});
    }));
  });
  return Promise.all(promises).then(() => {
    dispatch(receiveStocks(stocks));
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


export const receiveStocks = stocks => ({
  type: RECEIVE_STOCKS,
  stocks
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

