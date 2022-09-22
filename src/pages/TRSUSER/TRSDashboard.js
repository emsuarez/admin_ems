import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Header,
  ICONS,
  LineChart,
  RedirectWithoutLogin,
  TRSAuthorized,
} from '../../components'
import AlertCerrarConsigna from '../../components/alerts/AlertCerrarConsigna'
import ConsignasTable from '../../components/CCTV/ConsignasTable'
import {
  cerrarConsignacTrsAction,
  getPersonalInformeTrs,
  obtenerConsignasGrafica,
  obtenerConsignasTRSAction,
} from '../../store/actions'

const TRSDashboard = () => {
  const dispatch = useDispatch()

  const [idConsigna] = useState(3)

  const [modalTrs, setModalTrs] = useState(false)

  const [consignaSeleccionada, setConsignaSeleccionada] = useState()

  const [protectores, setProtectores] = useState([])
  const [centralistas, setCentralistas] = useState([])

  const cargarConsignas = () => {
    dispatch(getPersonalInformeTrs())
    dispatch(obtenerConsignasTRSAction())
    dispatch(obtenerConsignasGrafica(idConsigna))
  }

  useEffect(() => {
    cargarConsignas()
    cargarPersonal()
  }, [dispatch])

  const consignas = useSelector(state => state.consignas)
  const informes = useSelector(state => state.informes)

  // const handleCerrarConsignaTrs = () => {
  //   dispatch(cerrarConsignacTrsAction(consignaSeleccionada))
  //   setModalTrs(false)
  // }

  const cargarPersonal = () => {
    if (informes.personalInformeTrs) {
      console.log(informes.personalInformeTrs, 'informes.personalInformeTrs')
      setProtectores(informes?.personalInformeTrs.lista.protectores.split(','))
      setCentralistas(
        informes?.personalInformeTrs.lista.centralistas.split(',')
      )
    }
  }

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
          <Header items='cctv' />
          <div className='flex flex-col mx-8'>
            <div className='mt-4 flex flex-row'>
              <ICONS.HomeIconS className='h-6 ml-10 text-gray-600' />
              <p className=' ml-1 font-semibold'>TRS</p>
            </div>

            <div className='flex mt-4 justify-center mb-8'>
              <div className='flex flex-col basis-2/4 mx-8'>
                {consignas.consignasGrafica && (
                  <div className='bg-white w-full mb-3 border-2 border-gray-200 p-20'>
                    <LineChart data={consignas.consignasGrafica} />
                  </div>
                )}

                <div className='bg-white p-6 shadow-md mb-3 w-full border-2 border-gray-200'>
                  <h2 className='font-semibold text-lg'>
                    GRUPO DE PROTECCIÓN GUARDIA
                  </h2>
                  {protectores && (
                    <ol>
                      {protectores.map((protector, index) => (
                        <li key={index} className='text-xs'>
                          <span className='text-gray-400'>{index + 1}.-</span>{' '}
                          {protector}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>

                <div className='bg-white p-6 shadow-md w-full border-2 border-gray-200'>
                  <h2 className='font-semibold text-lg'>GRUPO DE TRABAJO</h2>
                  {centralistas && (
                    <ol>
                      {centralistas.map((centralista, index) => (
                        <li key={index} className='text-xs'>
                          <span className='text-gray-400'>{index + 1}.-</span>{' '}
                          {centralista}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
              {/* <AlertCerrarConsigna
                modal={modalTrs}
                setModal={setModalTrs}
                infoConsigna={consignaSeleccionada}
                handleCerrarConsigna={handleCerrarConsignaTrs}
              /> */}
              <div className='flex flex-col basis-2/4'>
                <div className='flex items-stretch mb-3 h-1/2'>
                  <ConsignasTable
                    data={consignas?.consignasTrs}
                    tituloTipoTable='CONSIGNAS ESPECIALES PENDIENTES TRS'
                  />
                </div>
                <div className='basis-2/4 flex items-stretch h-1/2'>
                  <ConsignasTable
                    data={consignas?.novedadesTrs}
                    tituloTipoTable='NOVEDADES ESPECIALES PENDIENTES CCTV'
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TRSDashboard
