import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {watchStock, removeWatch} from "../../actions/stock_actions";
import WatchButton from "./watch_button";
import {getWatchId} from "../../actions/selectors";

const msp = (state, ownProps) => ({
  currentUser: state.session.id,
  watchId: getWatchId(state, ownProps.match.params.symbol)
});

const mdp = dispatch => ({
  watchStock: (id, symbol) => dispatch(watchStock(id, symbol)),
  removeWatch: id => dispatch(removeWatch(id))
});


export default withRouter(connect(msp, mdp)(WatchButton));