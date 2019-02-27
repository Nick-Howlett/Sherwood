import {connect} from 'react-redux';
import {logout} from '../../actions/session_actions';
import Profile from './profile';

const mdp = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(null, mdp)(Profile)