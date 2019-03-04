import {connect} from 'react-redux';
import StockShow from "./stock_show";
import {fetchStock, getInfo, getNews, get1dChart, getCharts} from '../../actions/stock_actions';
import {withRouter} from "react-router-dom";


const msp = (state, ownProps) => ({
  charts: state.entities.charts,
  info: state.entities.stocks[ownProps.match.params.symbol],
  news: state.entities.news
});


const mdp = dispatch => ({
  fetchStock: symbol => dispatch(fetchStock(symbol)),
  getInfo: symbol => dispatch(getInfo(symbol)),
  getNews: symbol => dispatch(getNews(symbol)),
  get1dChart: symbol => dispatch(get1dChart(symbol)),
  getCharts: symbol => dispatch(getCharts(symbol))
});

export default withRouter(connect(msp, mdp)(StockShow));