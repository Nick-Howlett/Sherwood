import {connect} from "react-redux";
import {login, receiveErrors} from "../../actions/session_actions";
import SessionForm from "./session_form";
import {withRouter} from 'react-router-dom';

const msp = state => ({
  errors: state.errors.session,
  formType: "Sign In"
});

const mdp = (dispatch, ownProps) => ({
  action: user => {
    return dispatch(login(user))
      .then(() => ownProps.history.goBack());
  },
  clearErrors: () => dispatch(receiveErrors([]))
});

export default withRouter(connect(msp, mdp)(SessionForm));