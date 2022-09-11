import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'

const Piechart = ({ data, handleTimeConsignas, rol }) => {
  const { consigna, novedad } = data

  return (
    <div className='flex-col bg-white shadow-sm border-[1px] w-full'>
      <h3 className='px-5 mt-5 font-bold'>
        CONSIGNAS Y NOVEDADES PENDIENTES {rol}
      </h3>
      <div className='flex flex-col mt-10'>
        <div className='self-end'>
          {/* <Period /> */}

          <select
            className='w-full text-sm text-gray-500 bg-transparent border-0 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 w-36'
            defaultValue={1}
            onChange={e => handleTimeConsignas(e.target.value)}
          >
            <option value={1}>Últimas 24h</option>
            <option value={2}>Últimos 7 días</option>
          </select>
        </div>

        <div className='w-1/2 mt-10 self-center h-1/2'>
          {Object.keys(data).length > 0 ? (
            consigna + novedad > 0 ? (
              <div className='my-5'>
                <PieChart
                  animation
                  animationDuration={500}
                  animationEasing='ease-out'
                  center={[50, 50]}
                  data={[
                    { title: 'CONSIGNA', value: consigna, color: '#21B739' },
                    { title: 'NOVEDAD', value: novedad, color: '#1A84E7' },
                  ]}
                  radius={50}
                />
              </div>
            ) : (
              <>
                <label className='flex justify-center mb-4'>
                  "No hay datos para mostrar"
                </label>
                <PieChart
                  animation
                  animationDuration={500}
                  animationEasing='ease-out'
                  center={[50, 50]}
                  data={[
                    { title: 'CONSIGNA', value: 50, color: 'rgb(229 231 235)' },
                    { title: 'NOVEDAD', value: 50, color: 'rgb(229 231 255)' },
                  ]}
                  radius={50}
                />
              </>
            )
          ) : null}
        </div>

        <div className='flex my-10 justify-center'>
          <div className='flex flex-col mr-8'>
            <div className='flex'>
              <div className='h-3 w-3 bg-[#21B739] rounded-full mt-2 mr-2'></div>
              <p className='text-[#A3AED0] text-xl font-semibold'>CONSIGNAS</p>
            </div>
            <div className='text-2xl font-bold self-center'>
              {Object.keys(data).length > 0 ? consigna : 0}
            </div>
          </div>

          <div className='flex flex-col ml-8'>
            <div className='flex'>
              <div className='h-3 w-3 bg-[#1A84E7] rounded-full mt-2 mr-2'></div>
              <p className='text-[#A3AED0] text-xl font-semibold'>NOVEDADES</p>
            </div>
            <div className='text-2xl font-bold self-center'>
              {Object.keys(data).length > 0 ? novedad : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Piechart
