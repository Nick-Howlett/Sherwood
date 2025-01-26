import React from "react";
import { formatMoney } from "../../utils/utils";

class StockAbout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMore: false, readMore: false };
    this.toggleState = this.toggleState.bind(this);
  }

  toggleState(field) {
    return () => {
      this.setState({ [field]: !this.state[field] });
    };
  }

  render() {
    const { info } = this.props;
    Object.keys(info).forEach((key) => {
      if (info[key] === null) info[key] = "—";
      if (info[key] > 1000000000) {
        info[key] = `${(info[key] / 1000000000).toFixed(2)}B`;
      } else if (info[key] > 1000000) {
        info[key] = `${(info[key] / 1000000).toFixed(2)}M`;
      }
    }); //Data we dont have becomes —
    const gridValues = {
      CEO: info.ceo,
      Employees: info.employees,
      Headquarters: info.headquarters,
      Founded: info.founded,
      "Market Cap": info.market_cap,
      "Dividend Yield": info.dividendYield,
      "Average Volume": info.volume_avg,
      "High Today": formatMoney(info.high),
      "Low Today": formatMoney(info.low),
      "Open Price": formatMoney(info.open),
      Volume: info.volume,
    };
    if (
      info.ceo === "—" &&
      info.employees === "—" &&
      info.founded === "—" &&
      info.headquarters === "—"
    ) {
      //Robinhood removes the top row if it has none of the four.
      delete gridValues["CEO"];
      delete gridValues["Employees"];
      delete gridValues["Headquarters"];
      delete gridValues["Founded"];
    }
    let descriptionParts;
    if (info.description !== undefined) {
      descriptionParts = info.description.split(" Read More");
    } else {
      descriptionParts = ["No description available", ""];
    }
    return (
      <div id="stock-about">
        <header>
          <h2>About</h2>
          <button onClick={this.toggleState("showMore")}>
            {this.state.showMore ? "Show Less" : "Show More"}
          </button>
        </header>
        <h3>
          {descriptionParts[0]}
          <span className={this.state.readMore ? "" : "hidden"}>
            {descriptionParts[1]}
          </span>
          <button onClick={this.toggleState("readMore")}>
            {this.state.readMore ? "Read Less" : "Read More"}
          </button>
        </h3>
        <div className={this.state.showMore ? "grid long" : "grid"}>
          {Object.keys(gridValues).map((key) => {
            return (
              <div key={key} className="grid-item">
                <div className="grid-head">{key}</div>
                <div className="grid-value">{gridValues[key]}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default StockAbout;
