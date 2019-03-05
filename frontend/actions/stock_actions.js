import * as APIUtil from "../utils/stock_api_utils";
import {timeInt, timeStr, formatDate} from "../utils/time_utils";

export const RECEIVE_CHART = "RECEIVE_CHART";
export const RECEIVE_INFO = "RECEIVE_INFO";
export const RECEIVE_NEWS = "RECEIVE_NEWS";
export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const RECEIVE_TRANSACTIONS = "RECEIVE_TRANSACTIONS";
export const RECEIVE_PRICE = "RECEIVE_PRICE";
export const RECEIVE_SEARCH = "RECEIVE_SEARCH";
export const RECEIVE_TRANSACTION_ERRORS = "RECEIVE_TRANSACTION_ERRORS";

export const fetchStock = symbol => dispatch => {
  APIUtil.fetchStock(symbol).then(info => dispatch(receiveInfo(symbol, info)));
};

export const getInfo = symbol => dispatch => {
  APIUtil.getInfo(symbol).then(info => dispatch(receiveInfo(symbol, info)));
};

export const makeTransaction = transaction => dispatch => {
  return APIUtil.makeTransaction(transaction).then(payload => dispatch(receiveTransaction(payload)), ({responseJSON}) => dispatch(receiveErrors(responseJSON)));
};

export const get1dChart = symbol => dispatch => {
  APIUtil.getChart(symbol, "1d").then(chart => dispatch(receiveChart({"1d": padChart(fixGaps(chart))})));
}

export const getCharts = symbol => dispatch => {
  APIUtil.getChart(symbol, "5y").then(chart => dispatch(receiveChart(createCharts(chart))));
};

export const getNews = name => dispatch => {
  APIUtil.getNews(name).then(news => dispatch(receiveNews(news)));
};

export const getPrice = symbol => dispatch => {
  APIUtil.getPrice(symbol).then(price => dispatch(receivePrice(symbol, price)));
}

export const getSearch = () => dispatch => {
  return APIUtil.getSearch().then(search => dispatch(receiveSearch(search)));
};


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


function createCharts(chart){
  chart.forEach(datum => {
    datum.date = formatDate(datum.date);
  })
  const charts = {};
  charts["5y"] = chart;
  charts["1y"] = chart.slice(chart.length - 252);
  charts["3m"] = chart.slice(chart.length - 60);
  charts["1m"] = chart.slice(chart.length - 21);
  charts["1w"] = chart.slice(chart.length - 7);
  return charts;
}



//TODO what does the call return before the markets open on a day?
/*
  Pad Chart -
  adds data points to the beginning and end of the chart to create a full day's chart
  The IEX only returns data from 9:30-4:00 and the chart needs to display from 9:00-6:00.
*/
function padChart(chart){
  const firstPrice = chart[0].marketOpen;
  const lastPrice = chart[chart.length - 1].marketOpen;
  let startTime = 900;
  const firstTime = timeInt(chart[0].minute);
  let lastTime = timeInt(chart[chart.length - 1].minute);
  let currTimeStr = new Date().toLocaleTimeString('en-US', {hour12: false, timeZone: `America/New_York`}).slice(0, 5);
  let currentTime = timeInt(currTimeStr);
  currentTime = currentTime - currentTime % 5;
  const endTime = 1800;
  const padLeft = [];
  const padRight = [];
  while(startTime < firstTime){
    padLeft.push({minute: timeStr(startTime), marketOpen: firstPrice});
    startTime += 5;
  }
  if(currentTime > endTime) currentTime = endTime;
  while(lastTime < currentTime){
    lastTime += 5;
    if(lastTime % 100 === 60){
      lastTime += 40;
    }
    padRight.push({minute: timeStr(lastTime), marketOpen: lastPrice});  
  }
  while(currentTime < endTime){
    padRight.push({minute: timeStr(currentTime), marketOpen: null});
    currentTime += 5;
  }
  return padLeft.concat(chart, padRight);
}

/*
  Fix Gaps -
  The IEX has a 15 minute delay on marketOpen values, so we use the IEX open for the last three data points.
  The chart only needs data points for every 5th minute, but data may not be available at that minute, so we
  search backwards and forwards for data.
*/

function fixGaps(chart){
  const newChart = [];
  for(let i = 0; i < chart.length; i += 5){
    if(chart[i].marketOpen){
      //no problems
    } else if(chart[i].open){ //fix those last three data points
      chart[i].marketOpen = chart[i].open;
    } else if(chart[i + 1] && chart[i + 1].marketOpen){
      chart[i].marketOpen = chart[i + 1].marketOpen;
    } else if(chart[i - 1] && chart[i - 1].marketOpen){
      chart[i].marketOpen = chart[i - 1].marketOpen;
    } else if(chart[i + 2] && chart[i + 2].marketOpen){
      chart[i].marketOpen = chart[i + 2].marketOpen;
    } else if(chart[i - 2] && chart[i - 2].marketOpen){
      chart[i].marketOpen = chart[i - 2].marketOpen;
    }
    newChart.push(chart[i]);
  }
  return newChart;
}
