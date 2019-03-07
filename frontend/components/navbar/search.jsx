import React from 'react';
import ResultItem from "./result";


class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {search: "", results: [], open: false};
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount(){
    document.addEventListener('mousedown', this.handleClick, false);
  }

  handleKeyPress(e){
    if(e.key == 'Enter'){
      this.props.history.push(`/stocks/${this.state.results[0].symbol}`);
    }
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick(e) {
    if(this.wrapper.contains(e.target)){
      this.setState({open: true});
      return;
    }

    this.handleClickOutside();
  }

  handleClickOutside(){
    this.setState({open: false});
  }

  handleChange(e){
    this.setState({search: e.target.value, results: this.props.searchStocks(e.target.value)});
  }

  render(){
    return(
      <div ref={wrapper => this.wrapper = wrapper} id="search-container-wrapper">
        <div className={`search-container ${this.state.open && this.state.search !== "" ? "long" : ""}`}>
          <div id="searchbar">
            <svg id="search-magnifier" width="18px" height="18px" viewBox="0 0 18 18">
              <g transform="translate(-11.000000, -11.000000)">
                <path d="M23.0733726,24.4447312 C21.8075531,25.4199921 20.2215106,26 18.5,26 C14.3578644,26 11,22.6421356 11,18.5 C11,14.3578644 14.3578644,11 18.5,11 C22.6421356,11 26,14.3578644 26,18.5 C26,20.2215106 25.4199921,21.8075531 24.4447312,23.0733726 L28.1425948,26.7712362 L26.7712362,28.1425948 L23.0733726,24.4447312 Z M18.5,24 C21.5375661,24 24,21.5375661 24,18.5 C24,15.4624339 21.5375661,13 18.5,13 C15.4624339,13 13,15.4624339 13,18.5 C13,21.5375661 15.4624339,24 18.5,24 Z" id="Combined-Shape">
                </path>
              </g>s
            </svg>
            <input type="text" 
                  placeholder="Search" value={this.state.search} 
                  autcomplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  autoapitalize="none"
                  onChange={e => this.handleChange(e)}
                  onKeyPress={this.handleKeyPress} />
          </div>
            <div className={this.state.open && this.state.search !== "" ? " " : "hide"} id="search-results">
              {this.state.results.length === 0 ?  <span>We were unable to find any results for your search.</span> : ""}
              <h3 className={this.state.results.length > 0 ? "" : "hide"}>Stocks</h3>
              <div className="flex">
                <ul>
                  {this.state.results.map(result => <ResultItem key={result.symbol} stock={result} />)}
                </ul>
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Search;