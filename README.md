# <img src="https://raw.githubusercontent.com/Nick-Howlett/Sherwood/master/app/assets/images/sherwood_logo_green.png" width="40" height="40" /> Sherwood

## About
[Live Demo](https://sherwoodapp.herokuapp.com?utm_source=readme&medium=body)

Sherwood is a single page app clone of the popular stock trading site robinhood.com featuring over 8,000 publicly traded companies complete with company information, real-time stock data, and interactive charts of stock and portfolio performance.

## Site Features
  * Account creation/User authentication
  * Detailed information and performance charts for over 8000 publically traded stocks
  * Real-time stock data provided by the [IEX](https://iextrading.com/developer/docs/)
  * Interactive, time-sentitive chart rendering using Moment.js and Recharts
  * Relevant business and individual stock-related news provided by the [News API](https://newsapi.org/)
  * Ability to add to and remove stocks from a user's watchlist
  * Ability to 'buy' and 'sell' stocks within Sherwood's ecosystem.
  
### Profile Chart
<img src="https://raw.githubusercontent.com/Nick-Howlett/Sherwood/master/app/assets/images/gif-profile.gif"/>

One of the most difficult portions of building Sherwood was creating an efficient algorithm to turn up to five years of user transactions into the one day to five year portfolio charts. After a number of different permutations I settled on the following algorithm:

```javascript
export const createProfileCharts = (transactions, charts) => {
  //we reverse to line the charts up. Not all charts have 5 years of data, but all have data starting from now going back
  Object.keys(charts).forEach(symbol => charts[symbol].chart.reverse()); 
  //We have configured charts to always contain apple and we know it goes back the full five years, so we build our base from it.
  baseChart.forEach((day, i) => {
    const numSharesOnDay = countStocks(transactions, day.date);
    Object.keys(numSharesOnDay).forEach(symbol => {
      const dayPrice = charts[symbol].chart[i];
      const numShares = numSharesOnDay[symbol];
      day.open += dayPrice.open * numShares;
      day.close += dayPrice.close * numShares;
    });
  });
  return createDateRangeCharts(baseChart.reverse());
};
```
The first issue was, of course, avoiding high runtimes as a user could have a massive volume of transactions over a five year period. Fortunately, because each chart can have up to around 1,200 data points, any manipulation of charts remains constant time. The algorithm is therefore O(m * n) where m is the number of transactions and n is the number of different stocks the user owns. 

Another early roadblock was lining up companies which hadn't been public the full five years. If company A went public four years ago, then their first chart data point will be on a different date from company B who went public five years ago. I came to the conclusion that the best solution was to simply reverse the charts to line them up, such that the first data point for both company A and B is yesterday. 

The final issue was showing five years of data if the user had no stocks as old as five years. Building a chart going back five years from scratch is a difficult affair because the stock market isn't open on weekends, so the length of the chart differs based on whether the user is viewing the chart on a weekday or weekend. By ensuring that my API call always returned data for Apple Inc., I was able to use that chart to build a 'base chart' of empty data points going back the required five years with the correct days no matter what day the user is viewing the chart on.

### Stock Details
<img src="https://raw.githubusercontent.com/Nick-Howlett/Sherwood/master/app/assets/images/gif-stock-page.gif"/>

## Technologies
Sherwood uses a Ruby on Rails backend with a Postgresql database to store non-real time external information such as certain stock details(company name, location, number of employees) as well as users, transactions, and watchlists. Sherwood's frontend is built in React/Redux, with chart data displayed by Recharts, Stock information provided by the [IEX API](https://iextrading.com/developer/docs/) and news provided by the [News Api](https://newsapi.org/). 

