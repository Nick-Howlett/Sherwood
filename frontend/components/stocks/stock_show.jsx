import React from 'react';
import Chart from '../chart/chart';
import StockAbout from './stock_about';
import Navbar from '../navbar/navbar';
import News from "./news";
import StockTransactionContainer from './stock_transaction_container';
import Loading from '../loading';

class StockShow extends React.Component {
  
  componentDidMount(){
    this.getData(this.props.match.params.symbol);
  }

  getData(symbol){
    this.props.getSearch().then(() => {
      this.props.fetchStock(symbol);
      this.props.getInfo(symbol);
      this.props.get1dChart(symbol);
      this.props.getCharts(symbol);
      this.props.getNews(this.props.stocks[symbol.toUpperCase()].name);
      this.props.getPrice(symbol);
    });
  }

  componentDidUpdate(prevProps){
    if(prevProps.match.params.symbol !== this.props.match.params.symbol){
      this.getData(this.props.match.params.symbol);
    }
  }


  render(){
    if(!this.props.info ||
       !this.props.info.price ||
       !this.props.info.previousClose ||
       !this.props.info.description || 
       !this.props.charts["1d"] ||
       !this.props.charts["3m"] ||
       !this.props.news){
      return <Loading/>
    } 
    return (
      <>
        <div className="fixed navbar">
          <Navbar/>
        </div>
        <main id="main-page">
          <div>
            <Chart charts={this.props.charts} name={this.props.info.name} prev={this.props.info.previousClose}/>
            <StockAbout info={this.props.info} />
            <News news={this.props.news} />
          </div>
          <div id="side-column">
            <div className="fixed">
              <StockTransactionContainer symbol={this.props.info.symbol} price={this.props.info.price} shares={this.props.shares}/>
            </div>
          </div>
        </main>
      </>
    )
  }
};

export default StockShow;