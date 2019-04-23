import React from 'react';
import {Link} from 'react-router-dom';
import {Line, LineChart, YAxis} from 'recharts';
import {formatMoney} from '../../utils/utils';

export default props => {
  const stock = props.stock;
  if(!stock.symbol || !stock.prev || !stock.chart || !stock.price){
    return null;
  }
  return(
    <Link className="watchlist-item" to={`/stocks/${stock.symbol}`}>
        <div className="flex-column">
          <h4>{stock.symbol}</h4>
          <div>{stock.shares ? `${stock.shares} Shares` : ""}</div>
        </div>
        <LineChart width={60} height={20} margin={{top: 0, right: 0, bottom: 0, left: 0}} data={stock.chart}>
          <Line type={"linear"}
                dataKey={"open"}
                stroke="#21ce99" 
                dot={false}
                isAnimationActive={false}/>
          <YAxis 
            hide 
            domain={[stock.prev, 'dataMax']} />
        </LineChart>
        <h3>{`${formatMoney(stock.price)}`}</h3>
    </Link>
  )
}