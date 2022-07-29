import React from 'react'
import { ICONS } from '../constants'
import user from '../../assets/user.jpg'
import { styled } from '@mui/material/styles'

import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 620,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))

const Notification = () => {
  return (
    <HtmlTooltip
      // disableTouchListener
      enterDelay={0}
      leaveDelay={200}
      title={
        <React.Fragment>
          <div className='w-96'>
            <div className='flex space-x-4 justify-between border-b-[1px] py-4 text-sm'>
              <h3 className='font-semibold'>NOTIFICATIONS</h3>
              <div className='flex space-x-2 text-blue-500'>
                <p className='hover:cursor-pointer'>Mark All as Read</p>
                <p> | </p>
                <p className='hover:cursor-pointer'>Settings</p>
              </div>
            </div>

            <div className=' flex border-b-[1px] hover:cursor-pointer py-4 hover:bg-slate-100'>
              <img src={user} className='h-14 rounded-full ml-4' />
              <div className='ml-3 mt-2'>
                <p className='text-gray-500 text-base'>
                  <span className='font-semibold text-black'>
                    Suzzeh Bungaos
                  </span>{' '}
                  tagged you and 18 others in a post.
                </p>
                <p>October 13, 2022 8:45am</p>
              </div>
            </div>

            <div className=' flex border-b-[1px] hover:cursor-pointer py-4 hover:bg-slate-100'>
              <img src={user} className='h-14 rounded-full ml-4' />
              <div className='ml-3 mt-2'>
                <p className='text-gray-500 text-base'>
                  <span className='font-semibold text-black'>
                    Suzzeh Bungaos
                  </span>{' '}
                  tagged you and 18 others in a post.
                </p>
                <p>October 13, 2022 8:45am</p>
              </div>
            </div>

            <div className=' flex border-b-[1px] hover:cursor-pointer py-4 hover:bg-slate-100'>
              <img src={user} className='h-14 rounded-full ml-4' />
              <div className='ml-3 mt-2'>
                <p className='text-gray-500 text-base'>
                  <span className='font-semibold text-black'>
                    Suzzeh Bungaos
                  </span>{' '}
                  tagged you and 18 others in a post.
                </p>
                <p>October 13, 2022 8:45am</p>
              </div>
            </div>

            <div className=' flex border-b-[1px] hover:cursor-pointer py-4 hover:bg-slate-100'>
              <img src={user} className='h-14 rounded-full ml-4' />
              <div className='ml-3 mt-2'>
                <p className='text-gray-500 text-base'>
                  <span className='font-semibold text-black'>
                    Suzzeh Bungaos
                  </span>{' '}
                  tagged you and 18 others in a post.
                </p>
                <p>October 13, 2022 8:45am</p>
              </div>
            </div>

            <div className='flex justify-center p-2 hover:cursor-pointer py-4 hover:bg-slate-100'>
              <ICONS.ChevronDownIconO className='h-4 text-blue-500' />
              <p className='text-blue-500 text-sm'>Show All Notifications</p>
            </div>
          </div>
        </React.Fragment>
      }
    >
      <div>
        <ICONS.SpeakerphoneIconO className='icon' />
      </div>
    </HtmlTooltip>
  )
}

export default Notification
