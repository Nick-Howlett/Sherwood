import React from 'react';
import WatchlistItem from './watchlist_item';

export default props => {
  return ( 
    <div id="watchlist">
      <div className="watchlist-header">
          <h3>Stocks</h3>
      </div>
      <ul className="flex-column">
        {props.ownedStocks.map(stock => <WatchlistItem key={stock.id} stock={stock}/>)}
      </ul>
      <div className="watchlist-header">
          <h3>Watchlist</h3>
      </div>
      <ul className="flex-column">
        {props.watchedStocks.map(stock => <WatchlistItem key={stock.id} stock={stock}/>)}
      </ul>
    </div>
  )
}