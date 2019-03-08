import React from 'react';


class StockAbout extends React.Component{

    constructor(props){
      super(props);
      this.state = {showMore: false, readMore: false};
    }

    render(){
      const {info} = this.props;
      Object.keys(info).forEach(key => {
        if(info[key] === null) info[key] = "—";
        if(info[key] > 1000000000){
          info[key] = `${(info[key] / 1000000000).toFixed(2)}B`;
        }
        else if(info[key] > 1000000){
          info[key] = `${(info[key] / 1000000).toFixed(2)}M`;
        }
      }); //Data we dont have becomes —
      const gridValues = {"CEO": info.ceo, 
                         "Employees": info.employees, 
                         "Headquarters": info.headquarters, 
                         "Founded": info.founded, 
                         "Market Cap": info.marketCap, 
                         "Price-Earnings Ratio": info.peRatio,
                         "Dividend Yield": info.dividendYield,
                         "Average Volume": info.avgTotalVolume,
                         "High Today": `$${info.high}`,
                         "Low Today": `$${info.low}`,
                         "Open Price": `$${info.open}`,
                         "Volume": info.latestVolume,
                         "52 Week High": `$${info.week52High}`,
                         "52 Week Low": `$${info.week52Low}`};
      if(info.ceo === "—" && info.employees === "—" && info.founded === "—" && info.headquarters === "—"){ //Robinhood removes the top row if it has none of the four.
        delete gridValues["CEO"];
        delete gridValues["Employees"];
        delete gridValues["Headquarters"];
        delete gridValues["Founded"];
      }
      let descriptionParts;
      if(info.description !== undefined){
        descriptionParts = info.description.split(" Read More");
      } else{
        descriptionParts = ["No description available", ""];
      }
      return(
        <div id="stock-about">
          <header>
            <h2>About</h2>
            <button onClick={() => this.state.showMore ? this.setState({showMore: false}) : this.setState({showMore: true})}>{this.state.showMore ? "Show Less" : "Show More"}</button>
          </header>
          <h3>
              {descriptionParts[0]}
              <span className={this.state.readMore ? "" : "hidden"}>{descriptionParts[1]}</span>
              <button onClick={() => this.state.readMore ? this.setState({readMore: false}) : this.setState({readMore: true})}>{this.state.readMore ? "Read Less" : "Read More"}</button>
          </h3>
          <div className={this.state.showMore ? "grid long" : "grid"}>
            {Object.keys(gridValues).map(key => {
               return (
                <div key={key} className="grid-item">
                  <div className="grid-head">{key}</div>
                  <div className="grid-value">{gridValues[key]}</div>
                </div>
                )
            })}
          </div>
        </div>
      )
    }
}

export default StockAbout;