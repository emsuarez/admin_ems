import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'CONSIGNAS PENDIENTES CCTV',
    },
  },
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      display: true,

      title: {
        display: true,
      },
    },

    y: {
      grid: {
        display: false,
      },
      display: false,
      title: {
        display: true,
        text: 'Value',
      },
      suggestedMin: -5,
      suggestedMax: 10,
    },
  },
}

const labels = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM']

export const data = {
  labels,
  datasets: [
    {
      label: 'CONSIGNAS',
      data: [4, 2, 5, 7, 1, 10, 8],
      borderColor: 'rgb(38, 52, 110, 1)',
      backgroundColor: 'rgba(38, 52, 110, 1)',
      fill: false,
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
    },
  ],
}

export default function LineChart() {
  return <Line options={options} data={data} />
}
