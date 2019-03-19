import React from 'react';
import WatchlistItem from './watchlist_item';

export default props => { 
  return ( 
    <div id="watchlist">
      {WatchlistSection("Stocks", props.ownedStocks)}
      {WatchlistSection("Watchlist", props.watchedStocks)}
    </div>
  )
}

const WatchlistSection = (header, stocks) => {
  let emptyMessage = "";
  if(stocks.length === 0){
    emptyMessage = header === "Stocks" ? "No Owned Stocks" : "No Watched Stocks"
  }
  return(
    <>
      <div className="watchlist-header">
        <h3>{header}</h3>
      </div>
      <ul className="flex-column">
        <h4>{emptyMessage}</h4>
        {stocks.map(stock => <WatchlistItem key={stock.symbol} stock={stock}/>)}
      </ul>
    </>
  )
}