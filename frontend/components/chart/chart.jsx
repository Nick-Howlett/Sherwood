import React from 'react';
import {Line, LineChart, YAxis, XAxis, Tooltip, ReferenceLine} from 'recharts';
import ChartTooltip from './chart_tooltip';

class StockChart extends React.Component{

  constructor(props){
    super(props);
    this.state = {currentChart: "1d"};
  }

  render(){
    const current = this.state.currentChart;
    let data = this.props.charts[current];
    const value = current === "1d" ? "open" : "close";
    let min, end;
    const currentStocks = data.filter(datum => datum[value]);
    min = current === "1d" ? Math.min(this.props.prev, ...currentStocks.map(datum => datum[value])) : "dataMin";
    end = currentStocks[currentStocks.length - 1];
    return (
      <div id="stock-chart">
        {this.state.currentChart === "1d" ? 
            <div className="data-error">
              <span style={{fontSize: "16", color:"red"}}>The Investor's exchange API is in the process of being deprecated, and as a result we are currently unable to display intraday data.<br></br>
              We apologize for the inconvenience as we switch to a new provider! To see a historic GIF of intraday data display please visit </span>
                <a href="https://raw.githubusercontent.com/Nick-Howlett/Sherwood/master/app/assets/images/gif-profile.gif">Here</a><br/>
              <span style={{fontSize: "16", color:"red"}}>Please feel free to click the buttons at the bottom of the chart to see historical data! </span>
            </div> : ""}
        <h1 id="stock-name">{this.props.name}</h1>
        <LineChart width={676} height={196} data={data}>
          <Line 
            activeDot={ {r: 6}} 
            type="linear" 
            strokeWidth={2} 
            dataKey={value} 
            stroke="#21ce99" 
            dot={false}
           />
          <Tooltip 
            wrapperStyle={{visibility: 'visible'}} 
            position={{ x: 0, y: -84 }} 
            content={<ChartTooltip 
                        value={end ? end[value] : 0} 
                        prev={current === "1d" ? this.props.prev : (data[0] ? data[0].open : null)}
                     />} 
          />
          <ReferenceLine className={current === "1d" ? "" : "hidden"} y={this.props.prev}/>
          <YAxis 
            hide 
            domain={[min, 'dataMax']} />
          <XAxis 
            hide
            dataKey="date"/>
        </LineChart>
      <nav id="chart-buttons">
          {["1d", "1w", "1m", "3m", "1y", "5y"].map(range => {
            return(<button 
              key = {range}
              className={this.state.currentChart === range ? 'selected' : ''}
              onClick={() => this.setState({currentChart: range})}>
            {range}</button>)
          })}
        </nav>
      </div>
    )
  }
}

export default StockChart;