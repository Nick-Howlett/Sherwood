import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions';
import {getSearch, getProfileNews, getProfileCharts, getProfile1dChart, getProfilePrevClose, getWatchlistInfo} from '../../actions/stock_actions';
import {stockShares, watchedStocks, transactionArray} from "../../actions/selectors";
import Profile from './profile';

const msp = state => ({
  userId: state.session.id,
  stocks: state.entities.search,
  charts: state.entities.charts,
  news: state.entities.news,
  stockShares: stockShares(state),
  prev: state.entities.users[state.session.id].prevCloses,
  watchedStocks: watchedStocks(state),
  transactions: transactionArray(state)
});



const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  getSearch: () => dispatch(getSearch()),
  getNews: () => dispatch(getProfileNews()),
  getCharts: transactions => dispatch(getProfileCharts(transactions)),
  get1dChart: stocks => dispatch(getProfile1dChart(stocks)),
  getPrevClose: (stocks, id) => dispatch(getProfilePrevClose(stocks, id)),
  getWatchlistInfo: watchedStocks => dispatch(getWatchlistInfo(watchedStocks))
});

export default connect(msp, mdp)(Profile);