const keys = require("../../keys.json");

export const fetchStock = symbol => (
  $.ajax({
    method: "GET",
    url: `api/stocks/${symbol}`
  })
);

export const makeTransaction = transaction => (
  $.ajax({
    method: "POST",
    url: `api/transactions/`,
    data: {transaction}
  })
);

export const getChart = (symbol, range) => (
  $.ajax({
    method: "GET",
    url:`https://api.iextrading.com/1.0/stock/${symbol}/chart/${range}`
  })
);

export const getInfo = symbol => (
  $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/${symbol}/quote`,
    data: {
      filter: "previousClose, marketCap, peRatio, avgTotalVolume, high, low, open, latestVolume, week52High, week52Low"
    }
  })
);

export const getNews = name => (
  $.ajax({
    method: "GET",
    url: `https://newsapi.org/v2/everything`,
    data: {
      q: name,
      language: "en",
      apiKey: window.newsAPIKey,
      pageSize: 5
    }
  })
);

export const getPrice = symbol => (
  $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/${symbol}/price`
  })
);

export const getSearch = () => (
  $.ajax({
    method: "GET",
    url: `api/stocks/`
  })
);