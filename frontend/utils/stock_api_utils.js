import moment from "moment";

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

export const getIntradayChart = symbol => (
  $.ajax({
    method: "GET",
    url:`https://www.worldtradingdata.com/api/v1/intraday?symbol=${symbol}&range=1&interval=5&api_token=XRILYfvsaaBx3J3bVFWvmYEWEH7TQI91gJrqQl0j3joYtOXxpEQmtUlsQBwn`
  })
);

export const getHistoricalChart = symbol => {
  const dateEnd = moment().subtract(5, 'years').format("YYYY-MM-DD");
  return $.ajax({
    method: "GET",
    url:`https://www.worldtradingdata.com/api/v1/history?symbol=${symbol}&date_from=${dateEnd}&api_token=XRILYfvsaaBx3J3bVFWvmYEWEH7TQI91gJrqQl0j3joYtOXxpEQmtUlsQBwn`
  });
};

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

export const getInfo = symbol => {
  return $.ajax({
    method: "GET",
    url: `https://www.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=XRILYfvsaaBx3J3bVFWvmYEWEH7TQI91gJrqQl0j3joYtOXxpEQmtUlsQBwn`
  }).then(info => info.data[0]);
};

export const getNews = name => {
  if(name){
    return $.ajax({
      method: "GET",
      url: `https://newsapi.org/v2/everything`,
      data: {
        q: name,
        language: "en",
        apiKey: window.newsAPIKey,
        pageSize: 5
      }
    });
  } else {
    return $.ajax({
      method: "GET",
      url: `https://newsapi.org/v2/top-headlines`,
      data: {
        category: "business",
        country: "us",
        apiKey: window.newsAPIKey,
        pageSize: 5
      }
    });
  }
};


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