import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions';
import {getSearch, getProfileNews, getProfileCharts, getProfile1dChart, getProfilePrevClose, getWatchlistInfo} from '../../actions/stock_actions';
import {countStocks, watchedStocks, transactionArray} from "../../actions/selectors";
import Profile from './profile';

const msp = state => ({
  userId: state.session.id,
  stocks: state.entities.search,
  charts: state.entities.charts,
  news: state.entities.news,
  shares: countStocks(transactionArray(state)),
  prev: state.entities.users[state.session.id].prevCloses,
  watchedStocks: watchedStocks(state),
  transactions: transactionArray(state)
});



const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  getSearch: () => dispatch(getSearch()),
  getNews: () => dispatch(getProfileNews()),
  getCharts: transactions => dispatch(getProfileCharts(transactions)),
  get1dChart: shares => dispatch(getProfile1dChart(shares)),
  getPrevClose: (stocks, id) => dispatch(getProfilePrevClose(stocks, id)),
  getWatchlistInfo: watchedStocks => dispatch(getWatchlistInfo(watchedStocks))
});

export default connect(msp, mdp)(Profile);