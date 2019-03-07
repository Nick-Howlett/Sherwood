import React from 'react';
import Navbar from '../navbar/navbar';
import News from '../stocks/news';
import Chart from '../chart/chart';
import Loading from '../loading';
import WatchList from '../watchlist/watchlist';

class Profile extends React.Component{

    componentDidMount(){
        if(Object.entries(this.props.stocks ).length === 0 && this.props.stocks.constructor === Object){ //Code to see if an object is empty taken from https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
            this.props.getSearch();
        }
        this.props.getNews();
        this.props.getCharts(this.props.stockShares);
        this.props.get1dChart(this.props.stockShares);
        this.props.getPrevClose(this.props.stockShares, this.props.userId);
        this.props.getWatchlistInfo(this.props.watchedStocks);
    }
    render(){
      if(!this.props.stocks.AAPL ||
         !this.props.charts["1d"] ||
         !this.props.charts["3m"] ||
         !this.props.news ||
         this.props.prev === undefined ||
         !this.props.watchedStocks[0]){
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
                    <WatchList watchedStocks={this.props.watchedStocks}/>
                  </div>
                </div>
            </main>
            </>
        )
    }
}   


export default Profile;