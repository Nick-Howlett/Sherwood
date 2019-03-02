import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getStock, getChart, get1dChart, getPrev} from '../../actions/stock_actions';
import StockChart from './stock_chart';

const msp = state => ({
  charts: state.entities.current_stock.charts,
info: state.entities.current_stock.info,
  news: state.entities.current_stock.news
});

const mdp = dispatch => ({
  getStock: symbol => dispatch(getStock(symbol)),
  getChart: (symbol, range) => dispatch(getChart(symbol, range)),
  get1dChart: symbol => dispatch(get1dChart(symbol)),
  getPrev: symbol => dispatch(getPrev(symbol))
});

export default withRouter(connect(msp, mdp)(StockChart));