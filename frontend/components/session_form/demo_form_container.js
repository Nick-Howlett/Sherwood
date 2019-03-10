import {connect} from "react-redux";
import {login, receiveErrors} from "../../actions/session_actions";
import SessionForm from "./session_form";

const msp = state => ({
  errors: state.errors.session,
  demo: {username: "xXSherriff_0f_N0ttinghamXx", password: "password"},
  formType: "Sign In"
});

const mdp = (dispatch, ownProps) => ({
  action: user => {
    return dispatch(login(user))
      .then(() => ownProps.history.goBack());
  },
  clearErrors : () => dispatch(receiveErrors([]))
});

export default connect(msp, mdp)(SessionForm);