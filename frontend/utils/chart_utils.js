import moment from 'moment';
import tz from 'moment-timezone';


export const createProfileCharts = (stockShares, charts) => {
  const symbols = Object.keys(stockShares);
  const res = [];
  symbols.forEach(symbol => {
    const chart = charts[symbol].chart.reverse();
    const shares = stockShares[symbol];
    for(let i = 0; i < chart.length; i++){
      const open = chart[i].open * shares;
      const close = chart[i].close * shares;
      if(res[i]){
        res[i].open += open;
        res[i].close += close;
      } else {
        const datum = {};
        datum.open = open;
        datum.close = close;
        datum.date = chart[i].date;
        res[i] = datum;
      }
    }
  });
  return createCharts(formatChart(res.reverse(), "5y"));
};

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
  return res;
};

export const padProfileChart = chart => {
  padLength = 1258 - chart.length;

}

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
      else{
        return "Incomplete one day data, cannot render.";
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
  const firstPrice = chart[0].marketOpen;
  const lastPrice = chart[chart.length - 1].marketOpen;
  let startTime = moment(`${moment().format("YYYY-MM-DD")}T09:00-05:00`);
  const firstTime = chart[0].time;
  let lastTime = chart[chart.length - 1].time;
  let currentTime = moment();
  const endTime = moment(`${moment().format("YYYY-MM-DD")}T18:00-05:00`);
  const padLeft = [];
  const padRight = [];
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
