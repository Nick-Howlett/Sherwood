import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Search from './search';
import {searchStocks} from '../../actions/selectors';

const msp = state => ({
  stocks: state.entities.search,
  searchStocks: query => searchStocks(state, query)
});



export default withRouter(connect(msp, null)(Search));