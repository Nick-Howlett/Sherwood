import {connect} from 'react-redux';
import StockShow from "./stock_show";
import {getStockDisplay, getStockHistoricalCharts, getNews, getSearch, clearCharts} from '../../actions/stock_actions';
import {withRouter} from "react-router-dom";


const msp = (state, ownProps) => ({
  charts: state.entities.stocks[ownProps.match.params.symbol] ? state.entities.stocks[ownProps.match.params.symbol].charts : null,
  info: state.entities.stocks[ownProps.match.params.symbol],
  news: state.entities.news,
  currentUser: state.entities.users[state.session.id],
  stocks: state.entities.search
});


const mdp = dispatch => ({
  getStockDisplay: symbol => dispatch(getStockDisplay([symbol])),
  getStockHistoricalCharts: symbol => dispatch(getStockHistoricalCharts([symbol])),
  getNews: name => dispatch(getNews(name)),
  getSearch: () => dispatch(getSearch()),
  clearCharts: () => dispatch(clearCharts())
});

export default withRouter(connect(msp, mdp)(StockShow));