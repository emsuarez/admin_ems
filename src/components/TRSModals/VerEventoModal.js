import { Box, Modal } from '@mui/material'
import React from 'react'

import { format } from 'date-fns'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import logo from '../../assets/logo.png'
import { ICONS } from '../constants'

const VerEventoModal = ({
  openModal,
  handleClose,
  tituloModal,
  descripcionModal,
  handleAction,
  dataSeleccionada,
}) => {
  const componentRef = useRef()
  const handleGenerarReportePdf = useReactToPrint({
    content: () => componentRef.current,
  })
  return (
    <>
      <Modal
        open={openModal}
        onClose={(_, reason) => reason === 'backdropClick' && handleClose()}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box>
          <div id='defaultModal' aria-hidden='true' className=''>
            <div className='p-4 w-[650px] '>
              <div className=' bg-white rounded-lg p-2'>
                <button
                  onClick={() => handleGenerarReportePdf()}
                  className='flex w-full justify-end'
                >
                  <div className='flex'>
                    <p className='text-blue-800 hover:cursor-pointer'>
                      Exportar a PDF
                    </p>
                    <ICONS.ChevronDownIconO className='w-3 ml-2' color='blue' />
                  </div>
                </button>
                <div ref={componentRef} className='grid grid-rows-7'>
                  <div className='flex flex-col justify-center items-center'>
                    <img src={logo} className='h-14' />
                    <h1 className='text-2xl font-bold'>
                      Evento de Control de Movimiento
                    </h1>
                  </div>

                  <div className='flex justify-between my-4 mx-8'>
                    <div className='flex flex-col'>
                      <p className='text-sm flex justify-end'>
                        <label className='font-semibold text-sm pr-4 w-36'>
                          Fecha Creación:
                        </label>
                        {dataSeleccionada.created &&
                          format(
                            new Date(dataSeleccionada?.created),
                            'dd/MM/yyyy HH:mm'
                          )}
                      </p>
                      <p className='text-sm flex justify-end'>
                        <label className='font-semibold text-sm pr-4 w-36'>
                          Fecha Modificación:
                        </label>
                        {dataSeleccionada.updated &&
                          format(
                            new Date(dataSeleccionada?.updated),
                            'dd/MM/yyyy HH:mm'
                          )}
                      </p>
                    </div>
                    <div className='flex flex-col'>
                      <p className='text-sm flex justify-end'>
                        <label className='font-semibold text-sm pr-2'>
                          Ejecutivo Alias:
                        </label>
                        {dataSeleccionada?.ejecutivo}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className='flex justify-start my-4 mx-8'>
                    <div className='flex flex-col'>
                      <p className='text-sm flex justify-start'>
                        <label className='font-semibold text-sm pr-4 w-36'>
                          Familiar:
                        </label>
                        {dataSeleccionada?.familiar}
                      </p>
                      <p className='text-sm flex justify-start'>
                        <label className='font-semibold text-sm pr-4 w-36'>
                          Vehículo:
                        </label>
                        {dataSeleccionada?.vehiculo_ejecutivo}
                      </p>
                      <p className='text-sm flex justify-start'>
                        <label className='font-semibold text-sm pr-4 w-36'>
                          Observación:
                        </label>
                        {dataSeleccionada?.vehiculo_observacion}
                      </p>
                    </div>
                    <div></div>
                  </div>
                  <hr />
                  <div className='flex justify-start my-4 mx-8'>
                    <div className='flex flex-col'>
                      <p className='text-sm flex justify-start'>
                        <label className='font-semibold text-sm pr-4 w-36'>
                          Protector:
                        </label>
                        {dataSeleccionada?.protector}
                      </p>
                      <p className='text-sm flex justify-start'>
                        <label className='font-semibold text-sm pr-4 w-36'>
                          Vehiculo Protector:
                        </label>
                        {dataSeleccionada?.vehiculo_protector}
                      </p>
                      <p className='text-sm flex justify-start'>
                        <label className='font-semibold text-sm pr-4 w-36'>
                          Placa:
                        </label>
                        {dataSeleccionada?.placa}
                      </p>
                      <p className='text-sm flex justify-start'>
                        <label className='font-semibold text-sm pr-4 w-36'>
                          Descripción:
                        </label>
                        {dataSeleccionada?.vehiculo_protector_descripcion}
                      </p>
                    </div>
                    <div></div>
                  </div>
                  <hr />
                  <div className='flex justify-between mx-8 my-4'>
                    <div className='flex flex-col'>
                      <p className='text-sm flex justify-start'>
                        <span className='font-semibold text-sm pr-4 w-36'>
                          Lugar Salida:
                        </span>
                        {dataSeleccionada?.lugar_salida}
                      </p>
                      <p className='text-sm flex justify-start'>
                        <span className='font-semibold text-sm pr-4 w-36'>
                          Lugar Llegada:
                        </span>
                        {dataSeleccionada?.lugar_llegada}
                      </p>
                    </div>
                    <div className='flex flex-col'>
                      <p className='text-sm flex justify-start'>
                        <span className='font-semibold text-sm pr-4 w-36'>
                          Fecha Salida:
                        </span>
                        {dataSeleccionada.hora_salida &&
                          format(
                            new Date(dataSeleccionada?.hora_salida),
                            'dd/MM/yyyy HH:mm'
                          )}
                      </p>
                      <p className='text-sm flex justify-start'>
                        <span className='font-semibold text-sm pr-4 w-36'>
                          Fecha Llegada:
                        </span>
                        {dataSeleccionada.hora_llegada &&
                          format(
                            new Date(dataSeleccionada?.hora_llegada),
                            'dd/MM/yyyy HH:mm'
                          )}
                      </p>
                    </div>
                  </div>
                  <div className='flex justify-between mx-8 my-4'>
                    <div className='flex flex-col'>
                      <p className='text-sm flex justify-start'>
                        <span className='font-semibold text-sm pr-4 w-36'>
                          Observación:
                        </span>
                        {dataSeleccionada?.observacion}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex items-end justify-end px-6 py-3  border-gray-200 '>
                  <button
                    data-modal-toggle='defaultModal'
                    type='button'
                    className=' text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-base font-medium px-5 py-1.5 focus:z-10 '
                    onClick={handleClose}
                  >
                    Salir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default VerEventoModal
