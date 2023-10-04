import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

import { 
  GraphPage,
  TableBox, 
} from './GraphStyle';
import Table from './Table';



ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function RadarChart() {
  const dummyData = [
    {"cgName": "보안", "cnt": 10},
    {"cgName": "모바일", "cnt": 5},
    {"cgName": "게임", "cnt": 2},
    {"cgName": "컴퓨터", "cnt": 4},
    {"cgName": "AI", "cnt": 7}
  ]

  const keysList = dummyData.map(item => item.cgName);
  const valuesList = dummyData.map(item => item.cnt); 
  
  const sortedData = dummyData.slice().sort((a, b) => b.cnt - a.cnt);
  const sortedKeysList = sortedData.map(item => item.cgName).slice(0, 3);

  const GraphData = {
    labels: keysList,
    datasets: [
      {
        label: '직업군',
        data: valuesList,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };


  return (
    <GraphPage>
      <Radar options={options}  data={GraphData} />


      <TableBox>
        <Table title='Top 3'  data={ sortedKeysList } />
      </TableBox>
    </GraphPage>
  )
};

export default RadarChart;

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      position: 'top',
      align: 'start',

      text: [' 나랑 같은 뉴스를 읽은 사람들은', ' 어떤 직업에 관심이 있을까?'],
      font: {
        size: 20,
      },
      color: 'black'
    },
    legend: {
      display: false,
    }
  }
};
