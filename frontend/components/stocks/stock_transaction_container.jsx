import {connect} from 'react-redux';
import StockTransaction from './stock_transaction';
import {makeTransaction, receiveErrors} from "../../actions/stock_actions";
import {currentUser, countStocks, transactionArray} from "../../actions/selectors";
import {withRouter} from "react-router-dom";

export const msp = (state, ownProps) => ({
  user: currentUser(state),
  shares: countStocks(transactionArray(state, ownProps.match.params.symbol.toUpperCase()))[ownProps.match.params.symbol],
  transactions: state.transactions,
  errors: state.errors.transaction
});


export const mdp = dispatch => ({
  makeTransaction: transaction => dispatch(makeTransaction(transaction)),
  clearErrors: () => dispatch(receiveErrors([]))
});


export default withRouter(connect(msp, mdp)(StockTransaction));