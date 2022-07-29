import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'

import Period from './Period'

const Piechart = () => {
  return (
    <div className='flex-col bg-white shadow-sm border-[1px] h-full w-full'>
      <h3 className='px-5 mt-5 font-semibold'>
        CONSIGNAS PENDIENTES TRS Y CCTV
      </h3>
      <div className='flex flex-col h-full mt-16'>
        <div className='self-end'>
          <Period />
        </div>

        <div className='mt-24 w-80 self-center'>
          <PieChart
            animation
            animationDuration={500}
            animationEasing='ease-out'
            center={[50, 50]}
            data={[
              { title: 'CCTV', value: 63, color: '#1A84E7' },
              { title: 'TRS', value: 25, color: '#21B739' },
            ]}
            radius={50}
          />
        </div>

        <div className='flex mt-10 justify-center'>
          <div className='flex flex-col mr-8'>
            <div className='flex'>
              <div className='h-3 w-3 bg-[#1A84E7] rounded-full mt-2 mr-2'></div>
              <p className='text-[#A3AED0]'>TRS</p>
            </div>

            <div className='text-2xl font-bold self-end'>63</div>
          </div>

          <div className='flex flex-col ml-8'>
            <div className='flex'>
              <div className='h-3 w-3 bg-[#21B739] rounded-full mt-2 mr-2'></div>
              <p className='text-[#A3AED0]'>CCTV</p>
            </div>

            <div className='text-2xl font-bold self-end'>25</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Piechart
