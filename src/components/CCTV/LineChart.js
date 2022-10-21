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

export default function LineChart({ data }) {
  const options = {
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

  const labels = data && Object.keys(data.datos).reverse()

  const dataFormat = {
    labels,
    datasets: [
      {
        label: 'CONSIGNAS',
        data: data && Object.values(data.datos).reverse(),
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
