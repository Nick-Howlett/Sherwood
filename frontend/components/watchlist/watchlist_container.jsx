import Watchlist from './watchlist';
import { connect } from 'react-redux';

const msp = state => ({
  watchedStocks: state.entities.watchedStocks.watchList ? state.entities.watchedStocks.watchList : [],
  ownedStocks: state.entities.ownedStocks
});

export default connect(msp, null)(Watchlist);