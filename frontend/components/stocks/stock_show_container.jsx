import {connect} from 'react-redux';
import StockShow from "./stock_show";
import {getStock, getNews, getSearch} from '../../actions/stock_actions';
import {withRouter} from "react-router-dom";
import {countStocks, transactionArray} from '../../actions/selectors';


const msp = (state, ownProps) => ({
  charts: state.entities.stocks[ownProps.match.params.symbol] ? state.entities.stocks[ownProps.match.params.symbol].charts : null,
  info: state.entities.stocks[ownProps.match.params.symbol],
  news: state.entities.news,
  currentUser: state.entities.users[state.session.id],
  shares: countStocks(transactionArray(state, ownProps.match.params.symbol.toUpperCase()))[ownProps.match.params.symbol],
  stocks: state.entities.search
});


const mdp = dispatch => ({
  getStock: symbol => dispatch(getStock(symbol)),
  getNews: name => dispatch(getNews(name)),
  getSearch: () => dispatch(getSearch())
});

export default withRouter(connect(msp, mdp)(StockShow));