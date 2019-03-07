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

export const getProfileChart = (symbols, range) => (
  $.ajax({
    method: "GET",
    url:`https://api.iextrading.com/1.0/stock/market/batch`,
    data: {
      symbols: symbols.join(","),
      types: "chart",
      range: range
    }
  })
);

export const getProfilePrevClose = symbols => (
  $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/market/batch`,
    data: {
      symbols: symbols.join(","),
      types: "quote",
      filter: "previousClose"
    }
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

export const getProfileNews = () => (
  $.ajax({
    method: "GET",
    url: `https://newsapi.org/v2/top-headlines`,
    data: {
      category: "business",
      country: "us",
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

export const watchStock = (id, symbol) => (
  $.ajax({
    method: "POST",
    url: `api/stock_watches`,
    data: {
      stock_watch: {user_id: id, symbol}
    }
  })
);


export const deleteWatch = id => (
  $.ajax({
    method: "DELETE",
    url: `api/stock_watches/${id}`
  })
);

export const getWatchlistInfo = symbols => (
  $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/market/batch`,
    data: {
      symbols: symbols.join(","),
      types: "chart,quote",
      range: "1d"
    }
  })
)