import React from 'react';
import StockChartContainer from './stock_chart_container';
import Navbar from '../navbar/navbar';

export default () => {
  return (
    <>
      <Navbar/>
      <main id="main-stock">
        <StockChartContainer />
      </main>
    </>
  )
};

