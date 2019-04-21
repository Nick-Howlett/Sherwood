import React from 'react';
import {Link} from 'react-router-dom';
import {Line, LineChart, YAxis} from 'recharts';
import {formatMoney} from '../../utils/utils';

export default props => {
  if(!props.stock.symbol || !props.stock.close_yesterday || !props.stock.charts["1d"] || !props.stock.price){
    return null;
  }
  return(
    <Link className="watchlist-item" to={`/stocks/${props.stock.symbol}`}>
        <div className="flex-column">
          <h4>{props.stock.symbol}</h4>
          <div>{props.stock.shares ? `${props.stock.shares} Shares` : ""}</div>
        </div>
        <LineChart width={60} height={20} margin={{top: 0, right: 0, bottom: 0, left: 0}} data={props.stock.charts["1d"]}>
          <Line type={"linear"}
                dataKey={"open"}
                stroke="#21ce99" 
                dot={false}
                isAnimationActive={false}/>
          <YAxis 
            hide 
            domain={[props.stock.close_yesterday, 'dataMax']} />
        </LineChart>
        <h3>{`${formatMoney(props.stock.price)}`}</h3>
    </Link>
  )
}