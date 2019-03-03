import React from 'react';


export default ({info}) => {
    const gridValues = {"CEO": info.ceo, 
                       "Employees": info.employees, 
                       "Headquarters": info.headquarters, 
                       "Founded": info.founded, 
                       "Market Cap": info.marketCap, 
                       "Price-Earnings Ratio": info.peRatio,
                       "Dividend Yield": info.dividend_yield,
                       "Average Volume": info.avgTotalVolume,
                       "High Today": info.high,
                       "Low Today": info.low,
                       "Open Price": info.open,
                       "Volume": info.latestVolume,
                       "52 Week High": info.week52High,
                       "52 Week Low": info.week52Low};
    return(
      <div id="stock-about">
        <h2>About</h2>
        <h3>{info.description}</h3>
        <div className="grid">
          {Object.keys(gridValues).map(key => {
             return (
              <div key={key} className="grid-item">
                <div className="grid-head">{key}</div>
                <div className="grid-value">{gridValues[key]}</div>
              </div>
              )
          })};
        </div>
      </div>
    )
}