//rafceのコマンドで雛形作成
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const labels = [
    '2024-01-20',
    '2024-01-23',
    '2024-01-24',
    '2024-01-25',
    '2024-01-26',
    '2024-01-27',
    '2024-01-28',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: '支出',
        data: [100, 200, 300, 400, 500, 600, 700],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '収入',
        data: [900, 400, 700, 100, 900, 200, 400],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  return <Bar options={options} data={data} />;
}

export default BarChart