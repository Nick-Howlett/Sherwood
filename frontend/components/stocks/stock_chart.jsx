import React from 'react';
import {Line, LineChart, YAxis, XAxis} from 'recharts';

class StockChart extends React.component{

  constructor(props){
    super(props);
    this.state = {
      mouseoverPrice: 0,
      charts: {
        oneday: []
      }
    }
  }

  componentDidMount({

  })

  render(){
    const data = props.data.map(datum => {
      datum.minute = parseInt(datum.minute.split(":").join(""));
      return datum;
    });
    //add pre-open price
    const preOpen = []
    for(let i = 0; i < 6; i++){
      const newDatum = Object.assign({}, data[0]);
      newDatum.minute = 900 + 5 * i;
      preOpen.push(newDatum);
    }
    return (
      <LineChart width={676} height={196} data={preOpen.concat(data)}>
        <Line type="linear" dataKey="marketClose" stroke="#21ce99" dot={false}/>
        <YAxis hide domain={['dataMin', 'dataMax']}/>
        <XAxis hide type="number" dataKey="minute" domain={[900, 2000]}/>
      </LineChart>
    )
  }
}

export default StockChart;