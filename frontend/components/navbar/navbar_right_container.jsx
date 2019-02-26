import {connect} from 'react-redux';
import NavbarRight from './navbar_right';
import {currentUser} from "../../actions/selectors";
import {logout} from "../../actions/session_actions";

const msp = state => ({
  currentUser: currentUser(state)
})

const mdp = dispatch => ({
  logout: () => dispatch(logout())
})

export default connect(msp, mdp)(NavbarRight);