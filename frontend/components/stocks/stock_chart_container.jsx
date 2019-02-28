import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getStock} from '../../actions/stock_actions';
import StockChart from './stock_chart';

const msp = (state, ownProps) => ({
  charts: this.state.stocks[ownProps.match.params.symbol].charts
});

const mdp = dispatch => ({
  getStock: symbol => dispatch(getStock)
});

export default withRouter(connect(msp, mdp))(StockChart)