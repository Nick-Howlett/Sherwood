import {connect} from 'react-redux';
import StockShow from "./stock_show";
import {fetchStock} from '../../actions/stock_actions';
import {withRouter} from "react-router-dom";



const mdp = dispatch => ({
  fetchStock: id => dispatch(fetchStock(id))
});

export default withRouter(connect(null, mdp)(StockShow));