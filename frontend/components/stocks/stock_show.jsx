import React from 'react';
import * as IEXApi from "../../utils/iex_api_util";
import StockChart from './stock_chart';

class StockShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {mouseOverPrice: 0, stock: {}, chart: []};
  }

  componentDidMount(){
    IEXApi.getChart(this.props.match.params.symbol, "1d").then(data => this.setState({chart: data}));
  }
  

  render(){
    if(!this.state.chart) return null;
    return (
        <StockChart data={this.state.chart}/>
    )
  }
}

export default StockShow;