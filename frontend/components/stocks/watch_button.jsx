import React from 'react';

export default ({watchId, currentUser, watchStock, removeWatch, match}) => {
  if(!watchId){
    return(
      <button onClick={() => watchStock(currentUser, match.params.symbol)}>Add to Watchlist</button>
      )
  } else{
    return(
      <button onClick={() => removeWatch(watchId)}>Remove from Watchlist</button>
    )
  }
}