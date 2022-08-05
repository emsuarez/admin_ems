import React, { useRef, useState } from 'react'
import { ICONS } from '../constants'
import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { useNavigate } from 'react-router-dom'
import { ClickOutSide } from '../clickOutside/ClickOutSide'

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    placement='bottom-start'
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 620,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))

const CCTV = ({ item }) => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [subopen, setSubOpen] = useState(false)

  const wrapperRef = useRef(null)

  ClickOutSide(wrapperRef, setOpen)

  const toogleTooltip = () => {
    setOpen(!open)
  }
  const toogleSubTooltip = () => {
    setSubOpen(!subopen)
    open == false && setSubOpen(false)
  }

  return (
    <HtmlTooltip
      open={open}
      enterDelay={0}
      leaveDelay={200}
      title={
        <React.Fragment>
          <ul className='w-full' ref={wrapperRef}>
            <li className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'>
              <p className='text-sm my-1 ml-3 '>Entrega y recepción de turno</p>
            </li>

            <li
              onClick={() => {
                if (
                  window.location.href !==
                  window.location.protocol +
                    '//' +
                    window.location.host +
                    '/recepcionturno'
                ) {
                  navigate('/recepcionturno')
                }
              }}
              className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'
            >
              <p className='text-sm my-1 ml-3 mr-3'>
                Historial Entrega y recepción de Turno
              </p>
            </li>
          </ul>
        </React.Fragment>
      }
    >
      <div className='flex space-x-2' onClick={() => toogleTooltip()}>
        <div className='mt-1'>
          <svg
            width='16'
            height='18'
            viewBox='0 0 22 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M19.4594 0H3.34226C2.18021 0 1.67416 0.796875 1.67416 1.54688V4.53075H0.791811C0.354501 4.53075 0 4.85962 0 5.2654C0 5.67112 0.354501 6 0.791811 6H1.67416V9.01763H0.867395C0.43006 9.01763 0.0755839 9.34652 0.0755839 9.75225C0.0755839 10.158 0.43006 10.4869 0.86737 10.4869H1.67414V13.5206H0.84999C0.412654 13.5206 0.0581784 13.8495 0.0581784 14.2553C0.0581784 14.661 0.412654 14.9899 0.84999 14.9899H1.67414V18.0008H0.84999C0.412654 18.0008 0.0581784 18.3296 0.0581784 18.7354C0.0581784 19.1411 0.412654 19.47 0.84999 19.47H1.67414V22.5C1.67414 23.7428 2.72342 24 3.30424 24H19.4594C20.7989 24 21.8845 22.9928 21.8845 21.75V2.25C21.8845 1.00725 20.7993 0 19.4594 0ZM3.29093 22.5L3.2909 19.47H4.13324C4.57055 19.47 4.92505 19.1411 4.92505 18.7354C4.92505 18.3296 4.57055 18.0008 4.13324 18.0008H3.2909V14.9899H4.13324C4.57055 14.9899 4.92505 14.661 4.92505 14.2553C4.92505 13.8495 4.57055 13.5206 4.13324 13.5206H3.2909V10.4869H4.15062C4.58798 10.4869 4.94245 10.158 4.94245 9.75223C4.94245 9.3465 4.58798 9.0176 4.15064 9.0176H3.29093V6H4.07466C4.51199 6 4.86647 5.67112 4.86647 5.2654C4.86647 4.85962 4.51199 4.53075 4.07466 4.53075H3.29093V1.54688C3.29093 1.52925 3.29254 1.51463 3.29497 1.5015C3.31071 1.50051 3.32648 1.50001 3.34226 1.5H16.2259V22.5H3.29093ZM20.2678 21.75C20.2678 22.164 19.9056 22.5 19.4594 22.5H17.8426V1.50002H19.4594C19.9056 1.50002 20.2678 1.83602 20.2678 2.25002V21.75Z'
              fill='#26346E'
            />
          </svg>
        </div>
        <h2 className='text-base font-semibold text-gray-500'>CCTV</h2>
        <ICONS.ChevronDownIconO className='h-3 mt-2' />
      </div>
    </HtmlTooltip>
  )
}

export default CCTV
