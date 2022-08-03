import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { useDispatch, useSelector } from 'react-redux'
import {
  obtenerConsignasGrafica,
  obtenerConsignasTRSAction,
} from '../../store/actions'

import Period from './Period'

const Piechart = ({ consignasPendientes }) => {
  const { consignasCctv, consignasTrs } = consignasPendientes
  const [graficaTipo, setgraficaTipo] = useState(1)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(obtenerConsignasGrafica(graficaTipo))
  }, [graficaTipo])

  const consignaGrafica = useSelector(
    state => state.consignas.consignasGrafica.datos
  )
  const { trs, cctv } = consignaGrafica
  console.log(consignaGrafica)
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
            onChange={e => setgraficaTipo(e.target.value)}
          >
            <option value={1}>Últimas 24h</option>
            <option value={2}>Últimos 7 días</option>
          </select>
        </div>

        <div className='mt-24 w-80 self-center'>
          {trs + cctv > 0 ? (
            <PieChart
              animation
              animationDuration={500}
              animationEasing='ease-out'
              center={[50, 50]}
              data={[
                { title: 'CCTV', value: cctv, color: '#1A84E7' },
                { title: 'TRS', value: trs, color: '#21B739' },
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
          )}
        </div>

        <div className='flex mt-10 justify-center'>
          <div className='flex flex-col mr-8'>
            <div className='flex'>
              <div className='h-3 w-3 bg-[#1A84E7] rounded-full mt-2 mr-2'></div>
              <p className='text-[#A3AED0]'>TRS</p>
            </div>

            <div className='text-2xl font-bold self-end'>{trs}</div>
          </div>

          <div className='flex flex-col ml-8'>
            <div className='flex'>
              <div className='h-3 w-3 bg-[#21B739] rounded-full mt-2 mr-2'></div>
              <p className='text-[#A3AED0]'>CCTV</p>
            </div>

            <div className='text-2xl font-bold self-end'>{cctv}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Piechart
