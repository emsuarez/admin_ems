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
  getPersonalInformeTrs,
  obtenerConsignasGrafica,
  obtenerConsignasTRSAction,
  obtenerNovedadesTRSAction,
} from '../../store/actions'

const TRSDashboard = () => {
  const dispatch = useDispatch()

  const [idConsigna] = useState(3)

  const cargarConsignas = () => {
    dispatch(obtenerConsignasTRSAction())
    dispatch(obtenerConsignasGrafica(idConsigna))
  }

  useEffect(() => {
    const obtenerPersonal = () => dispatch(getPersonalInformeTrs())
    obtenerPersonal()
    cargarConsignas()
  }, [dispatch])

  const consignas = useSelector(state => state.consignas)
  const informes = useSelector(state => state.informes)

  return (
    <div className='h-full w-full'>
      <RedirectWithoutLogin />

      {TRSAuthorized() === -1 ? (
        <div className='z-50 h-screen bg-white flex flex-col justify-center'>
          <h1 className='font-bold text-3xl text-center'>
            No tiene permisos para acceder a esta página
          </h1>
        </div>
      ) : (
        <>
          <Header items='trs' />
          <div className='flex flex-col mx-8'>
            <div className='mt-4 flex flex-row'>
              <ICONS.HomeIconS className='h-6 ml-10 text-gray-600' />
              <p className='ml-1 font-semibold'>TRS</p>
            </div>

            <div className='flex mt-4 justify-center mb-8'>
              <div className='flex flex-col w-1/2 mx-8'>
                {consignas.consignasGrafica && (
                  <div className='bg-white w-full mb-3 border-2 border-gray-200 p-20'>
                    <LineChart data={consignas.consignasGrafica} />
                  </div>
                )}

                <div className='bg-white p-6 shadow-md mb-3 w-full border-2 border-gray-200'>
                  <h2 className='font-semibold text-lg'>
                    GRUPO DE PROTECCIÓN GUARDIA
                  </h2>
                  {informes.personalInformeTrs.protectores && (
                    <ol>
                      {informes.personalInformeTrs.protectores.map(
                        (protector, index) => (
                          <li key={index} className='text-xs'>
                            <span className='text-gray-400'>{index + 1}.-</span>{' '}
                            {protector}
                          </li>
                        )
                      )}
                    </ol>
                  )}
                </div>

                <div className='bg-white p-6 shadow-md w-full border-2 border-gray-200'>
                  <h2 className='font-semibold text-lg'>GRUPO DE TRABAJO</h2>
                  {informes.personalInformeTrs.centralistas && (
                    <ol>
                      {informes.personalInformeTrs.centralistas.map(
                        (centralista, index) => (
                          <li key={index} className='text-xs'>
                            <span className='text-gray-400'>{index + 1}.-</span>{' '}
                            {centralista}
                          </li>
                        )
                      )}
                    </ol>
                  )}
                </div>
              </div>

              {consignas && (
                <div className='flex flex-col w-1/2'>
                  <div className='mb-3'>
                    <ConsignasTable
                      data={consignas?.consignasTrs}
                      tituloTipoTable='CONSIGNAS ESPECIALES PENDIENTES TRS'
                      functionChangePage={obtenerConsignasTRSAction}
                    />
                  </div>
                  <div>
                    <ConsignasTable
                      data={consignas?.novedadesTrs}
                      tituloTipoTable='NOVEDADES ESPECIALES PENDIENTES TRS'
                      functionChangePage={obtenerNovedadesTRSAction}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TRSDashboard
