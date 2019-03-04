import React from 'react';
import {Line, LineChart, YAxis, XAxis, Tooltip, ReferenceLine} from 'recharts';
import ChartNums from './chart_nums';

class StockChart extends React.Component{

  constructor(props){
    super(props);
    this.state = {currentChart: "1d"};
  }

  render(){
    const current = this.state.currentChart;
    const data = this.props.charts[current];
    const value = current === "1d" ? "marketOpen" : "close";
    const currentStocks = data.filter(datum => datum[value]);
    let min = current === "1d" ? Math.min(this.props.prev, ...currentStocks.map(datum => datum[value])) : "dataMin";
    const end = currentStocks[currentStocks.length - 1];
    return (
      <div id="stock-chart">
        <h1>{this.props.name.split(" ")[0]}</h1>
        <LineChart width={676} height={196} data={data}>
          <Line 
            activeDot={ {r: 6}} 
            type="linear" 
            strokeWidth={2} 
            dataKey={value} 
            stroke="#21ce99" 
            dot={false}
            isAnimationActive={false} />
          <Tooltip 
            wrapperStyle={{visibility: 'visible'}} 
            position={{ x: 0, y: -84 }} 
            content={<ChartNums 
                        value={end[value]} 
                        prev={current === "1d" ? this.props.prev : data[0].open}
                     />} 
          />
          <ReferenceLine className={current === "1d" ? "" : "hidden"} y={this.props.prev}/>
          <YAxis 
            hide 
            domain={[min, 'dataMax']} />
          <XAxis 
            hide
            dataKey="minute"/>
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