import React, { useRef, useState } from 'react'
import { ICONS } from '../constants'
import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { useNavigate } from 'react-router-dom'
import { ClickOutSide } from '../clickOutside/ClickOutSide'

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
      className='group'
      open={open}
      enterDelay={0}
      leaveDelay={200}
      title={
        <React.Fragment>
          <ul className=' w-80 space-y-4' ref={wrapperRef}>
            <li
              onClick={() => {
                item == 'all'
                  ? window.location.href !==
                      window.location.protocol +
                        '//' +
                        window.location.host +
                        '/admin/historial' && navigate('/admin/historial')
                  : window.location.href !==
                      window.location.protocol +
                        '//' +
                        window.location.host +
                        '/cctv/historial' && navigate('/cctv/historial')
              }}
              className='flex space-x-4 hover:cursor-pointer hover:border-l-4 border-blue-500 hover:bg-slate-200 h-10 '
            >
              {/* <ICONS.PencilAltIconS className="h-4 mt-3 ml-3" color="blue"/> */}
              <p className='text-sm   mt-3 ml-3'>
                Historial entrega y recepción de Turno
              </p>
            </li>
            {item == 'cctv' && (
              <li
                onClick={() => toogleSubTooltip()}
                className='flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200 h-10 '
              >
                <p className='text-sm mt-3 ml-3'>Entrega y recepciónde turno</p>
                <ICONS.ChevronRightIconO
                  className='h-4 mt-3 ml-3'
                  color='blue'
                />
              </li>
            )}

            <div className='flex flex-col w-fit ml-96 bg-red-400 '>
              <HtmlTooltip
                open={subopen}
                enterDelay={0}
                leaveDelay={200}
                title={
                  <React.Fragment>
                    <ul className=' w-80 space-y-4'>
                      <li
                        onClick={() => navigate('/cctv/diurno')}
                        className='flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200 h-10 '
                      >
                        {/* <ICONS.PencilAltIconS className="h-4 mt-3 ml-3" color="blue"/> */}
                        <p className='text-sm  mt-3 ml-3'>Diurno</p>
                      </li>
                      {item == 'cctv' && (
                        <li
                          onClick={() => navigate('/cctv/nocturno')}
                          className='flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200 h-10 '
                        >
                          <p className='text-sm  mt-3 ml-3'>Nocturno</p>
                        </li>
                      )}
                    </ul>
                  </React.Fragment>
                }
              ></HtmlTooltip>
            </div>
          </ul>
        </React.Fragment>
      }
    >
      <div

        className='flex space-x-2 p-3 -mt-1 md:mt-0'
      >
        <ICONS.BookOpenIconO className='md:h-7 h-5 mt-[1.5px] md:mt-0' />
        <h2 className='md:text-base font-semibold'>CCTV</h2>
        <ICONS.ChevronDownIconO className='h-3 mt-2' />
      </div>
    </HtmlTooltip>
  )
}

export default CCTV
