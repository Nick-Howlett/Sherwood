import React from 'react';
import Navbar from '../navbar/navbar';
import News from '../stocks/news';
import Chart from '../chart/chart';
import Loading from '../loading';
import WatchList from '../watchlist/watchlist';
import Footer from '../footer';
import {getWatchlistInfo} from '../../utils/stock_api_utils';

class Profile extends React.Component{

    componentDidMount(){
        if(Object.entries(this.props.stocks ).length === 0 && this.props.stocks.constructor === Object){ //Code to see if an object is empty taken from https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
            this.props.getSearch();
        }
        this.symbols = Object.keys(this.props.shares);
        this.ownedStocks = [];
        if(this.symbols.length !== 0){
            getWatchlistInfo(this.symbols).then(info => {
                this.symbols.forEach(symbol => {
                    const stock_info = {};
                    stock_info.symbol = symbol;
                    stock_info.shares = this.props.shares[symbol];
                    stock_info.chart = info[symbol].chart;
                    stock_info.price = info[symbol].quote.latestPrice;
                    stock_info.prev = info[symbol].quote.previousClose;
                    this.ownedStocks.push(stock_info);
                });
            });
        }
        this.props.getNews();
        this.props.getCharts(this.props.transactions);
        this.props.get1dChart(this.props.shares);
        this.props.getPrevClose(this.props.shares, this.props.userId);
        this.props.getWatchlistInfo(this.props.watchedStocks);
    }
    render(){
      if(!this.props.stocks.AAPL ||
         !this.props.charts["1d"] ||
         !this.props.charts["3m"] ||
         !this.props.news ||
         this.props.prev === undefined){
          return <Loading />
      }
      return(  
            <>
                <div className="fixed navbar">
                    <Navbar/>
                </div>
                <main id="main-page">
                <div>
                    <Chart charts={this.props.charts} name={null} prev={this.props.prev}/>
                    <News news={this.props.news} />
                </div>
                <div id="side-column">
                  <div className="fixed">
                    <WatchList ownedStocks={this.ownedStocks ? this.ownedStocks : []} watchedStocks={this.props.watchedStocks ? this.props.watchedStocks : []}/>
                  </div>
                </div>
            </main>
            <Footer />
            </>
        )
    }
}   


export default Profile;