import React from 'react';

export default ({active, payload, value, prev, coordinate}) => {
  let stockValue;
  if(active && payload && payload[0]){
    stockValue = payload[0].value;
  } else {
    stockValue = value;
  }
  const diff = (stockValue - prev).toFixed(2);
  const percent = ((diff / prev) * 100).toFixed(2);
  return (
    <div>
      <h1>{"$" + stockValue.toFixed(2)}</h1>
      <div id="chart-percents">
        {`${diff > 0 ? "+" : ""}${diff} (${percent}%)`}
      </div>
      <div 
        id="chart-time" 
        style={{left: coordinate.x - 32}}>
          <span>
            {`${payload && payload[0] ? payload[0].payload.label : ""}`}
          </span>
        </div>
    </div>
  )  
}