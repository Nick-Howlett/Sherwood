import React from 'react';
import Navbar from '../navbar/navbar';
import News from '../stocks/news';
import ChartContainer from '../chart/chart_container';
import Loading from '../loading';
import WatchListContainer from '../watchlist/watchlist_container';
import Footer from '../footer';

class Profile extends React.Component{

    constructor(props){
        super(props);
        this.state = {prev: null, ownedStocks: [], watchedStocks: [], profileCharts: {"1d": []}};
    }

    componentDidMount(){
        if(Object.entries(this.props.stocks).length === 0 && this.props.stocks.constructor === Object){ //Code to see if an object is empty taken from https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
            this.props.getSearch();
        }
        this.props.getNews();
        let symbols = this.props.transactions.map(transaction => transaction.symbol);
        const watchSymbols = Object.keys(this.props.watchedStocks).map(key => this.props.watchedStocks[key].symbol);
        symbols = symbols.concat(watchSymbols, ["AAPL"]);
        symbols = [...new Set(symbols.concat(["AAPL"]))];
        this.props.getStockDisplay(symbols, this.props.shares, new Set(watchSymbols))
        .then(this.props.getStockHistoricalCharts(symbols, this.props.transactions));
    }
    render(){
      if(!this.props.news.articles) return <Loading id={"loading-center"}/>
      return(  
            <>
                <div className="fixed navbar">
                    <Navbar/>
                </div>
                <main id="main-page">
                <div>
                    <ChartContainer name={null}/>
                    <News news={this.props.news} />
                </div>
                <div id="side-column">
                  <div className="fixed">
                    <WatchListContainer/>
                  </div>
                </div>
            </main>
            <Footer />
            </>
        )
    }
}   



export default Profile;