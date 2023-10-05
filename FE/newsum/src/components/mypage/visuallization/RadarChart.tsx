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
  GraphBox,
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

interface RadarChartProps {
  responseData: never[];
  isActive: boolean;
}

function RadarChart({ responseData, isActive }: RadarChartProps) {

  const sortedData = responseData.slice().sort((a, b) => b.cnt - a.cnt);

  const tableList = sortedData.map((item: {name: string}) => item.name).slice(0, 3);
  const idList = sortedData.map((item: {id: number}) => item.id).slice(0, 5)

  const newData = responseData.filter((item: {id: number}) => idList.includes(item.id))
  const keysList = newData.map((item: {name: string}) => item.name);
  const valuesList = newData.map((item: {cnt: number}) => item.cnt); 


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
    <GraphPage $isActive={ isActive }>
      <GraphBox>
        <p>나랑 같은 뉴스를 읽은 사람들은</p>
        <p>어떤 직업에 관심이 있을까?</p>
        <Radar options={options}  data={GraphData} />
      </GraphBox>

      <TableBox>
        <Table title='Top 3'  data={ tableList } />
      </TableBox>
    </GraphPage>
  )
};

export default RadarChart;

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: false,
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
