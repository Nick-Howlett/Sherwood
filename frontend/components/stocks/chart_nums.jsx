import React from 'react';
import {minuteToLabel} from "../../utils/time_utils";

export default ({active, payload, value, prev, coordinate}) => {
  let bigNum;
  if(active && payload[0]){
    bigNum = payload[0].value;
  } else {
    bigNum = value;
  }
  const diff = (bigNum - prev).toFixed(2);
  const percent = ((diff / prev) * 100).toFixed(2);
  return (
    <div>
      <h1>{"$" + bigNum.toFixed(2)}</h1>
      <div id="chart-percents">{`${diff > 0 ? "+" : ""}${diff} (${percent}%)`}</div>
      <div id="chart-time" style={{left: coordinate.x - 32}} id="chart-time"><span>{`${payload[0] ? `${minuteToLabel(payload[0].payload.minute)} ET` : ""}`}</span></div>
    </div>
  )  
}