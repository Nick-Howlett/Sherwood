import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import App from './app';
import {currentUser} from '../actions/selectors';

const msp = state => ({
  currentUser : currentUser(state)
})

export default withRouter(connect(msp, null)(App));