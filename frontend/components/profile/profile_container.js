import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions';
import {getSearch} from '../../actions/stock_actions';
import Profile from './profile';

const msp = state => ({
  stocks: state.entities.search
})



const mdp = dispatch => ({
  logout: () => dispatch(logout()),
  getSearch: () => dispatch(getSearch())
})

export default connect(msp, mdp)(Profile)