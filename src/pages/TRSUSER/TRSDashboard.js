import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Header,
  ICONS,
  LineChart,
  RedirectWithoutLogin,
  TRSAuthorized,
} from '../../components'
import ConsignasTable from '../../components/CCTV/ConsignasTable'
import {
  obtenerConsignasGrafica,
  obtenerConsignasTRSAction,
} from '../../store/actions'

const TRSDashboard = () => {
  const dispatch = useDispatch()

  const [idConsigna] = useState(3)

  const cargarConsignas = () => {
    dispatch(obtenerConsignasTRSAction())
    dispatch(obtenerConsignasGrafica(idConsigna))
  }

  useEffect(() => {
    cargarConsignas()
  }, [dispatch])

  const consignas = useSelector(state => state.consignas)
  return (
    <div className='h-full w-full'>
      <RedirectWithoutLogin />

      {TRSAuthorized() == -1 ? (
        <div className='z-50 h-screen bg-white flex flex-col justify-center'>
          <h1 className='font-bold text-3xl text-center'>
            No tiene permisos para acceder a esta página
          </h1>
        </div>
      ) : (
        <>
          <Header items='cctv' />
          <div className='flex flex-col mx-8'>
            <div className='mt-4 flex flex-row'>
              <ICONS.HomeIconS className='h-6 ml-10 text-gray-600' />
              <p className=' ml-1 font-semibold'>TRS</p>
            </div>

            <div className='flex mt-4 justify-center mb-8'>
              <div className='flex flex-col basis-2/4 mx-8'>
                <div className='bg-white w-full mb-12 border-2 border-gray-200 p-20'>
                  <LineChart data={consignas.consignasGrafica} />
                </div>

                <div className='bg-white p-6 shadow-md mb-12 w-full border-2 border-gray-200'>
                  <h2 className='font-semibold text-lg'>
                    GUARDIA DE PROTECCIÓN GUARDIA
                  </h2>
                  <ol>
                    <li>1 - Pedro Sanchez</li>
                    <li>2 - Luis Alberto</li>
                    <li>3 - Santiago Gutierrez</li>
                    <li>4 - Alfredo Alma</li>
                  </ol>
                </div>

                <div className='bg-white p-6 shadow-md w-full border-2 border-gray-200'>
                  <h2 className='font-semibold text-lg'>GRUPO DE TRABAJO</h2>
                  <ol>
                    <li>1 - Alberto López</li>
                    <li>2 - Roberto Sol</li>
                    <li>3 - Mauricio Rosa</li>
                    <li>4 - Alfredo Alma</li>
                  </ol>
                </div>
              </div>
              <div className='basis-2/4 flex items-stretch'>
                <ConsignasTable data={consignas.consignasTrs} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TRSDashboard
