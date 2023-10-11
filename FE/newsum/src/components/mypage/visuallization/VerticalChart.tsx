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
  GraphBox,
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

interface VerticalChartProps {
  responseData: never[];
  isActive: boolean;
}

interface ResponseDataType {
  categoryId: number;
  name: string;
  cnt: number;
}

function VerticalChart({ responseData, isActive }: VerticalChartProps) {
  const readData: ResponseDataType[] = responseData.read;
  const scrapData: ResponseDataType[] = responseData.scrap;
  console.log(responseData)

  // 서버에서 응답받은 데이터를 사용하여 label 리스트 생성
  const labels = readData.map((item: {name: string}) => item.name);
  const readCntList = readData.map((item: {cnt: number}) => item.cnt);
  const scrapCntList = scrapData.map((item: {cnt: number}) => item.cnt);

  const totalCntList = readCntList.map((item, index) => item + scrapCntList[index])
  const newData = labels.map((item, index) => ({name: item, cnt: totalCntList[index]}))
  const sortedData = newData.slice().sort((a, b) => b.cnt - a.cnt);
  const tableData = sortedData.map((item: {name: string}) => item.name).slice(0, 3)

  // 서버에서 응답받은 데이터를 사용하여 리스트 생성 (리스트의 인덱스는 각 분야에 해당, 요소는 갯수)
  const data = {
    labels,
    datasets: [
      {
        label: '뉴스',
        data: readCntList,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '스크랩',
        data: scrapCntList,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


  return (
    <GraphPage $isActive={ isActive }>
      <GraphBox>
        <p>읽은 뉴스 통계</p>
        <Bar options={options} data={data} />
      </GraphBox>
      <TableBox>
        <Table title='Top 3'  data={ tableData } />
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
      display: false,
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
