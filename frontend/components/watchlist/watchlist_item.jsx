import React from 'react';
import {Link} from 'react-router-dom';
import {Line, LineChart, YAxis, XAxis} from 'recharts';

export default props => {
  return(
    <Link className="watchlist-item" to={`/stocks/${props.stock.symbol}`}>
        <h4>{props.stock.symbol}</h4>
        <LineChart width={60} height={16} margin={{top: 0, right: 0, bottom: 0, left: 0}} data={props.stock.chart}>
          <Line type={"linear"}
                dataKey={"marketOpen"}
                stroke="#21ce99" 
                dot={false}/>
          <YAxis 
            hide 
            domain={[props.stock.prev, 'dataMax']} />
        </LineChart>
        <h3>{`$${props.stock.price.toFixed(2)}`}</h3>
    </Link>
  )
}