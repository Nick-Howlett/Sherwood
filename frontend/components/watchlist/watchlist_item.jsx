import React from 'react';
import {Link} from 'react-router-dom';
import {Line, LineChart, YAxis} from 'recharts';
import {formatMoney} from '../../utils/utils';

export default props => {
  if(!props.stock.symbol || !props.stock.prev || !props.stock.chart || !props.stock.price){
    return null;
  }
  return(
    <Link className="watchlist-item" to={`/stocks/${props.stock.symbol}`}>
        <div className="flex-column">
          <h4>{props.stock.symbol}</h4>
          <div>{props.stock.shares ? `${props.stock.shares} Shares` : ""}</div>
        </div>
        <LineChart width={60} height={20} margin={{top: 0, right: 0, bottom: 0, left: 0}} data={props.stock.chart}>
          <Line type={"linear"}
                dataKey={"marketOpen"}
                stroke="#21ce99" 
                dot={false}
                isAnimationActive={false}/>
          <YAxis 
            hide 
            domain={[props.stock.prev, 'dataMax']} />
        </LineChart>
        <h3>{`${formatMoney(props.stock.price)}`}</h3>
    </Link>
  )
}