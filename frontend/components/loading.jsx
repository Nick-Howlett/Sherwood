import React from 'react';
import { css } from '@emotion/core';
import { BarLoader } from 'react-spinners';

const override = css`
      display: block;
      margin: 0 auto; 
`;

export default () => {
  return(
  <div id="loading-center">
     <BarLoader
      css={override}
      sizeUnit={"px"}
      size={800}
      width={400}
      height={10}
      color={'#21ce99'} />
  </div>
  )
};