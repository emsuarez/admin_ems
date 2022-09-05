import ChevronLeftIcon from '@heroicons/react/outline/ChevronLeftIcon'
import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Icon from '../../assets/Icon'
import {
  getGrupoFamiliarAction,
  UpdateEstadoFamiliarAction,
} from '../../store/actions'

const HistorialMovimientoTable = ({
  data,
  handleOpenViewInforme,
  handleOpenEditInforme,
  handleOpenDelete,
}) => {
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
              <th className='bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'></th>
              <th
                colspan={2}
                className='bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Lugares
              </th>
              <th
                colspan={2}
                className='bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Vehículo
              </th>
              <th
                colspan={2}
                className='bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Hora
              </th>
              <th
                colspan={6}
                className='pbg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              ></th>
            </tr>
            <tr>
              <th className='bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'>
                Ejecutivo o familiar
              </th>
              <th className='bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'>
                Salida
              </th>
              <th className='bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'>
                Llegada
              </th>

              <th className='bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'>
                Ejecutivo
              </th>
              <th className='bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'>
                Protector
              </th>
              <th className='bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'>
                Salida
              </th>
              <th className='bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'>
                Llegada
              </th>
              <th className='bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'>
                Protector
              </th>
              <th className='bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'>
                Observación
              </th>
              <th
                colspan={4}
                className='bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Opciones
              </th>
            </tr>
          </thead>

          {JSON.stringify(data) !== '{}' ? (
            <tbody className='overflow-x-auto'>
              {results.map((item, index) => (
                <tr key={item.id}>
                  <td className='border-t-0  align-middle border-l-0 border-r-0 text-base whitespace-nowrap text-center text-blueGray-700 '>
                    {item.ejecutivo} o {item.familiar}
                  </td>

                  <td className='border-t-0  align-middle border-l-0 border-r-0 text-base whitespace-nowrap text-center'>
                    {item.lugar_salida}
                  </td>
                  <td className='border-t-0  align-middle border-l-0 border-r-0 text-base whitespace-nowrap text-center'>
                    {item.lugar_llegada}
                  </td>
                  <td className='border-t-0 align-middle border-l-0 border-r-0 text-base whitespace-nowrap text-center'>
                    {item.vehiculo_ejecutivo}
                  </td>
                  <td className='border-t-0 align-middle border-l-0 border-r-0 text-base whitespace-nowrap text-center'>
                    {item.vehiculo_protector}
                  </td>
                  <td className='border-t-0 align-middle border-l-0 border-r-0 text-base whitespace-nowrap text-center'>
                    {item.hora_salida}
                  </td>
                  <td className='border-t-0 align-middle border-l-0 border-r-0 text-base whitespace-nowrap text-center'>
                    {item.hora_llegada}
                  </td>
                  <td className='border-t-0 align-middle border-l-0 border-r-0 text-base whitespace-nowrap text-center'>
                    {item.protector}
                  </td>

                  <td className='border-t-0 align-middle border-l-0 border-r-0 text-base whitespace-nowrap text-center'>
                    {item.observacion}
                  </td>

                  <td className='border-t-0 align-middle border-l-0 border-r-0 text-base whitespace-nowrap text-white mx-aut text-center'>
                    {item.estado === 1 ? (
                      <Icon svgName='luzVerde' className='h-4' />
                    ) : item.estado === 2 ? (
                      <Icon svgName='luzNaranja' className='h-4' />
                    ) : (
                      <Icon svgName='luzRoja' className='h-4' />
                    )}
                  </td>

                  <td className='border-t-0 align-middle border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white mx-0 hover:bg-gray-300 hover:rounded text-center'>
                    <button onClick={() => handleOpenEditInforme(item)}>
                      <Icon svgName='ib_editar' className='h-4' />
                    </button>
                  </td>

                  <td className='text-sm text-white text-center'>
                    <button
                      className='bg-blue-900 rounded-md hover:bg-blue-600 px-2'
                      onClick={() => handleOpenViewInforme(item)}
                    >
                      Ver
                    </button>
                  </td>

                  <td className='border-t-0  align-middle border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white hover:text-red-600 mx-auto hover:bg-gray-300 hover:rounded text-center'>
                    <button onClick={() => handleOpenDelete(item)}>
                      <Icon svgName='ib_eliminar' className='h-4' />
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

export default HistorialMovimientoTable
