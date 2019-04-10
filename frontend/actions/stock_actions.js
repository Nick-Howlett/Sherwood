import * as APIUtil from "../utils/stock_api_utils";
import {padChart, formatChart, createDateRangeCharts, createProfileCharts, createProfile1dChart} from '../utils/chart_utils';
import {uniq} from 'lodash';

export const RECEIVE_CHART = "RECEIVE_CHART";
export const RECEIVE_INFO = "RECEIVE_INFO";
export const RECEIVE_NEWS = "RECEIVE_NEWS";
export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const RECEIVE_TRANSACTIONS = "RECEIVE_TRANSACTIONS";
export const RECEIVE_PREV_CLOSES = "RECEIVE_PREV_CLOSES";
export const RECEIVE_PRICE = "RECEIVE_PRICE";
export const RECEIVE_SEARCH = "RECEIVE_SEARCH";
export const RECEIVE_TRANSACTION_ERRORS = "RECEIVE_TRANSACTION_ERRORS";
export const RECEIVE_WATCH = "RECEIVE_WATCH";
export const DELETE_WATCH = "DELETE_WATCH";
export const RECEIVE_WATCHLIST_INFO = "RECEIVE_WATCHLIST_INFO";

export const fetchStock = symbol => dispatch => {
  APIUtil.fetchStock(symbol).then(info => dispatch(receiveInfo(symbol, info)));
};

export const getInfo = symbol => dispatch => {
  APIUtil.getInfo(symbol).then(info => dispatch(receiveInfo(symbol, info)));
};

export const getProfilePrevClose = (shares, id) => dispatch => {
  if(Object.entries(shares).length === 0 && shares.constructor === Object){
    return dispatch(receivePrevCloses(id, shares, {}));
  } else{
    APIUtil.getProfilePrevClose(Object.keys(shares)).then(prevCloses => dispatch(receivePrevCloses(id, shares, prevCloses)));
  }
}

export const makeTransaction = transaction => dispatch => {
  return APIUtil.makeTransaction(transaction).then(payload => dispatch(receiveTransaction(payload)), 
  ({responseJSON}) => dispatch(receiveErrors(responseJSON)));
};

export const getCharts = symbol => dispatch => {
  const charts = {};
  return APIUtil.getChart(symbol, "5y").then(chart => {
    Object.assign(charts, createDateRangeCharts(formatChart(chart, "5y")));
    return APIUtil.getChart(symbol, '1d').then(chart => {
      Object.assign(charts, {"1d": padChart(formatChart(chart, "1d"))});
      dispatch(receiveChart(charts));
    });
  });
};

export const getProfileCharts = transactions => dispatch => {
  const symbols = uniq(transactions.map(transaction => transaction.symbol));
  if(transactions.length === 0){
    return dispatch(receiveChart({"1w": [], "1m": [], "3m": [], "1y": [], "5y": []}));
  } else{
    return APIUtil.getProfileChart(['AAPL', ...symbols], "5y").then(charts => dispatch(receiveChart(createProfileCharts(transactions, charts))));
  }
}

export const getProfile1dChart = shares => dispatch => {
  if(Object.entries(shares).length === 0 && shares.constructor === Object){
    return dispatch(receiveChart({"1d": []}));
  } else {
    return APIUtil.getProfileChart(Object.keys(shares), "1d").then(charts => dispatch(receiveChart({"1d": createProfile1dChart(shares, charts)})));
  }
}

export const getNews = name => dispatch => {
  APIUtil.getNews(name).then(news => dispatch(receiveNews(news)));
};

export const getProfileNews = () => dispatch => {
  APIUtil.getProfileNews().then(news => dispatch(receiveNews(news)));
};

export const getPrice = symbol => dispatch => {
  APIUtil.getPrice(symbol).then(price => dispatch(receivePrice(symbol, price)));
}

export const getSearch = () => dispatch => {
  return APIUtil.getSearch().then(search => dispatch(receiveSearch(search)));
};

export const watchStock = (id, symbol) => dispatch => {
  return APIUtil.watchStock(id, symbol).then(watch => dispatch(receiveWatch(watch)));
};

export const removeWatch = id => dispatch => {
  return APIUtil.deleteWatch(id).then(({id}) => dispatch(deleteWatch(id)));
};


export const getWatchlistInfo = watchedStocks => dispatch => {
  if(Object.keys(watchedStocks).length === 0) return null;
  return APIUtil.getWatchlistInfo(watchedStocks.map(stock => stock.symbol)).then(info => dispatch(receiveWatchlistInfo(info, watchedStocks)));
}


export const receivePrevCloses = (id, shares, prevCloses) => ({
  type: RECEIVE_PREV_CLOSES,
  id,
  shares,
  prevCloses
});

export const receiveErrors = errors => ({
  type: RECEIVE_TRANSACTION_ERRORS,
  errors
})


export const receivePrice = (symbol, price) => ({
  type: RECEIVE_PRICE,
  symbol,
  price
})

export const receiveTransaction = payload => ({
  type: RECEIVE_TRANSACTION,
  payload
});

export const receiveTransactions = transactions => ({
  type: RECEIVE_TRANSACTIONS,
  transactions
})


export const receiveInfo = (symbol, info) => ({
  type: RECEIVE_INFO,
  symbol,
  info
});

export const receiveNews = news => ({
  type: RECEIVE_NEWS,
  news
})


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

