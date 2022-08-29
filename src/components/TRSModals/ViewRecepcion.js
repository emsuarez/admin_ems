import React, { useEffect, useState } from 'react'
import {
  AdminAuthorized,
  Header,
  ICONS,
  RedirectWithoutLogin,
} from '../../components'
import logo from '../../assets/logo.png'
import { useLocation } from 'react-router-dom'

const ViewRecepcion = ({ dataInforme }) => {
  const location = useLocation()
  const [protectores, setProtectores] = useState([])
  const [centralistas, setCentralistas] = useState([])
  const [novedades, setNovedades] = useState([])
  useEffect(() => {
    console.log(location.state, 'dataInforme')
    console.log(location.state.protectores.split(','), 'protectores')
    console.log(location.state.centralistas.split(','), 'centralistas')
    setProtectores(
      location.state.protectores.length > 0
        ? location.state.protectores.split(',') || []
        : []
    )
    setCentralistas(
      location.state.centralistas.length > 0
        ? location.state.centralistas.split(',') || []
        : []
    )
    setNovedades(location.state.trsnovedad || [])
  }, [])

  return (
    <>
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
            <Header />
            <div className='flex items-center bg-slate-100 py-2'>
              <ICONS.HomeIconS className='h-6 ml-10 text-gray-600' />
              <p className=' ml-1'>TRS</p>
              <ICONS.ChevronRightIconO className='h-3  ml-1' />
              <p className=' ml-1'>Entrega y Recepción de Turno</p>
            </div>

            <div className='flex justify-center items-center'>
              {/* <ICONS.ChevronDoubleLeftIconO className='h-14 mt-[32vh] mx-14 text-gray-400 hover:cursor-pointer' /> */}
              <div className='mx-14 text-gray-400 hover:cursor-pointer'>
                <svg
                  width='73'
                  height='112'
                  viewBox='0 0 73 112'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3.71666 59.178C1.9906 57.7879 1.97474 55.1638 3.68386 53.7529L65.2718 2.91192C67.5544 1.02765 71 2.65123 71 5.61105L71 106.053C71 108.993 67.5945 110.623 65.3047 108.779L3.71666 59.178Z'
                    fill='white'
                    stroke='black'
                    stroke-width='3'
                  />
                </svg>
              </div>
              <div className='flex justify-center bg-white'>
                <div className='px-4 border-2 hover:shadow-xl hover:border-2 shadow-sm py-8'>
                  <div className='flex justify-center space-x-14 mb-8'>
                    <img src={logo} className='h-14' />
                    <h2 className='font-bold text-xl mt-2'>
                      ACTA ENTREGA RECEPCION DE GUARDIA EMSECOR
                    </h2>

                    <button
                    // onClick={() =>
                    //   ejecutivosReportPDF(allEjecutivosData.results)
                    // }
                    >
                      <div className='flex'>
                        <p className='text-blue-800 hover:cursor-pointer'>
                          Exportar a PDF
                        </p>
                        <ICONS.ChevronDownIconO
                          className='w-3 mb-1.5 ml-2'
                          color='blue'
                        />
                      </div>
                    </button>
                  </div>

                  <div className='flex justify-between px-20'>
                    <p className='font-semibold'>
                      CENTRAL DE OPERACIONES DIURNA
                    </p>
                    <p className='font-semibold'>
                      FECHA: {location.state.created}
                    </p>
                  </div>

                  {/* FOUR LINES */}
                  <div className='flex mt-12'>
                    {/* LEFT */}
                    <div className='w-1/2'>
                      <h2 className='font-semibold text-center'>
                        GRUPO DE PROTECCION GUARDIA
                      </h2>

                      <div>
                        <ol
                          style={{ listStyleType: 'number' }}
                          className='pl-6'
                        >
                          <div className='border-2 border-gray-500 rounded-md'>
                            {protectores.length > 0 ? (
                              protectores.map((protector, index) => (
                                <li
                                  key={index}
                                  className='pl-2 border-b-2 border-gray-500'
                                >
                                  <p className='font-semibold'>{protector}</p>
                                </li>
                              ))
                            ) : (
                              <li className='pl-2 border-b-2 border-gray-500'>
                                <p className='font-semibold'>
                                  No se han registrado protectores
                                </p>
                              </li>
                            )}
                          </div>
                        </ol>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className='w-1/2'>
                      <h2 className='font-semibold text-center'>
                        GRUPO DE TRABAJO
                      </h2>

                      <div>
                        <ol
                          style={{ listStyleType: 'number' }}
                          className='pl-6'
                        >
                          <div className='border-2 border-gray-500 rounded-md'>
                            {centralistas.length > 0 ? (
                              centralistas.map((centralista, index) => (
                                <li
                                  key={index}
                                  className='pl-2 border-b-2 border-gray-500'
                                >
                                  <p>{centralista}</p>
                                </li>
                              ))
                            ) : (
                              <li className='pl-2 border-b-2 border-gray-500'>
                                <p>No se han registrado centralistas</p>
                              </li>
                            )}
                          </div>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* NEW SECTION */}
                  <div className='flex mt-12 mb-32'>
                    {/* LEFT */}
                    <div className='w-1/2'>
                      <h2 className='font-semibold text-center'>
                        NOVEDADES ESPECIALES
                      </h2>
                      <div>
                        <ol className='border-2 border-gray-500'>
                          {novedades.map((novedad, index) => (
                            <li className='w-full p-2 border-b-2'>
                              <div className='flex'>
                                <p className='text-blue-900 '>
                                  <b className='text-black'>
                                    {novedad.created}
                                  </b>{' '}
                                  - {novedad.observacion}
                                </p>
                              </div>
                            </li>
                          ))}

                          {/* <li className='w-full p-2 border-b-2'>
                            <div className='flex'>
                              <p className='text-blue-900 '>
                                <b className='text-black'>16:04</b> But I must
                                explain to you how all this mistaken idea of
                              </p>
                            </div>
                          </li>
                          <li className='w-full p-2 border-b-2'>
                            <div className='flex'>
                              <p className='text-blue-900 '>
                                <b className='text-black'>16:04</b> But I must
                                explain to you how all this mistaken idea of
                              </p>
                            </div>
                          </li>
                          <li className='w-full p-2 border-b-2'>
                            <div className='flex'>
                              <p className='text-blue-900 '>
                                <b className='text-black'>16:04</b> But I must
                                explain to you how all this mistaken idea of
                              </p>
                            </div>
                          </li> */}
                        </ol>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className='w-1/2'>
                      <h2 className='font-semibold text-center'>
                        CONSIGNAS ESPECIALES
                      </h2>

                      {/* <div>
                        <ol className='pl-2'>
                          <li className='w-full px-2 py-2 text-blue-500 border-[1px] border-gray-500 mt-0.5'>
                            <div className='flex'>
                              <p>
                                <b className='text-black'>16:04</b> But I must
                                explain to you how all this mistaken idea of
                              </p>
                            </div>

                            <div className='group'>
                              <div className='flex justify-center group  hover:cursor-pointer'>
                                <p className='text-black text-sm font-semibold'>
                                  Cierre: 22/11/2021 16:02
                                </p>
                                <ICONS.ChevronDownIconO className='h-4 text-black' />
                              </div>
                              <div className=' px-2 py-2 text-blue-500  flex border-[1px] border-blue-500 mt-0.5'>
                                <p>
                                  But I must explain to you how all this
                                  mistaken idea of
                                </p>
                              </div>
                            </div>
                          </li>
                          <li className='w-full px-2 py-2 text-gray-500 border-[1px] border-gray-500 mt-0.5'>
                            <b className='text-black'>16:04</b> But I must
                            explain to you how all this mistaken idea of
                          </li>
                          <li className='w-full px-2 py-2 text-gray-500 border-[1px] border-gray-500 mt-0.5'>
                            <b className='text-black'>16:04</b> But I must
                            explain to you how all this mistaken idea of
                          </li>
                          <li className='w-full px-2 py-2 text-gray-500 border-[1px] border-gray-500 mt-0.5'>
                            <b className='text-black'>16:04</b> But I must
                            explain to you how all this mistaken idea of
                          </li>
                        </ol>
                      </div> */}
                    </div>
                  </div>

                  {/* FOOTER SECTION */}
                  <div className='border-2 border-gray-500'>
                    <div className='flex border-b-2 border-gray-500'>
                      <div className=' w-1/2 text-center py-4 border-r-2 border-gray-500'>
                        <p>CENTRALISTA DE OPERACIONES SALIENTE:</p>
                        <p>Nombre del Agente</p>
                      </div>

                      <div className='w-1/2 text-center my-4'>
                        <p>CENTRALISTA DE OPERACIONES SALIENTE:</p>
                        <p>Nombre del Agente</p>
                      </div>
                    </div>

                    <div className='flex'>
                      <p className='h-20 w-1/2 flex flex-col justify-end p-2 border-r-2 border-gray-500'>
                        Firma:
                      </p>
                      <p className=' h-20 w-1/2 flex flex-col justify-end p-2 border-r-2 border-gray-500'>
                        Hora:
                      </p>
                      <p className='h-20 w-1/2 flex flex-col justify-end p-2 border-r-2 border-gray-500'>
                        Firma:
                      </p>
                      <p className='h-20 w-1/2 flex flex-col justify-end p-2'>
                        Hora:
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <ICONS.ChevronDoubleRightIconO className='mx-14 h-14 mt-[32vh] text-gray-400 hover:cursor-pointer' /> */}
              <div className='mx-14 text-gray-400 hover:cursor-pointer'>
                <svg
                  width='72'
                  height='112'
                  viewBox='0 0 72 112'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M69.0962 57.7738L7.73642 108.89C5.46229 110.785 2.00949 109.176 1.99624 106.217L1.54653 5.77548C1.53336 2.83541 4.93157 1.19024 7.22962 3.02411L69.0391 52.349C70.7713 53.7314 70.7989 56.3553 69.0962 57.7738Z'
                    fill='white'
                    stroke='black'
                    stroke-width='3'
                  />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ViewRecepcion
