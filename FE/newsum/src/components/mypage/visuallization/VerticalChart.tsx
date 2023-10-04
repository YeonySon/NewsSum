import React, { useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';  // 막대 그래프

import {
  GraphPage,
  TableBox,
} from './GraphStyle';
import Table from './Table';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function VerticalChart() {

  // 서버에서 응답받은 데이터를 사용하여 label 리스트 생성
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  // 서버에서 응답받은 데이터를 사용하여 리스트 생성 (리스트의 인덱스는 각 분야에 해당, 요소는 갯수)
  const data = {
    labels,
    datasets: [
      {
        label: '뉴스',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '스크랩',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


  return (
    <GraphPage>
      <Bar options={options} data={data} />

      <TableBox>
        <Table title='Top 3'  data={ labels.slice(0, 3) } />
      </TableBox>
    </GraphPage>
  )

};

export default VerticalChart;

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      position: 'top',
      align: 'start',
      text: ' 읽은 뉴스 통계',
      font: {
        size: 20,
      },
      color: 'black',
    },
  },
  scales: {
    x: {
      ticks: {
        font: {
          size: 10, // 원하는 글자 크기로 설정
        },
      },
    },
  },

};
