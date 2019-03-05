import {connect} from 'react-redux';
import StockShow from "./stock_show";
import {fetchStock, getInfo, getNews, get1dChart, getCharts, getPrice, getSearch} from '../../actions/stock_actions';
import {withRouter} from "react-router-dom";
import {numShares} from '../../actions/selectors';


const msp = (state, ownProps) => ({
  charts: state.entities.charts,
  info: state.entities.stocks[ownProps.match.params.symbol],
  news: state.entities.news,
  currentUser: state.entities.users[state.session.id],
  shares: numShares(state, ownProps.match.params.symbol.toUpperCase()),
  stocks: state.entities.search
});


const mdp = dispatch => ({
  fetchStock: symbol => dispatch(fetchStock(symbol)),
  getInfo: symbol => dispatch(getInfo(symbol)),
  getNews: name => dispatch(getNews(name)),
  get1dChart: symbol => dispatch(get1dChart(symbol)),
  getCharts: symbol => dispatch(getCharts(symbol)),
  getPrice: symbol => dispatch(getPrice(symbol)),
  getSearch: () => dispatch(getSearch())
});

export default withRouter(connect(msp, mdp)(StockShow));