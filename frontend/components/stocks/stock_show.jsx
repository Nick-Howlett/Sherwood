import React from 'react';
import Chart from '../chart/chart';
import StockAbout from './stock_about';
import Navbar from '../navbar/navbar';
import News from "./news";
import StockTransactionContainer from './stock_transaction_container';
import Loading from '../loading';
import WatchButtonContainer from "./watch_button_container";
import Footer from '../footer';

class StockShow extends React.Component {
  
  componentDidMount(){
    this.getData(this.props.match.params.symbol);
  }

  getData(symbol){
    this.props.getSearch().then(() => {
      this.props.getStockDisplay(symbol).then(this.props.getStockHistoricalCharts(symbol));
      this.props.getNews(this.props.stocks[symbol.toUpperCase()].name);
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
            <Chart charts={this.props.charts} name={this.props.info.name} prev={this.props.info.close_yesterday}/>
            <StockAbout info={this.props.info} />
            <News news={this.props.news} />
          </div>
          <div id="side-column">
            <div className="fixed">
              <StockTransactionContainer symbol={this.props.info.symbol} price={this.props.info.price} shares={this.props.shares}/>
              {this.props.currentUser ? <WatchButtonContainer/> : ""}
            </div>
          </div>
        </main>
        <Footer/>
      </>
    )
  }
};

export default StockShow;