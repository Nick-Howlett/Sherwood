export const fetchStock = id => (
  $.ajax({
    method: "GET",
    url: `api/stocks/${id}`
  })
)


export const getStock = symbol => (
  $.ajax({
    method: "GET",
    url:`https://api.iextrading.com/1.0/stock/${symbol}/batch`,
    data:{
      types: "quote,news"
    }
  })
);

export const getChart = (symbol, range) => (
  $.ajax({
    method: "GET",
    url:`https://api.iextrading.com/1.0/stock/${symbol}/chart/${range}`
  })
)

export const get1dChart = symbol => (
  $.ajax({
    method: "GET",
    url:`https://api.iextrading.com/1.0/stock/${symbol}/chart/1d`,
    data:{
      chartInterval: 5,
      changeFromClose: true
    }
  })
)

export const getPrev = symbol => (
  $.ajax({
    method: "GET", 
    url:`https://api.iextrading.com/1.0/stock/${symbol}/previous`
  })
)