import ChevronLeftIcon from '@heroicons/react/outline/ChevronLeftIcon'
import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Icon from '../../assets/Icon'
import { GetLugaresAction, UpdateEstadoLugarAction } from '../../store/actions'
import { format } from 'date-fns'

const LugaresTable = ({
  data,
  handleOpenEditModal,
  handleOpenDeleteModal,
  seBuco,
}) => {
  const { results, count } = data
  const dispatch = useDispatch()

  const [cuentaDesdePagina, setCuentaDesdePagina] = useState(1)
  const [cuentaHastaPagina, setCuentaHastaPagina] = useState(
    data.results.length
  )

  useEffect(() => {
    if (!seBuco) {
      setCuentaDesdePagina(1)
      setCuentaHastaPagina(results.length)
    }

    setCuentaHastaPagina(results.length)
    if (count < 10) {
      setCuentaDesdePagina(1)
      setCuentaHastaPagina(count)
    }
  }, [count])

  const handlePreviousPage = newPage => {
    dispatch(GetLugaresAction(newPage))
    setCuentaDesdePagina(
      cuentaDesdePagina - 10 < 0 ? 1 : cuentaDesdePagina - 10
    )
    setCuentaHastaPagina(cuentaHastaPagina - data.results.length)
  }

  const handleNextPage = newPage => {
    dispatch(GetLugaresAction(newPage))
    setCuentaDesdePagina(cuentaDesdePagina + data.results.length)
    setCuentaHastaPagina(
      cuentaHastaPagina + 10 > count ? count : cuentaHastaPagina + 10
    )
  }

  const handleChangeStatusLugar = data => {
    const nuevoStatus = {
      clasificador: 'lugares',
      id: data.id,
      estado: data.is_active === true ? false : true,
    }
    dispatch(UpdateEstadoLugarAction(nuevoStatus))
  }
  return (
    <div className='flex flex-col break-words bg-white w-full shadow-lg h-full'>
      <div className='overflow-y-auto'>
        <table className='items-center bg-transparent w-full border-collapse'>
          <thead className='border-gray-200'>
            <tr>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Lugar
              </th>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Alias
              </th>

              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Creado
              </th>
              <th
                colSpan={3}
                className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center'
              >
                Opciones
              </th>
            </tr>
          </thead>

          {Object.keys(data).length > 0 ? (
            <tbody className='overflow-x-auto'>
              {data.results.map(item => (
                <tr key={item.id}>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
                    {item.lugar}
                  </td>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
                    {item.alias}
                  </td>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
                    {format(new Date(item.created), 'dd/MM/yyyy HH:mm')}
                  </td>

                  <td
                    className='mt-2 border-t-0 px-2 align-middle border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white mx-auto hover:bg-gray-300 hover:rounded'
                    onClick={() => handleChangeStatusLugar(item)}
                  >
                    {item.is_active ? (
                      <Icon svgName='ib_activo' className='h-5 mx-auto' />
                    ) : (
                      <Icon svgName='ib_inactivo' className='h-5 mx-auto' />
                    )}
                  </td>

                  <td
                    className='border-t-0 px-2 align-middle border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white mx-auto hover:bg-gray-300 hover:rounded'
                    onClick={() => handleOpenEditModal(item)}
                  >
                    <Icon svgName='ib_editar' className='h-4 mx-auto' />
                  </td>

                  <td
                    className='border-t-0 px-2 align-middle border-l-0 border-r-0 text-base whitespace-nowrap hover:cursor-pointer text-white hover:text-red-600 mx-auto hover:bg-gray-300 hover:rounded'
                    onClick={() => handleOpenDeleteModal(item)}
                  >
                    <Icon svgName='ib_eliminar' className='h-4 mx-auto' />
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

export default LugaresTable
