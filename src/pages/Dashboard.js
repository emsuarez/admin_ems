import React from 'react'
import {
  AdminAuthorized,
  CCTVTable,
  Header,
  ICONS,
  Piechart,
  RedirectWithoutLogin,
  TRSTable,
} from '../components'

const Dashboard = () => {
  return (
    <div className=''>
      <RedirectWithoutLogin />
      {AdminAuthorized() == -1 ? (
        <div className='z-50 bg-white flex flex-col justify-center'>
          <h1 className='font-bold text-3xl text-center'>
            No tiene permisos para acceder a esta página
          </h1>
        </div>
      ) : (
        <>
          <Header items='all' />
          <div className='flex flex-col'>
            <div className='mt-4'>
              <ICONS.HomeIconS className='h-6 ml-10 text-gray-600' />
            </div>

            <div className='flex mt-4 justify-center mb-8'>
              <div className='mx-8 w-3/6'>
                <Piechart />
              </div>
              <div className='mr-8 w-3/6'>
                <div className='mb-8'>
                  <TRSTable height={'100%'} />
                </div>
                <div>
                  <CCTVTable height={'100%'} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
