import moment from "moment";
import { countStocks } from "../actions/selectors";

export const createProfileCharts = (transactions, charts) => {
  //we reverse to line the charts up. Not all charts have 5 years of data, but all have data starting from now going back
  Object.keys(charts).forEach((symbol) => charts[symbol].reverse());
  const baseChart = createBlankChart(charts["AAPL"]); //We ensure that we always have the apple chart and we know it goes back the full five years
  baseChart.forEach((day, i) => {
    const numSharesOnDay = countStocks(transactions, day.date); //how many and which stocks did the user have on this day?
    Object.keys(numSharesOnDay).forEach((symbol) => {
      const dayPrice = charts[symbol][i];
      const numShares = numSharesOnDay[symbol];
      day.open += dayPrice.open * numShares;
      day.close += dayPrice.close * numShares;
    });
  });

  console.log(baseChart);
  return createDateRangeCharts(baseChart.reverse());
};

const createBlankChart = (chart) => {
  chart.forEach((datum) => {
    datum.close = 0;
    datum.open = 0;
    datum.date = moment(datum.date);
  });
  return chart;
};

export const createProfile1dChart = (shares, charts) => {
  const symbols = Object.keys(shares);
  const minLength = Math.min(
    ...Object.values(charts).map((chart) => chart.length)
  );
  const res = [];
  symbols.forEach((symbol) => {
    const chart = charts[symbol];
    const numShares = shares[symbol];
    for (let i = 0; i < minLength; i++) {
      if (!res[i]) res[i] = Object.assign({}, chart[i]);
      res[i].open += chart[i].open * numShares;
    }
  });
  return res;
};

export const createDateRangeCharts = (chart) => {
  const charts = {};
  charts["5y"] = chart;
  charts["1y"] = chart.slice(chart.length - 252);
  charts["3m"] = chart.slice(chart.length - 60);
  charts["1m"] = chart.slice(chart.length - 21);
  charts["1w"] = chart.slice(chart.length - 7);
  return charts;
};

export const formatChart = (chart) => {
  const chartData = chart.data;
  if (!chartData) {
    return [];
  }

  const formattedChart = Object.keys(chartData)
    .map((date) => {
      const datum = chartData[date];
      const momentDate = moment.tz(date, "America/New_York");
      return {
        open: parseFloat(datum.open),
        close: parseFloat(datum.close),
        high: parseFloat(datum.high),
        low: parseFloat(datum.low),
        date: momentDate,
        label: chart.history
          ? momentDate.format("MMM DD YYYY")
          : `${momentDate.format("hh:mm A")} ET`,
      }; //different format for intraday
    })
    .reverse();
  return formattedChart;
};

export const checkSurroundingPoints = (datum, chart, i) => {
  for (let j = i - 4; j < i + 5; j++) {
    if (!chart[j]) continue;
    if (chart[j].marketOpen) {
      datum.marketOpen = chart[j].marketOpen;
      return true;
    } else if (chart[j].open) {
      datum.marketOpen = chart[j].open;
      return true;
    }
  }
  return false;
};

/*
  Pad Chart -
  adds data points to the beginning and end of the chart to create a full day's chart
  The IEX only returns data from 9:30-4:00 and the chart needs to display from 9:00-6:00.
*/
export const padChart = (chart) => {
  if (chart.length === 0) return chart;
  const firstPrice = chart[0].open;
  const lastPrice = chart[chart.length - 1].open;
  let startTime = moment.tz(
    `${chart[0].date.format("YYYY-MM-DD")}T09:00`,
    "America/New_York"
  );
  const firstTime = chart[0].date;
  let lastTime = chart[chart.length - 1].date;
  let currentTime = moment();
  const endTime = moment.tz(
    `${chart[0].date.format("YYYY-MM-DD")}T18:00`,
    "America/New_York"
  );
  const padLeft = [];
  const padRight = [];
  while (startTime.isBefore(firstTime)) {
    padLeft.push({
      date: startTime,
      open: firstPrice,
      label: `${startTime.format("hh:mm A")} ET`,
    });
    startTime.add(5, "m");
  }
  if (currentTime.isAfter(endTime)) currentTime = endTime;
  while (lastTime.isBefore(currentTime)) {
    lastTime.add(5, "m");
    padRight.push({
      date: lastTime,
      open: lastPrice,
      label: `${lastTime.format("hh:mm A")} ET`,
    });
  }
  while (currentTime.isBefore(endTime)) {
    padRight.push({
      date: currentTime,
      open: null,
      label: `${currentTime.format("hh:mm A")} ET`,
    });
    currentTime.add(5, "m");
  }
  return padLeft.concat(chart, padRight);
};
