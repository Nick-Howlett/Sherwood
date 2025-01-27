import * as APIUtil from "../utils/stock_api_utils";
import {
  formatChart,
  createProfile1dChart,
  createProfileCharts,
  createDateRangeCharts,
  padChart,
} from "../utils/chart_utils";

export const RECEIVE_STOCK = "RECEIVE_STOCK";
export const RECEIVE_OWNED_STOCK = "RECEIVE_OWNED_STOCK";
export const RECEIVE_PREV_CLOSE = "RECEIVE_PREV_CLOSE";
export const RECEIVE_CHART = "RECEIVE_CHART";
export const RECEIVE_NEWS = "RECEIVE_NEWS";
export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const RECEIVE_TRANSACTIONS = "RECEIVE_TRANSACTIONS";
export const RECEIVE_SEARCH = "RECEIVE_SEARCH";
export const RECEIVE_TRANSACTION_ERRORS = "RECEIVE_TRANSACTION_ERRORS";
export const RECEIVE_WATCH = "RECEIVE_WATCH";
export const DELETE_WATCH = "DELETE_WATCH";
export const RECEIVE_WATCHLIST_ITEM = "RECEIVE_WATCHLIST_ITEM";
export const CLEAR_CHARTS = "CLEAR_CHARTS";

export const getStockDisplay =
  (symbols, shares = {}, watchedStocks = new Set()) =>
  (dispatch) => {
    //Get any info we need to display the page's initial state
    const promises = [];
    const allCharts = {};
    let prev = 0;
    symbols.forEach((symbol) => {
      const stock = {};
      promises.push(
        Promise.all([
          APIUtil.fetchStock(symbol),
          APIUtil.getInfo(symbol),
          APIUtil.getIntradayChart(symbol),
        ]).then((values) => {
          const info = values.slice(0, 2);
          const chart = formatChart(values[2], true);
          info.forEach((info) => {
            Object.assign(stock, info);
          });
          if (symbol in shares) {
            prev += parseFloat(stock.close) * shares[symbol];
          } else if (symbols.length === 1) {
            prev = parseFloat(stock.close);
          }
          allCharts[symbol] = chart;
          dispatch(receiveStock({ [stock.symbol]: stock }));
          const watchlistItem = {
            symbol,
            prev: stock.close,
            price: stock.price,
            chart: chart,
          };
          if (watchedStocks.has(symbol)) {
            dispatch(receiveWatchlistItem(Object.assign({}, watchlistItem)));
          }
          if (symbol in shares) {
            watchlistItem.shares = shares[symbol];
            dispatch(receiveOwnedStock(watchlistItem));
          }
        })
      );
    });
    return Promise.all(promises).then(() => {
      const returnChart =
        symbols.length === 1
          ? { "1d": padChart(allCharts[symbols[0]]) }
          : { "1d": padChart(createProfile1dChart(shares, allCharts)) };

      dispatch(receiveChart(returnChart));
      dispatch(receivePrevClose(prev));
    });
  };

export const getStockHistoricalCharts =
  (symbols, transactions) => (dispatch) => {
    //load in additional stock charts
    const promises = [];
    const allCharts = {};
    symbols.forEach((symbol) => {
      promises.push(
        APIUtil.getHistoricalChart(symbol).then((chart) => {
          allCharts[symbol] = formatChart(JSON.parse(chart.response));
        })
      );
    });

    return Promise.all(promises).then(() => {
      const returnChart =
        symbols.length === 1
          ? createDateRangeCharts(allCharts[symbols[0]])
          : createProfileCharts(transactions, allCharts);
      dispatch(receiveChart(returnChart));
    });
  };

export const clearCharts = () => ({
  type: CLEAR_CHARTS,
});

export const makeTransaction = (transaction) => (dispatch) => {
  return APIUtil.makeTransaction(transaction).then(
    (payload) => dispatch(receiveTransaction(payload)),
    ({ responseJSON }) => dispatch(receiveErrors(responseJSON))
  );
};

export const getNews = (name) => (dispatch) => {
  APIUtil.getNews(name).then((news) =>
    dispatch(receiveNews(JSON.parse(news.response)))
  );
};

export const getSearch = () => (dispatch) => {
  return APIUtil.getSearch().then((search) => dispatch(receiveSearch(search)));
};

export const watchStock = (id, symbol) => (dispatch) => {
  return APIUtil.watchStock(id, symbol).then((watch) =>
    dispatch(receiveWatch(watch))
  );
};

export const removeWatch = (id) => (dispatch) => {
  return APIUtil.deleteWatch(id).then(({ id }) => dispatch(deleteWatch(id)));
};

export const receiveOwnedStock = (stock) => ({
  type: RECEIVE_OWNED_STOCK,
  stock,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_TRANSACTION_ERRORS,
  errors,
});

export const receiveTransaction = (payload) => ({
  type: RECEIVE_TRANSACTION,
  payload,
});

export const receiveTransactions = (transactions) => ({
  type: RECEIVE_TRANSACTIONS,
  transactions,
});

export const receiveStock = (stock) => ({
  type: RECEIVE_STOCK,
  stock,
});

export const receiveNews = (news) => ({
  type: RECEIVE_NEWS,
  news,
});

export const receiveChart = (chart) => ({
  type: RECEIVE_CHART,
  chart,
});

export const receiveSearch = (search) => ({
  type: RECEIVE_SEARCH,
  search,
});

export const receiveWatch = (watch) => ({
  type: RECEIVE_WATCH,
  watch,
});

export const deleteWatch = (id) => ({
  type: DELETE_WATCH,
  id,
});

export const receivePrevClose = (prev) => ({
  type: RECEIVE_PREV_CLOSE,
  prev,
});

export const receiveWatchlistItem = (item) => ({
  type: RECEIVE_WATCHLIST_ITEM,
  item,
});
