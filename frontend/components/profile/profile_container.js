import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions';
import {getSearch, getProfileNews, getProfileCharts} from '../../actions/stock_actions';
import {stockShares} from "../../actions/selectors";
import Profile from './profile';

const msp = state => ({
  stocks: state.entities.search,
  charts: state.charts,
  news: state.news,
  stock_shares: stockShares(state)
});



const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  getSearch: () => dispatch(getSearch()),
  getNews: () => dispatch(getProfileNews()),
  getCharts: stocks => dispatch(getProfileCharts(stocks))
})

export default connect(msp, mdp)(Profile);