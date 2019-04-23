import { connect } from 'react-redux';
import Chart from './chart';

const msp = state => ({
  charts: state.entities.charts,
  prev: state.entities.charts.prev
});

export default connect(msp, null)(Chart);