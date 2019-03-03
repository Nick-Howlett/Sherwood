export const fetchStock = symbol => (
  $.ajax({
    method: "GET",
    url: `api/stocks/${symbol}`
  })
);

export const getChart = (symbol, range) => (
  $.ajax({
    method: "GET",
    url:`https://api.iextrading.com/1.0/stock/${symbol}/chart/${range}`
  })
);

export const get1dChart = symbol => (
  $.ajax({
    method: "GET",
    url:`https://api.iextrading.com/1.0/stock/${symbol}/chart/1d`,
    data:{
      chartInterval: 5
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

export const getNews = symbol => (
  $.ajax({
    method: "GET",
    url: `https://api.iextrading.com/1.0/stock/${symbol}/news`
  })
);
