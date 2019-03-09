import moment from 'moment';
import tz from 'moment-timezone';


// export const createProfileCharts = (stockShares, charts) => {
//   const symbols = Object.keys(stockShares);
//   const res = [];
//   symbols.forEach(symbol => {
//     const chart = charts[symbol].chart.reverse();
//     const shares = stockShares[symbol];
//     for(let i = 0; i < chart.length; i++){
//       const open = chart[i].open * shares;
//       const close = chart[i].close * shares;
//       if(res[i]){
//         res[i].open += open;
//         res[i].close += close;
//       } else {
//         const datum = {};
//         datum.open = open;
//         datum.close = close;
//         datum.date = chart[i].date;
//         res[i] = datum;
//       }
//     }
//   });
//   return createCharts(formatChart(res.reverse(), "5y"));
// };

export const createProfileCharts = (transactions, charts) => {
  Object.keys(charts).forEach(symbol => {
    charts[symbol].chart.reverse();
  });
  const baseChart = removeValues(formatChart(charts.AAPL.chart, '5y')); //We ensure that we always have the apple chart and we know it goes back the full five years. O(1) fixed chart length
  transactions.forEach(transaction => {  //for testing, bring transactions within time period.
    transaction.time.subtract(7, 'd');
  });
  for(let i = 0; i < baseChart.length; i++){
    const shares = countStocksAfterTime(baseChart[i].date , transactions);
    Object.keys(shares).forEach(symbol => {
      if(charts[symbol].chart[i])
        baseChart[i].open += charts[symbol].chart[i].open * shares[symbol];
        baseChart[i].close += charts[symbol].chart[i].close * shares[symbol];
    });
  }
  return createCharts(baseChart.reverse());
};

const countStocksAfterTime = (date, transactions) => {
  const stocks = {};
  for(let i = 0; i < transactions.length; i++){
    if(date.isBefore(transactions[i].time))
      return stocks;  
    else{
      const stock = transactions[i];
      if(stocks[stock.symbol]){
        if(stock.transactionType === "purchase"){
          stocks[stock.symbol] += stock.numShares;
        } else {
          stocks[stock.symbol] -= stock.numShares;
          if(stocks[stock.symbol] === 0){
            delete stocks[stock.symbol];
          }
        }
      } else {
        stocks[stock.symbol] = stock.numShares; // we're assuming that the dataset is good, no selling before purchasing.
      }
    }
  }
  return stocks;
};

const removeValues = chart => {
  chart.forEach(datum => {
    datum.close = 0;
    datum.open = 0;
  });
  return chart;
}

export const createProfile1dChart = (stockShares, charts) => {
  const symbols = Object.keys(stockShares);
  const res = [];
  symbols.forEach(symbol => {
    const chart = formatChart(charts[symbol].chart);
    const shares = stockShares[symbol];
    for(let i = 0; i < chart.length; i++){
      if(res[i]){
        res[i].marketOpen += chart[i].marketOpen * shares;
      } else {
        chart[i].marketOpen *= shares;
        res[i] = chart[i];
      }
    }
  });
  return padChart(res);
};

export const createCharts = chart => {
  const charts = {};
  charts["5y"] = chart;
  charts["1y"] = chart.slice(chart.length - 252);
  charts["3m"] = chart.slice(chart.length - 60);
  charts["1m"] = chart.slice(chart.length - 21);
  charts["1w"] = chart.slice(chart.length - 7);
  return charts;
};

