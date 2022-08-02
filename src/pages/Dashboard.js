import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AdminAuthorized,
  CCTVTable,
  Header,
  ICONS,
  Piechart,
  RedirectWithoutLogin,
  TRSTable,
} from '../components'
import ConsignasTable from '../components/CCTV/ConsignasTable'
import {
  obtenerConsignasCCTVAction,
  obtenerConsignasTRSAction,
} from '../store/actions/ConsignasAction'

const Dashboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const cargarConsignas = async () => {
      await dispatch(obtenerConsignasCCTVAction())
      await dispatch(obtenerConsignasTRSAction())
    }

    cargarConsignas()
  }, [])

  const consignas = useSelector(state => state.consignas)

  return (
    <div>
      <RedirectWithoutLogin />
      {AdminAuthorized() == -1 ? (
        <div className='bg-white flex flex-col justify-center'>
          <h1 className='font-bold text-3xl text-center'>
            No tiene permisos para acceder a esta página
          </h1>
        </div>
      ) : (
        <>
          <Header items='all' />
          <div className='flex flex-col'>
            <div className='mt-4'>
              <ICONS.HomeIconS className='h-6 ml-10 text-gray-600' />
            </div>

            <div className='flex mt-4 justify-center mb-8'>
              <div className='mx-8 w-3/6'>
                <Piechart consignasPendientes={consignas} />
              </div>
              <div className='mr-8 w-3/6'>
                <div className='w-full mx-auto border-2 border-gray-200 h-96 mb-8'>
                  {/* <TRSTable height={'100%'} /> */}
                  <ConsignasTable data={consignas.consignasTrs} />
                </div>
                <div className='w-full mx-auto border-2 border-gray-200 h-96'>
                  {/* <CCTVTable height={'100%'} /> */}
                  <ConsignasTable data={consignas.consignasCctv} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
