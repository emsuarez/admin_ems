import ChevronLeftIcon from '@heroicons/react/outline/ChevronLeftIcon'
import ChevronRightIcon from '@heroicons/react/outline/ChevronRightIcon'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getVehiculoProtectorAction } from '../../store/actions'

const VehiculosProtectTable = ({
  data,
  handleOpenEditModal,
  handleOpenDeleteModal,
}) => {
  const { results, count } = data
  const dispatch = useDispatch()

  const handlePreviousPage = newPage => {
    console.log(newPage, 'newPage')

    dispatch(getVehiculoProtectorAction(newPage))
  }

  const handleNextPage = newPage => {
    console.log(newPage, 'newPage')

    dispatch(getVehiculoProtectorAction(newPage))
  }

  const handleChangeStatusVehiculo = data => {
    const nuevoStatus = {
      clasificador: 'vehiculoejecutivo',
      id: data.id,
      estado: data.is_active === true ? false : true,
    }
    console.log(nuevoStatus, 'nuevoStatus')
    // dispatch(UpdateEstadoVehiculoProtectorAction(nuevoStatus))
  }
  return (
    <div className='flex flex-col break-words bg-white w-full shadow-lg h-full'>
      <div className='overflow-y-auto'>
        <table className='items-center bg-transparent w-full border-collapse'>
          <thead className='border-gray-200'>
            <tr>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Alias
              </th>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Placas
              </th>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Tipo
              </th>

              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Creado
              </th>
              <th className='px-6 bg-blueGray-50 text-blue-900 align-middle border border-solid border-blueGray-100 py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left'>
                Opciones
              </th>
            </tr>
          </thead>

          {Object.keys(data).length > 0 ? (
            <tbody className='overflow-x-auto'>
              {data.results.map((item, index) => (
                <tr key={item.id}>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
                    {item.alias}
                  </td>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
                    {item.placas}
                  </td>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
                    {item.tipo}
                  </td>
                  <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-base whitespace-nowrap'>
                    {item.created}
                  </td>
                  <button
                    className='mt-2'
                    onClick={() => handleChangeStatusVehiculo(item)}
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
                  <button onClick={() => handleOpenDeleteModal(item)}>
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
              Mostrando <span className='font-medium'>1</span> -{' '}
              <span className='font-medium'>
                {Object.keys(data).length > 0 ? results.length : null}
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

export default VehiculosProtectTable
