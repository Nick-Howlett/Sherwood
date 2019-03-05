import React from 'react';

class StockNews extends React.Component {

  constructor(props){
    super(props);
    this.state = {showMore: false};
  }

  render(){
    const news = this.props.news; 
    const now = new Date();
    return(
      <div id="news-container">
        <header>
          <h2>News</h2>
          <button onClick={() => this.state.showMore ? this.setState({showMore: false}) : this.setState({showMore: true})}>{this.state.showMore ? "Show Less" : "Show More"}</button>
        </header>
        <div className={this.state.showMore ? "news-items long" : "news-items"}>
          {news.articles.map((article, i) => {
            const date = new Date(article.publishedAt);
            return( <a key={i} href={article.url}className="news-item">
                <img src={article.urlToImage}/>
                <div className="news-right">
                  <span className="source">{article.source.name}<span className="hours">{`${((now - date) / 600000).toFixed(0)}h`}</span></span>
                  <div className="headline-summary">
                    <h3>{article.title}</h3>
                    <div className="summary">{article.description}</div>
                  </div>
                  <span className="views">
                    <svg>
                      <path fillRule="evenodd" d="M7,10.8888889 C3.13400675,10.8888889 0,7.04766168 0,5.44444444 C9.81687425e-17,3.84122721 3.13400675,0 7,0 C10.8659932,0 14,3.84312609 14,5.44444444 C14,7.0457628 10.8659932,10.8888889 7,10.8888889 Z M7,7.77777778 C8.28866442,7.77777778 9.33333333,6.73310886 9.33333333,5.44444444 C9.33333333,4.15578003 8.28866442,3.11111111 7,3.11111111 C5.71133558,3.11111111 4.66666667,4.15578003 4.66666667,5.44444444 C4.66666667,6.73310886 5.71133558,7.77777778 7,7.77777778 Z">
                      </path>
                    </svg>
                    {Math.floor(Math.random() * 1001)}
                  </span>
                </div>
            </a>)
          })}
        </div>
      </div>
    )
  }
}

export default StockNews