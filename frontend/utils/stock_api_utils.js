import moment from "moment";

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
    url: `https://api.marketstack.com/v1/intraday`,
    data: {
      symbol: symbol,
      range: 1,
      interval: 5,
      api_token: window.stocksAPIKey,
    },
  });

export const getHistoricalChart = (symbol) => {
  const dateEnd = moment().subtract(5, "years").format("YYYY-MM-DD");
  return $.ajax({
    method: "GET",
    url: `https://api.marketstack.com/v1/history`,
    data: {
      symbol: symbol,
      date_from: dateEnd,
      api_token: window.stocksAPIKey,
    },
  });
};

export const getInfo = (symbol) => {
  return $.ajax({
    method: "GET",
    url: `https://api.marketstack.com/v1/stock`,
    data: {
      symbol: symbol,
      api_token: window.stocksAPIKey,
    },
  }).then((info) => info.data[0]);
};

export const getNews = (name) => {
  if (name) {
    return $.ajax({
      method: "GET",
      url: `https://newsapi.org/v2/everything`,
      data: {
        q: name,
        language: "en",
        apiKey: window.newsAPIKey,
        pageSize: 5,
      },
    });
  } else {
    return $.ajax({
      method: "GET",
      url: `https://newsapi.org/v2/top-headlines`,
      data: {
        category: "business",
        country: "us",
        apiKey: window.newsAPIKey,
        pageSize: 5,
      },
    });
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
