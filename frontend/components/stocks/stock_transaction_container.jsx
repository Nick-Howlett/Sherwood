import {connect} from 'react-redux';
import StockTransaction from './stock_transaction';
import {makeTransaction} from "../../actions/stock_actions";
import {currentUser} from "../../actions/selectors";

export const msp = state => ({
  user: currentUser(state)
});


export const mdp = dispatch => ({
  makeTransaction: transaction => dispatch(makeTransaction(transaction))
});


export default connect(msp, mdp)(StockTransaction);