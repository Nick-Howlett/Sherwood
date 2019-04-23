import React from 'react';
import ChartContainer from '../chart/chart_container';
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

  componentWillUnmount(){
    this.props.clearCharts();
  }


  render(){
    if(!this.props.info ||
       !this.props.info.price ||
       !this.props.news){
      return <Loading id={"loading-center"}/>
    } 
    return (
      <>
        <div className="fixed navbar">
          <Navbar/>
        </div>
        <main id="main-page">
          <div>
            <ChartContainer/>
            <StockAbout info={this.props.info} />
            <News news={this.props.news} />
          </div>
          <div id="side-column">
            <div className="fixed">
              <StockTransactionContainer symbol={this.props.info.symbol} price={this.props.info.price}/>
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