export const formatChart = (chart, type) => {
  const res = [];
  if(type === '5y'){
    for(let i = 0; i < chart.length; i++){
      let datum = {};
      datum.close = chart[i].close;
      datum.open = chart[i].open;
      datum.date = moment(chart[i].date);
      datum.label = datum.date.format("MMM DD YYYY");
      res.push(datum);
    }
  } else{
    for(let i = 0; i < chart.length; i += 5){
      let datum = {};
      if(chart[i].marketOpen){
        datum.marketOpen = chart[i].marketOpen;
      } else if(chart[i].open){ //fix those last three data points
        datum.marketOpen = chart[i].open;
      } else if(chart[i + 1] && chart[i + 1].marketOpen){
       datum.marketOpen = chart[i + 1].marketOpen;
      } else if(chart[i - 1] && chart[i - 1].marketOpen){
       datum.marketOpen = chart[i - 1].marketOpen;
      } else if(chart[i + 2] && chart[i + 2].marketOpen){
       datum.marketOpen = chart[i + 2].marketOpen;
      } else if(chart[i - 2] && chart[i - 2].marketOpen){
       datum.marketOpen = chart[i - 2].marketOpen;
      }
      else if(chart[i + 3] && chart[i + 3].marketOpen){
       datum.marketOpen = chart[i + 3].marketOpen;
      }
      else if(chart[i - 3] && chart[i - 3].marketOpen){
       datum.marketOpen = chart[i - 3].marketOpen;
      } 
      else if(chart[i + 4] && chart[i + 4].marketOpen){
        datum.marketOpen = chart[i + 4].marketOpen;
      }
      else if(chart[i - 4] && chart[i - 4].marketOpen){
        datum.marketOpen = chart[i - 4].marketOpen;
      } else if(chart[i + 1] && chart[i + 1].open){ //start checking opens instead, for last 15 minutes of graph where there are only opens, no marketOpens.
        datum.marketOpen = chart[i + 1].open;
      } else if(chart[i - 1] && chart[i - 1].open){
        datum.marketOpen = chart[i - 1].open;
      } else if(chart[i + 2] && chart[i + 2].open){
        datum.marketOpen = chart[i + 2].open;
      } else if(chart[i - 2] && chart[i - 2].open){
        datum.marketOpen = chart[i - 2].open;
      }
      else if(chart[i + 3] && chart[i + 3].open){
        datum.marketOpen = chart[i + 3].open;
      }
      else if(chart[i - 3] && chart[i - 3].open){
        datum.marketOpen = chart[i - 3].open;
      } 
      else if(chart[i + 4] && chart[i + 4].open){
        datum.marketOpen = chart[i + 4].open;
      }
      else if(chart[i - 4] && chart[i - 4].open){
        datum.marketOpen = chart[i - 4].open;
      } 
      else{
        return [];
      }
      let date = chart[i].date;
      let minute = chart[i].minute;  
      datum.time = moment.tz(`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)} ${minute}-05:00`, "America/New_York"); //ugly date formatting to ISO String so that moment can read it.
      datum.label = `${datum.time.format("hh:mm A")} ET`; 
      res.push(datum);
    }
  }
  return res;
}


//TODO what does the call return before the markets open on a day?
/*
  Pad Chart -
  adds data points to the beginning and end of the chart to create a full day's chart
  The IEX only returns data from 9:30-4:00 and the chart needs to display from 9:00-6:00.
*/
export const padChart =  chart => {
  if(chart.length === 0) return chart;
  const firstPrice = chart[0].marketOpen;
  const lastPrice = chart[chart.length - 1].marketOpen;
  let startTime = moment(`${chart[0].time.format("YYYY-MM-DD")}T09:00-05:00`);
  const firstTime = chart[0].time;
  let lastTime = chart[chart.length - 1].time;
  let currentTime = moment();
  const endTime = moment(`${chart[0].time.format("YYYY-MM-DD")}T18:00-05:00`);
  const padLeft = [];
  const padRight = [];
  debugger;
  while(startTime.isBefore(firstTime)){
    padLeft.push({time: startTime, marketOpen: firstPrice, label: `${startTime.format("hh:mm A")} ET`});
    startTime.add(5, "m");
  }
  if(currentTime.isAfter(endTime)) currentTime = endTime;
  while(lastTime.isBefore(currentTime)){
    lastTime.add(5, 'm');
    padRight.push({time: lastTime, marketOpen: lastPrice, label: `${lastTime.format("hh:mm A")} ET`});  
  }
  while(currentTime.isBefore(endTime)){
    padRight.push({time: currentTime, marketOpen: null, label: `${currentTime.format("hh:mm A")} ET`});
    currentTime.add(5, 'm');
  }
  return padLeft.concat(chart, padRight);
}
