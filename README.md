# <img src="https://raw.githubusercontent.com/Nick-Howlett/Sherwood/master/app/assets/images/sherwood_logo_green.png" width="40" height="40" /> Sherwood

## About
[Live Demo](https://sherwoodapp.herokuapp.com/#/)

Sherwood is a clone of the popular stock trading site robinhood.com. 

## Site Features:
  * Account creation/User authentication
  * Detailed information and performance charts for over 8000 publically traded stocks
  * Real time stock data
  * Charts detailing a user's portfolio performance
  * Real-time business and individual stock-related news
  * Ability to add to and remove stocks from a user's watchlist
  * Ability to 'buy' and 'sell' stocks within Sherwood's ecosystem.
  
##Technologies
Sherwood uses a Ruby on Rails backend with a Postgresql database to store non-real time external information such as certain stock details(company name, location, number of employees) as well as users, transactions, and watchlists. Sherwood's frontend is built in React/Redux, with chart data displayed by Recharts, Stock information provided by the [IEX API](https://iextrading.com/developer/docs/) and news provided by the [News Api](https://newsapi.org/)
