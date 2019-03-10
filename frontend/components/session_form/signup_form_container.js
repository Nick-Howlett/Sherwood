import {connect} from "react-redux";
import {signup, receiveErrors} from "../../actions/session_actions";
import SessionForm from "./session_form";
import {withRouter} from 'react-router-dom';


const msp = state => ({
  errors: state.errors.session,
  formType: "Sign Up"
});

const mdp = (dispatch, ownProps) => ({
  action: user => {
    return dispatch(signup(user))
      .then(() => ownProps.history.goBack());
  },
  clearErrors: () => dispatch(receiveErrors([]))
});

export default withRouter(connect(msp, mdp)(SessionForm));