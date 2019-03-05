import {connect} from 'react-redux';
import StockTransaction from './stock_transaction';
import {makeTransaction, receiveErrors} from "../../actions/stock_actions";
import {currentUser} from "../../actions/selectors";

export const msp = state => ({
  user: currentUser(state),
  errors: state.errors.transaction
});


export const mdp = dispatch => ({
  makeTransaction: transaction => dispatch(makeTransaction(transaction)),
  clearErrors: () => dispatch(receiveErrors([]))
});


export default connect(msp, mdp)(StockTransaction);