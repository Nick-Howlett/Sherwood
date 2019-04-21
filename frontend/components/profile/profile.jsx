import React from 'react';
import Navbar from '../navbar/navbar';
import News from '../stocks/news';
import Chart from '../chart/chart';
import Loading from '../loading';
import WatchList from '../watchlist/watchlist';
import Footer from '../footer';
import { createProfileCharts, createProfile1dChart } from '../../utils/chart_utils';

class Profile extends React.Component{

    constructor(props){
        super(props);
        this.state = {prev: null, ownedStocks: [], watchedStocks: [], profileCharts: {"1d": []}};
    }

    componentDidMount(){
        if(Object.entries(this.props.stocks).length === 0 && this.props.stocks.constructor === Object){ //Code to see if an object is empty taken from https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
            this.props.getSearch();
        }
        let symbols = this.props.transactions.map(transaction => transaction.symbol);
        const watchSymbols = Object.keys(this.props.watchedStocks).map(key => this.props.watchedStocks[key].symbol);
        symbols = symbols.concat(watchSymbols, ["AAPL"]);
        symbols = [...new Set(symbols)];
        const promises = symbols.map(symbol => this.props.getStock(symbol));
        Promise.all(promises).then(() => {
            this.setState({ownedStocks: Object.keys(this.props.shares).map(symbol => Object.assign(this.props.stocks[symbol], {shares: this.props.shares[symbol]}))});
            this.setState({watchedStocks: watchSymbols.map(symbol => Object.assign(this.props.stocks[symbol], {shares: null}))});
            this.setState({prev: this.state.ownedStocks.length > 0 ? this.state.ownedStocks.reduce((acc, stock) => acc += stock.close_yesterday * this.props.shares[stock.symbol]) : 0});
            const fiveYearCharts = {};
            symbols.forEach(symbol => fiveYearCharts[symbol] = this.props.stocks[symbol].charts["5y"]);
            const oneDayCharts = {};
            symbols.forEach(symbol => oneDayCharts[symbol] = this.props.stocks[symbol].charts["1d"]);
            const profileCharts = createProfileCharts(this.props.transactions, fiveYearCharts);
            profileCharts["1d"] = createProfile1dChart(this.props.shares, oneDayCharts);
            this.setState({profileCharts: profileCharts});
        });
    
        this.props.getNews();
    }
    render(){
      if(!this.props.news ||
         !this.state.ownedStocks ||
         this.state.prev === null){
          return <Loading />
      }
      return(  
            <>
                <div className="fixed navbar">
                    <Navbar/>
                </div>
                <main id="main-page">
                <div>
                    <Chart charts={this.state.profileCharts} name={null} prev={this.state.prev}/>
                    <News news={this.props.news} />
                </div>
                <div id="side-column">
                  <div className="fixed">
                    <WatchList ownedStocks={this.state.ownedStocks} watchedStocks={this.state.watchedStocks}/>
                  </div>
                </div>
            </main>
            <Footer />
            </>
        )
    }
}   



export default Profile;