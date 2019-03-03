import React from 'react';
import StockChart from './stock_chart';
import StockAbout from './stock_about';
import Navbar from '../navbar/navbar';

class StockShow extends React.Component {
  
  componentDidMount(){
    this.getData(this.props.match.params.symbol);
  }

  getData(symbol){
    this.props.fetchStock(symbol);
    this.props.getInfo(symbol);
    this.props.get1dChart(symbol);
    this.props.getCharts(symbol);
    this.props.getNews(symbol);
  }

  componentDidUpdate(prevProps){
    if(prevProps.match.params.symbol !== this.props.match.params.symbol){
      this.getData(this.props.match.params.symbol);
    }
  }


  render(){
    if(!this.props.info || !this.props.info.previousClose || !this.props.info.description || !this.props.charts || !this.props.news){
      return null;
    }
    return (
      <>
        <Navbar/>
        <main id="main-stock">
          <StockChart charts={this.props.charts} name={this.props.info.name} prev={this.props.info.previousClose}/>
          <StockAbout info={this.props.info} />
        </main>
      </>
    )
  }
};

export default StockShow;