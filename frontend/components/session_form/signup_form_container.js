import {connect} from "react-redux";
import {signup, receiveErrors} from "../../actions/session_actions";
import SessionForm from "./session_form";
import {withRouter} from 'react-router-dom';


const msp = state => ({
  errors: state.errors.session,
  formType: "Sign Up"
})

const mdp = dispatch => ({
  action: user => dispatch(signup(user)),
  clearErrors: () => dispatch(receiveErrors([]))
})

export default withRouter(connect(msp, mdp)(SessionForm));