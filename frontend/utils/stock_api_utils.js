import moment from "moment";

const buildUrlWithParams = (url, params) => {
  const urlParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    urlParams.append(key, value);
  }
  return url + "?" + urlParams.toString();
};

export const fetchStock = (symbol) =>
  $.ajax({
    method: "GET",
    url: `api/stocks/${symbol}`,
  });

export const makeTransaction = (transaction) =>
  $.ajax({
    method: "POST",
    url: `api/transactions/`,
    data: { transaction },
  });

export const getIntradayChart = (symbol) =>
  $.ajax({
    method: "GET",
    url: buildUrlWithParams(`https://api.marketstack.com/v2/intraday`, {
      symbols: symbol,
      interval: "5min",
      access_key: window.stocksAPIKey,
    }),
  });

export const getHistoricalChart = (symbol) => {
  const dateEnd = moment().subtract(5, "years").format("YYYY-MM-DD");
  return $.ajax({
    method: "GET",
    url: buildUrlWithParams(`https://api.marketstack.com/v2/history`, {
      symbols: symbol,
      date_from: dateEnd,
      access_key: window.stocksAPIKey,
    }),
  });
};

export const getInfo = (symbol) => {
  return $.ajax({
    method: "GET",
    url: buildUrlWithParams(`https://api.marketstack.com/v2/eod`, {
      symbols: symbol,
      access_key: window.stocksAPIKey,
    }),
  }).then((info) => info.data[0]);
};

export const getNews = (name) => {
  if (name) {
    return $.ajax({
      method: "GET",
      url: `api/news/${name}`,
    }).response;
  } else {
    return $.ajax({
      method: "GET",
      url: `api/news`,
    }).response;
  }
};

export const getSearch = () =>
  $.ajax({
    method: "GET",
    url: `api/stocks/`,
  });

export const watchStock = (id, symbol) =>
  $.ajax({
    method: "POST",
    url: `api/stock_watches`,
    data: {
      stock_watch: { user_id: id, symbol },
    },
  });

export const deleteWatch = (id) =>
  $.ajax({
    method: "DELETE",
    url: `api/stock_watches/${id}`,
  });
