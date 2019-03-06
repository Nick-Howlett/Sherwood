import moment from 'moment';
import tz from 'moment-timezone';


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
