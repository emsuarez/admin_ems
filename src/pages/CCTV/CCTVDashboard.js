import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CCTVAuthorized,
  Header,
  ICONS,
  LineChart,
  RedirectWithoutLogin,
} from '../../components'
import ConsignasTable from '../../components/CCTV/ConsignasTable'
import {
  getPersonalInformeCctv,
  obtenerConsignasCCTVAction,
  obtenerConsignasGrafica,
} from '../../store/actions'

const CCTVDashboard = () => {
  const dispatch = useDispatch()

  const [idConsigna] = useState(4)

  const [modalCctv, setModalCctv] = useState(false)

  const [consignaSeleccionada, setConsignaSeleccionada] = useState()
  const [protectores, setProtectores] = useState([])
  const [centralistas, setCentralistas] = useState([])

  const cargarConsignas = () => {}
  useEffect(() => {
    dispatch(getPersonalInformeCctv())
    dispatch(obtenerConsignasCCTVAction())
    dispatch(obtenerConsignasGrafica(idConsigna))
  }, [dispatch])

  const consignas = useSelector(state => state.consignas)
  const informes = useSelector(state => state.informes)

  return (
    <div className='h-full w-full'>
      <RedirectWithoutLogin />

      {CCTVAuthorized() === -1 ? (
        <div className='h-full bg-white flex flex-col justify-center'>
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
              <p className=' ml-1 font-semibold'>CCTV</p>
            </div>

            <div className='flex mt-4 justify-center mb-8'>
              <div className='flex flex-col basis-2/4 mx-8'>
                <div className='bg-white w-full mb-3 border-2 border-gray-200 p-20'>
                  <LineChart data={consignas?.consignasGrafica} />
                </div>

                <div className='bg-white p-6 shadow-md mb-3 w-full border-2 border-gray-200'>
                  <h2 className='font-semibold text-lg'>
                    GUARDIA DE PROTECCIÓN GUARDIA
                  </h2>
                  {informes.personalInformeCctv.protectores && (
                    <ol>
                      {informes.personalInformeCctv.protectores.map(
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
                  {informes.personalInformeCctv.centralistas && (
                    <ol>
                      {informes.personalInformeCctv.centralistas.map(
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
              {/* <AlertCerrarConsigna
                modal={modalCctv}
                setModal={setModalCctv}
                infoConsigna={consignaSeleccionada}
                handleCerrarConsigna={handleCerrarConsignaCctv}
              /> */}
              <div className='flex flex-col basis-2/4'>
                <div className='flex items-stretch mb-3 h-1/2'>
                  <ConsignasTable
                    data={consignas?.consignasCctv}
                    tituloTipoTable='CONSIGNAS ESPECIALES PENDIENTES CCTV'
                  />
                </div>
                <div className='basis-2/4 flex items-stretch h-1/2'>
                  <ConsignasTable
                    data={consignas?.novedadesCctv}
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

export default CCTVDashboard
