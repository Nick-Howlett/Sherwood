import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions';
import {getSearch, getProfileNews, getProfileCharts, getProfile1dChart, getProfilePrevClose} from '../../actions/stock_actions';
import {stockShares} from "../../actions/selectors";
import Profile from './profile';

const msp = state => ({
  userId: state.session.id,
  stocks: state.entities.search,
  charts: state.entities.charts,
  news: state.entities.news,
  stockShares: stockShares(state),
  prev: state.entities.users[state.session.id].prevCloses
});



const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  getSearch: () => dispatch(getSearch()),
  getNews: () => dispatch(getProfileNews()),
  getCharts: stocks => dispatch(getProfileCharts(stocks)),
  get1dChart: stocks => dispatch(getProfile1dChart(stocks)),
  getPrevClose: (stocks, id) => dispatch(getProfilePrevClose(stocks, id))
})

export default connect(msp, mdp)(Profile);