import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  AdminAuthorized,
  Header,
  ICONS,
  Piechart,
  RedirectWithoutLogin,
} from '../components'
import ConsignasTable from '../components/CCTV/ConsignasTable'
import {
  cerrarConsignacCctvAction,
  cerrarConsignacTrsAction,
  obtenerConsignasCCTVAction,
  obtenerConsignasGrafica,
  obtenerConsignasTRSAction,
  obtenerNovedadesCCTVAction,
  obtenerNovedadesTRSAction,
} from '../store/actions/ConsignasAction'

import AlertCerrarConsigna from '../components/alerts/AlertCerrarConsigna'

const Dashboard = () => {
  const dispatch = useDispatch()

  const [modalTrs, setModalTrs] = useState(false)
  const [modalCctv, setModalCctv] = useState(false)

  const [consignaSeleccionada, setConsignaSeleccionada] = useState({})

  useEffect(() => {
    const cargarConsignas = () => {
      dispatch(obtenerConsignasGrafica(1))
      dispatch(obtenerConsignasTRSAction())
      dispatch(obtenerConsignasCCTVAction())
      dispatch(obtenerNovedadesTRSAction())
      dispatch(obtenerNovedadesCCTVAction())
    }
    cargarConsignas()
  }, [dispatch])

  const consignas = useSelector(state => state.consignas)

  const {
    consignasGraficaTrs,
    consignasGraficaCctv,
    consignasCctv,
    consignasTrs,
    novedadesCctv,
    novedadesTrs,
  } = consignas

  const handleTimeGraficaCctv = consigna => {
    // setIdConsigna(consigna)
    dispatch(obtenerConsignasGrafica(consigna, 'cctv'))
  }

  const handleTimeGraficaTrs = consigna => {
    // setIdConsigna(consigna)
    dispatch(obtenerConsignasGrafica(consigna, 'trs'))
  }

  const confirmarCerrarConsignaTrs = consigna => {
    setModalTrs(true)
    setConsignaSeleccionada(consigna)
  }

  const confirmarCerrarConsignaCctv = consigna => {
    setModalCctv(true)
    setConsignaSeleccionada(consigna)
  }

  const handleCerrarConsignaTrs = () => {
    dispatch(cerrarConsignacTrsAction(consignaSeleccionada))
    setModalTrs(false)
  }

  const handleCerrarConsignaCctv = () => {
    dispatch(cerrarConsignacCctvAction(consignaSeleccionada))
    setModalCctv(false)
  }

  return (
    <div>
      <RedirectWithoutLogin />
      {AdminAuthorized() === -1 ? (
        <div className='bg-white flex flex-col justify-center'>
          <h1 className='font-bold text-3xl text-center'>
            No tiene permisos para acceder a esta página
          </h1>
        </div>
      ) : (
        <>
          <Header />
          {Object.keys(consignas).length > 0 && (
            <div className='flex flex-col'>
              <div className='mt-4'>
                <ICONS.HomeIconS className='h-6 ml-10 text-gray-600' />
              </div>
              <div className='flex mt-4 mb-8'>
                <div className='w-1/2 ml-12 mr-3'>
                  <Piechart
                    data={consignasGraficaTrs}
                    handleTimeConsignas={handleTimeGraficaTrs}
                    rol='TRS'
                  />
                </div>

                <div className='w-1/2 mr-12 ml-3'>
                  <Piechart
                    data={consignasGraficaCctv}
                    handleTimeConsignas={handleTimeGraficaCctv}
                    rol='CCTV'
                  />
                </div>
              </div>
              {consignasTrs && (
                <>
                  <div className='flex'>
                    <div className='w-1/2 ml-12 mr-3 mb-4'>
                      <ConsignasTable
                        data={consignasTrs}
                        confirmarCerrarConsigna={confirmarCerrarConsignaTrs}
                        tituloTipoTable='CONSIGNAS ESPECIALES PENDIENTES TRS'
                        functionChangePage={obtenerConsignasTRSAction}
                      />
                    </div>
                    <div className='w-1/2 mr-12 ml-3 mb-4'>
                      <ConsignasTable
                        data={consignasCctv}
                        confirmarCerrarConsigna={confirmarCerrarConsignaCctv}
                        tituloTipoTable='CONSIGNAS ESPECIALES PENDIENTES CCTV'
                        functionChangePage={obtenerConsignasCCTVAction}
                      />
                    </div>
                  </div>
                  <div className='flex mb-8'>
                    <div className='w-1/2 ml-12 mr-3'>
                      <ConsignasTable
                        data={novedadesTrs}
                        confirmarCerrarConsigna={confirmarCerrarConsignaTrs}
                        tituloTipoTable='NOVEDADES ESPECIALES PENDIENTES TRS'
                        functionChangePage={obtenerNovedadesTRSAction}
                      />
                    </div>
                    <div className='w-1/2 mr-12 ml-3'>
                      <ConsignasTable
                        data={novedadesCctv}
                        confirmarCerrarConsigna={confirmarCerrarConsignaCctv}
                        tituloTipoTable='NOVEDADES ESPECIALES PENDIENTES CCTV'
                        functionChangePage={obtenerNovedadesCCTVAction}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          <AlertCerrarConsigna
            modal={modalTrs}
            setModal={setModalTrs}
            infoConsigna={consignaSeleccionada}
            handleCerrarConsigna={handleCerrarConsignaTrs}
          />
          <AlertCerrarConsigna
            modal={modalCctv}
            setModal={setModalCctv}
            infoConsigna={consignaSeleccionada}
            handleCerrarConsigna={handleCerrarConsignaCctv}
          />
        </>
      )}
    </div>
  )
}

export default Dashboard
