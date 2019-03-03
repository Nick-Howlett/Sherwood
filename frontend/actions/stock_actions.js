import * as APIUtil from "../utils/stock_api_utils";
import {timeInt, timeStr} from "../utils/time_utils";

export const RECEIVE_CHART = "RECEIVE_CHART";
export const RECEIVE_INFO = "RECEIVE_INFO";
export const RECEIVE_NEWS = "RECEIVE_NEWS";


export const fetchStock = symbol => dispatch => {
  APIUtil.fetchStock(symbol).then(info => dispatch(receiveInfo(symbol, info)));
};

export const getInfo = symbol => dispatch => {
  APIUtil.getInfo(symbol).then(info => dispatch(receiveInfo(symbol, info)));
}

export const get1dChart = symbol => dispatch => {
  APIUtil.get1dChart(symbol).then(chart => dispatch(receiveChart(padChart(fixDelay(chart)), "1d")));
}

export const getChart = (symbol, range) => dispatch => {
  APIUtil.getChart(symbol, range).then(chart => dispatch(receiveChart(chart, range)));
};

export const getNews = symbol => dispatch => {
  APIUtil.getNews(symbol).then(news => dispatch(receiveNews(news)));
}

export const receiveInfo = (symbol, info) => ({
  type: RECEIVE_INFO,
  symbol,
  info
});

export const receiveNews = news => ({
  type: RECEIVE_NEWS,
  news
})


export const receiveChart = (chart, range) => ({
  type: RECEIVE_CHART,
  range,
  chart
});



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
  Fix Delay -
  The IEX has a 15 minute delay on marketOpen values, so we use the IEX open for the last three data points.

*/

function fixDelay(chart){
  for(let i = chart.length - 4; i < chart.length; i++){
      chart[i].marketOpen = chart[i].open;
  }
  return chart;
}
