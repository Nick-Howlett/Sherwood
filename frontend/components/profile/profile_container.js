import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions';
import {getSearch, getStockDisplay, getStockHistoricalCharts, getNews} from '../../actions/stock_actions';
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
    ownedStocks: state.entities.ownedStocks,
    shares,
    watchedStocks: watchedStocks(state),
    transactions,
    prev: state.entities.users[state.session.id].prev
  };
};



const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  getSearch: () => dispatch(getSearch()),
  getStockDisplay: (symbols, shares, watchedStocks) => dispatch(getStockDisplay(symbols, shares, watchedStocks)),
  getStockHistoricalCharts: (symbols, transactions) => dispatch(getStockHistoricalCharts(symbols, transactions)),
  getNews: () => dispatch(getNews())
});

export default connect(msp, mdp)(Profile);