import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerConsignasGrafica } from '../../store/actions'

import Period from './Period'

const Piechart = ({ data, handleTimeConsignas }) => {
  const { trs, cctv } = data.datos || {}

  return (
    <div className='flex-col bg-white shadow-sm border-[1px] h-full w-full'>
      <h3 className='px-5 mt-5 font-semibold'>
        CONSIGNAS PENDIENTES TRS Y CCTV
      </h3>
      <div className='flex flex-col h-full mt-16'>
        <div className='self-end'>
          {/* <Period /> */}

          <select
            className='mr-32 mt-16 w-full text-sm text-gray-500 bg-transparent border-0 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 w-36'
            defaultValue={1}
            onChange={e => handleTimeConsignas(e.target.value)}
          >
            <option value={1}>Últimas 24h</option>
            <option value={2}>Últimos 7 días</option>
          </select>
        </div>

        <div className='mt-24 w-80 self-center'>
          {Object.keys(data).length > 0 ? (
            trs + cctv > 0 ? (
              <PieChart
                animation
                animationDuration={500}
                animationEasing='ease-out'
                center={[50, 50]}
                data={[
                  { title: 'TRS', value: trs, color: '#21B739' },
                  { title: 'CCTV', value: cctv, color: '#1A84E7' },
                ]}
                radius={50}
              />
            ) : (
              <>
                <label className='flex justify-center'>
                  "No hay datos para mostrar"
                </label>
                <PieChart
                  animation
                  animationDuration={500}
                  animationEasing='ease-out'
                  center={[50, 50]}
                  data={[
                    { title: 'CCTV', value: 50, color: 'rgb(229 231 235)' },
                    { title: 'TRS', value: 50, color: 'rgb(229 231 255)' },
                  ]}
                  radius={50}
                />
              </>
            )
          ) : null}
        </div>

        <div className='flex mt-10 justify-center'>
          <div className='flex flex-col mr-8'>
            <div className='flex'>
              <div className='h-3 w-3 bg-[#21B739] rounded-full mt-2 mr-2'></div>

              <p className='text-[#A3AED0]'>TRS</p>
            </div>
            <div className='text-2xl font-bold self-end'>
              {Object.keys(data).length > 0 ? trs : 0}
            </div>
          </div>

          <div className='flex flex-col ml-8'>
            <div className='flex'>
              <div className='h-3 w-3 bg-[#1A84E7] rounded-full mt-2 mr-2'></div>
              <p className='text-[#A3AED0]'>CCTV</p>
            </div>
            <div className='text-2xl font-bold self-end'>
              {Object.keys(data).length > 0 ? cctv : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Piechart
