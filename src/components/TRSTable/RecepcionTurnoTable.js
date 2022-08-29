import ChevronLeftIcon from '@heroicons/react/outline/ChevronLeftIcon'
import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getGrupoFamiliarAction,
  UpdateEstadoFamiliarAction,
} from '../../store/actions'

const RecepcionTurnoTable = ({ data, handleOpenViewInforme }) => {
  useEffect(() => {
    console.log(data, 'data obtenida en la tabla de ifnormes trs')
  }, [])

  const { results, count } = data

  const [cantidadPaginas, setCantidadPaginas] = useState()

  const [cuentaDesdePagina, setCuentaDesdePagina] = useState(1)
  const [cuentaHastaPagina, setCuentaHastaPagina] = useState(10)

  const dispatch = useDispatch()
  useEffect(() => {
    const calculoPaginas = () => {
      const cuantasPaginas = count / 10
      const numeracionList = []
      for (let index = 0; index < cuantasPaginas; index++) {
        numeracionList.push(index + 1)
      }
      setCantidadPaginas(numeracionList)
    }
    calculoPaginas()
  }, [])

  const handlePreviousPage = newPage => {
    dispatch(getGrupoFamiliarAction(newPage))
    setCuentaDesdePagina(
      cuentaDesdePagina - 10 < 0 ? 1 : cuentaDesdePagina - 10
    )
    setCuentaHastaPagina(cuentaHastaPagina - 10)
  }

  const handleNextPage = newPage => {
    dispatch(getGrupoFamiliarAction(newPage))
    setCuentaDesdePagina(cuentaDesdePagina + 10)
    setCuentaHastaPagina(
      cuentaHastaPagina + 10 > count ? count : cuentaHastaPagina + 10
    )
  }

  return (
    <div className='flex flex-col break-words bg-white w-full shadow-lg h-full'>
      <div className='overflow-y-auto'>
        <table className='items-center bg-transparent w-full border-collapse'>
          <thead className='border-gray-200'>
            <tr>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Centralista de operaciones salientes
              </th>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Centralista de operaciones entrantes
              </th>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Fecha y Hora
              </th>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Turno
              </th>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Opciones
              </th>
            </tr>
          </thead>

          {JSON.stringify(data) !== '{}' ? (
            <tbody className='overflow-x-auto'>
              {results.map((item, index) => (
                <tr key={item.id}>
                  <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap text-left text-blueGray-700 '>
                    {item.agente_saliente}
                  </th>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
                    {item.agente_entrante}
                  </td>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
                    {item.created}
                  </td>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
                    {item.turno === 0 ? 'Nocturno' : 'Diurno'}
                  </td>
                  <button
                  // onClick={() => handleOpenEditModal(item)}
                  >
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

                  <button
                    className='bg-blue-900 rounded-md mt-1 mx-1'
                    onClick={() => handleOpenViewInforme(item)}
                  >
                    <td className='text-sm border-t-0 px-2 align-middle border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white mx-auto hover:bg-blue-600 hover:rounded'>
                      Ver
                    </td>
                  </button>
                  <button
                  // onClick={() => handleOpenDeleteModal(item)}
                  >
                    <td className='border-t-0 px-2 align-middle border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white hover:text-red-600 mx-auto hover:bg-gray-300 hover:rounded'>
                      <svg
                        width='13'
                        height='17'
                        viewBox='0 0 13 17'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5'
                      >
                        <path
                          d='M12.8323 0.917237H9.7281L8.84118 0.00610352H4.40661L3.51969 0.917237H0.41549V2.7395H12.8323V0.917237ZM1.30241 3.65064V14.5842C1.30241 15.5865 2.10063 16.4065 3.07624 16.4065H10.1716C11.1472 16.4065 11.9454 15.5865 11.9454 14.5842V3.65064H1.30241Z'
                          fill='#D61601'
                        />
                      </svg>
                    </td>
                  </button>
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
                disabled={data.next === null ? true : false}
                className={data.next !== null ? 'cursor-pointer' : null}
                onClick={() => handleNextPage(data.next)}
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

export default RecepcionTurnoTable
