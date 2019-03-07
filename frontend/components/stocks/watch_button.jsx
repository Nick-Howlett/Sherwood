import React from 'react';

export default ({watchId, currentUser, watchStock, removeWatch, match}) => {
  if(!watchId){
    return(
      <button id="watch-button" onClick={() => watchStock(currentUser, match.params.symbol)}>Add to Watchlist</button>
      )
  } else{
    return(
      <button id="watch-button" onClick={() => removeWatch(watchId)}>Remove from Watchlist</button>
    )
  }
}