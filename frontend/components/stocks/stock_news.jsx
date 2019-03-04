import React from 'react';

class StockNews extends React.Component {

  constructor(props){
    super(props);
    this.state = {showMore: false};
  }

  render(){
    const news = this.props.news; 
    return(
      <div id="news-container">
        <header>
          <h2>News</h2>
          <button onClick={() => this.state.showMore ? this.setState({showMore: false}) : this.setState({showMore: true})}>{this.state.showMore ? "Show Less" : "Show More"}</button>
        </header>
        <div className={this.state.showMore ? "news-container long" : "news-container"}>
          {news.map((article, i) => {
            return( <a key={i} className="news-item">
                <img src={"images/stock_news.jpg"}/>
                <div>
                  {article.source}
                  {article.headline}
                  {article.summary}
                </div>
            </a>)
          })}
        </div>
      </div>
    )
  }
}

export default StockNews