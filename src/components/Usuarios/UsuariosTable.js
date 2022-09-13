import ChevronLeftIcon from '@heroicons/react/outline/ChevronLeftIcon'
import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  getUsersAction,
  UpdateEstadoUsuariosAction,
} from '../../store/actions/AuthAction'

const UsuariosTable = ({
  data,
  handleOpenEditModal,
  handleOpenResetearPasswordModal,
}) => {
  const { results, count } = data
  const dispatch = useDispatch()

  const [cuentaDesdePagina, setCuentaDesdePagina] = useState(1)
  const [cuentaHastaPagina, setCuentaHastaPagina] = useState(10)

  const handlePreviousPage = newPage => {
    dispatch(getUsersAction(newPage))
    setCuentaDesdePagina(
      cuentaDesdePagina - 10 < 0 ? 1 : cuentaDesdePagina - 10
    )
    setCuentaHastaPagina(cuentaHastaPagina - 10)
  }

  const handleNextPage = newPage => {
    dispatch(getUsersAction(newPage))
    setCuentaDesdePagina(cuentaDesdePagina + 10)
    setCuentaHastaPagina(
      cuentaHastaPagina + 10 > count ? count : cuentaHastaPagina + 10
    )
  }

  const handleChangeStatusUser = data => {
    console.log(data)
    const nuevoStatus = {
      clasificador: 'usuario',
      id: data.user_id,
      estado: data.is_active === true ? false : true,
    }
    dispatch(UpdateEstadoUsuariosAction(nuevoStatus))
  }
  return (
    <div className='flex flex-col break-words bg-white w-full shadow-lg h-full'>
      <div className='overflow-y-auto'>
        <table className='items-center bg-transparent w-full border-collapse'>
          <thead className='border-gray-200'>
            <tr>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Usuario
              </th>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Nombre y Apellido
              </th>

              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Cargo
              </th>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Fecha de creación
              </th>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Opciones
              </th>
            </tr>
          </thead>

          {Object.keys(data).length > 0 ? (
            <tbody className='overflow-x-auto'>
              {results.map(item => (
                <tr key={item.user_id}>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
                    {item.username}
                  </td>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
                    {`${item.first_name} ${item.last_name}`}
                  </td>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
                    {item.tipo === '1'
                      ? 'Administrador'
                      : item.tipo === '2'
                      ? 'Operador CCTV'
                      : 'Operador TRS'}
                  </td>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
                    {item.created}
                  </td>
                  <td>
                    <button
                      onClick={() => handleOpenResetearPasswordModal(item)}
                    >
                      <td className='border-t-0 px-2 align-middle border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white mx-auto hover:bg-gray-300 hover:rounded'>
                        <svg
                          width='23'
                          height='23'
                          viewBox='0 0 23 23'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          xmlnsXlink='http://www.w3.org/1999/xlink'
                        >
                          <rect width='23' height='23' fill='url(#pattern0)' />
                          <defs>
                            <pattern
                              id='pattern0'
                              patternContentUnits='objectBoundingBox'
                              width='1'
                              height='1'
                            >
                              <use
                                xlinkHref='#image0_2130_3365'
                                transform='scale(0.00195312)'
                              />
                            </pattern>
                            <image
                              id='image0_2130_3365'
                              width='512'
                              height='512'
                              xlinkHref='data:image/png;base64,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'
                            />
                          </defs>
                        </svg>
                      </td>
                    </button>
                    <button
                      className='mt-2'
                      onClick={() => handleChangeStatusUser(item)}
                    >
                      <td className='border-t-0 px-2 align-middle border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white mx-auto hover:bg-gray-300 hover:rounded'>
                        {item.is_active ? (
                          <svg
                            width='23'
                            height='24'
                            viewBox='0 0 23 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5'
                          >
                            <path
                              d='M11.0858 0.930908C4.96611 0.930908 -0.000610352 5.98223 -0.000610352 12.2062C-0.000610352 18.4301 4.96611 23.4815 11.0858 23.4815C17.2055 23.4815 22.1723 18.4301 22.1723 12.2062C22.1723 5.98223 17.2055 0.930908 11.0858 0.930908ZM8.86854 17.8438L3.32532 12.2062L4.88851 10.6164L8.86854 14.6529L17.2831 6.09498L18.8463 7.69607L8.86854 17.8438Z'
                              fill='#128868'
                            />
                          </svg>
                        ) : (
                          <svg
                            width='23'
                            height='23'
                            viewBox='0 0 23 23'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-5'
                          >
                            <path
                              d='M11.0858 0.208252C4.96611 0.208252 -0.000610352 5.25957 -0.000610352 11.4835C-0.000610352 17.7075 4.96611 22.7588 11.0858 22.7588C17.2055 22.7588 22.1723 17.7075 22.1723 11.4835C22.1723 5.25957 17.2055 0.208252 11.0858 0.208252ZM8.86854 17.1212L3.32532 11.4835L4.88851 9.89371L8.86854 13.9303L17.2831 5.37233L18.8463 6.97342L8.86854 17.1212Z'
                              fill='#D61601'
                            />
                          </svg>
                        )}
                      </td>
                    </button>

                    <button onClick={() => handleOpenEditModal(item)}>
                      <td className='border-t-0 px-2 align-middle border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white mx-auto hover:bg-gray-300 hover:rounded'>
                        <svg
                          width='17'
                          height='15'
                          viewBox='0 0 17 15'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5'
                        >
                          <path
                            d='M9.58764 2.65888L0 11.4233V14.6731H3.47684L16.0145 3.34822V2.16649L13.6966 0H12.327L9.58764 2.65888Z'
                            fill='#128868'
                          />
                        </svg>
                      </td>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
      </div>

      {/* Paginación */}
      <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
        <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm text-gray-700'>
              Mostrando <span className='font-medium'>{cuentaDesdePagina}</span>{' '}
              -{' '}
              <span className='font-medium'>
                {Object.keys(data).length > 0 ? cuentaHastaPagina : null}
              </span>{' '}
              de{' '}
              <span className='font-medium'>
                {Object.keys(data).length > 0 ? count : null}
              </span>{' '}
              resultados
            </p>
          </div>
          <div>
            <nav
              className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
              aria-label='Pagination'
            >
              <button
                disabled={data.previous === null ? true : false}
                className={data.previous !== null ? 'cursor-pointer' : null}
                onClick={() => handlePreviousPage(data.previous)}
              >
                <div
                  className={
                    data.previous === null
                      ? 'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium text-blue-900 bg-gray-300'
                      : 'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-blue-900 hover:bg-gray-50'
                  }
                >
                  <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                  {/* <span className='sr-only'> */}
                  Anterior
                  {/* </span> */}
                </div>
              </button>

              {/* {data.next || data.previous
            ? cantidadPaginas.map(pagina => (
                <a
                  href='#'
                  class='py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  {pagina}
                </a>
              ))
            : null} */}
              <button
              // disabled={data.next === null ? true : false}
              // className={data.next !== null ? 'cursor-pointer' : null}
              // onClick={() => handleNextPage(data.next)}
              >
                <div
                  className={
                    data.next === null
                      ? 'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium text-blue-900 bg-gray-300'
                      : 'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-blue-900 hover:bg-gray-50'
                  }
                >
                  {/* <span className='sr-only'> */}
                  Siguiente
                  <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
                  {/* </span> */}
                </div>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsuariosTable
