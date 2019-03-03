import React from 'react';
import {Line, LineChart, YAxis, XAxis, Tooltip, ReferenceLine} from 'recharts';
import ChartNums from './chart_nums';

class StockChart extends React.Component{

  constructor(props){
    super(props);
    this.state = {currentChart: "1d"};
  }

  render(){
    const data = this.props.charts["1d"];
    const currentStocks = data.filter(datum => datum.marketOpen);
    const end = currentStocks[currentStocks.length - 1];
    const min = Math.min(this.props.prev, ...currentStocks.map(datum => datum.marketOpen));
    return (
      <div id="stock-chart">
        <h1>{this.props.name.split(" ")[0]}</h1>
        <LineChart width={676} height={196} data={data}>
          <Line activeDot={ {r: 6}} type="linear" strokeWidth={2} dataKey="marketOpen" stroke="#21ce99" dot={false} />
          <Tooltip wrapperStyle={{visibility: 'visible'}} position={{ x: 0, y: -84 }} content={<ChartNums value={end.marketOpen} prev={this.props.prev}/>}/>
          <YAxis hide domain={[min, 'dataMax']}/>
          <ReferenceLine y={this.props.prev} dot={true}/>
          <XAxis hide dataKey="minute"/>
        </LineChart>
      <nav id="chart-buttons">
          <button onClick={() => this.setState({currentChart: "1d" })}>1D</button>
          <button onClick={() => this.setState({currentChart: "1w" })}>1W</button>
          <button onClick={() => this.setState({currentChart: "1m" })}>1M</button>
          <button onClick={() => this.setState({currentChart: "3m" })}>3M</button>
          <button onClick={() => this.setState({currentChart: "1y" })}>1Y</button>
          <button onClick={() => this.setState({currentChart: "5y" })}>5Y</button>
        </nav>
      </div>
    )
  }
}

export default StockChart;