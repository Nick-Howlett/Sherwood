import React from 'react';
import {Link} from 'react-router-dom';

export default ({stock}) => {
  return (
    <Link className="search-item" to={`/stocks/${stock.symbol}`}><div>{stock.symbol}</div><div>{stock.name}</div></Link>
  )
}