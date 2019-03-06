import {connect} from 'react-redux';
import Search from './search';
import {searchStocks} from '../../actions/selectors';

const msp = state => ({
  stocks: state.entities.search,
  searchStocks: query => searchStocks(state, query)
});



export default connect(msp, null)(Search);