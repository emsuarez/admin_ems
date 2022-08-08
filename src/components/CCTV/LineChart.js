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

export default function LineChart({ data }) {
  const labels = Object.keys(data.datos)
  const dataFormat = {
    labels,
    datasets: [
      {
        label: 'CONSIGNAS',
        data: Object.values(data.datos),
        borderColor: 'rgb(38, 52, 110, 1)',
        backgroundColor: 'rgba(38, 52, 110, 1)',
        fill: false,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
      },
    ],
  }
  return <Line options={options} data={dataFormat} />
}
