import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions';
import {getSearch, getStock, getNews, getWatchlistInfo} from '../../actions/stock_actions';
import {countStocks, watchedStocks, transactionArray} from "../../actions/selectors";
import Profile from './profile';

const msp = state => {
  const transactions = transactionArray(state);
  const shares = countStocks(transactions);
  return {
    userId: state.session.id,
    stocks: state.entities.stocks,
    charts: state.entities.charts,
    news: state.entities.news,
    shares,
    watchedStocks: watchedStocks(state),
    transactions
  };
};



const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  getSearch: () => dispatch(getSearch()),
  getStock: symbol => dispatch(getStock(symbol)),
  getNews: () => dispatch(getNews())
});

export default connect(msp, mdp)(Profile);