import React from 'react';
import Error from '../session_form/session_errors';
import {formatMoney} from "../../utils/utils";


class StockTransaction extends React.Component {
  constructor(props){
    super(props);
    this.state = {buySell: "Buy", numShares: 0, transacting: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  handleSubmit(e){
    if(!this.props.user){
      this.props.history.push("/signup");
    }
    e.preventDefault();
    this.setState({transacting: true});
    this.props.makeTransaction({
      user_id: this.props.user.id,
      symbol: this.props.symbol,
      transaction_type: this.state.buySell === "Buy" ? "purchase" : "sale",
      stock_price: this.props.price,
      num_shares: this.state.numShares,
    }).always(() => {
      this.setState({numShares: 0});
      this.setState({transacting: false});
    });
  }

  handleChange(field){
    return e => {
      this.setState({[field]: e.target.value});
    }
  }

  componentWillUnmount(){
    this.props.clearErrors();
  }

  render(){
    const finalDiv = this.props.user ? 
              <div style={this.props.user ? 
                          {} :
                          {display: "none"}} 
                    id="info-div">
                      {this.state.buySell === "Buy" ? 
                      `${formatMoney(this.props.user.buyingPower)} Buying Power Available` :
                      `${this.props.shares} Shares Available`}
              </div> 
              : <></>
    const commission = this.props.user ?  <></> : <div className="form-div bordered"><span>Comissions</span><span>$0.00</span></div>
    return(
      <form id="transaction-form">
        <header className="sidebar-header">
          <button type="button" className={this.state.buySell === "Buy" ? "toggle-button selected" : "toggle-button"}
            onClick={() => {this.setState({buySell: "Buy"});
                            this.props.clearErrors()}}>
              Buy {this.props.symbol}
          </button>
          {this.props.user ? <button type="button" className={this.state.buySell === "Sell" ? "toggle-button selected" : "toggle-button"}
                  onClick={() => {this.setState({buySell: "Sell"});
                                 this.props.clearErrors()}}>Sell {this.props.symbol}</button> : <></>}
        </header>
        <label>Shares
          <input value={this.state.numShares} min="0" onChange={this.handleChange("numShares")} type="number" placeholder="0" step="1" />
        </label>
        <div className={`form-div ${this.props.user ? "bordered" : ""}`}>
            <span>Market Price</span>
            {`${formatMoney(this.props.price)}`}
        </div>
        {commission}
        <div className="form-div">
            <span>Estimated {`${this.state.buySell === "Buy" ? 'Cost' : "Credit"}`}</span>
            {`${this.state.numShares > 0 ? formatMoney(this.state.numShares * this.props.price) : 0}`}
        </div>
        <div id="error-container" className={this.props.errors.length > 0 ? "form-div grow" : "form-div"}>
                {this.props.errors.map((error, i) => <Error key={i} error={error}/>)}
        </div>
        <div id="submit-div">
          <button id="transaction-submit" disabled={this.state.transacting ? "disabled" : ""} onClick={this.handleSubmit}>{this.props.user ? `Submit ${this.state.buySell}` : `Sign Up to Buy`}</button>
        </div>
        {finalDiv}
      </form>
    )
  }

}

export default StockTransaction;