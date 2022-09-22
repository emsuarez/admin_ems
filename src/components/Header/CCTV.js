import React, { useRef, useState } from 'react'
import { ICONS } from '../constants'
import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { useNavigate } from 'react-router-dom'
import { ClickOutSide } from '../clickOutside/ClickOutSide'
import { Button, Menu, MenuItem } from '@mui/material'
import Icon from '../../assets/Icon'

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement='bottom' />
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
    // open == false && setSubOpen(false)
  }

  // const [anchorEl, setAnchorEl] = React.useState(null)
  // const open = Boolean(anchorEl)
  // const handleClick = event => {
  //   setAnchorEl(event.currentTarget)
  // }
  // const handleClose = () => {
  //   setAnchorEl(null)
  // }
  return (
    <HtmlTooltip
      open={open}
      enterDelay={0}
      leaveDelay={200}
      className='pl-40'
      title={
        <React.Fragment>
          <ul className='w-full' ref={wrapperRef}>
            {item === 'cctv' && (
              <li className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'>
                <HtmlTooltip
                  open={subopen}
                  enterDelay={0}
                  leaveDelay={200}
                  className='pl-[26.5rem] -my-6'
                  title={
                    <>
                      <ul className='w-full' ref={wrapperRef}>
                        <li className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'>
                          <p className='text-sm my-1 ml-3 '>Diurno</p>
                        </li>
                        <li className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'>
                          <p className='text-sm my-1 ml-3 '>Nocturno</p>
                        </li>
                      </ul>
                    </>
                  }
                >
                  <div onClick={() => toogleSubTooltip()}>
                    <p className='text-sm ml-3 '>
                      Entrega y recepción de turno
                    </p>
                  </div>
                </HtmlTooltip>
              </li>
            )}

            <li
              onClick={() => {
                if (
                  window.location.href !==
                  window.location.protocol +
                    '//' +
                    window.location.host +
                    '/recepcionturnocctv'
                ) {
                  navigate('/recepcionturnocctv')
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
          <Icon svgName='ib_notebook' className='h-5' />
        </div>
        <h2 className='text-base font-semibold text-gray-500'>CCTV</h2>
        <ICONS.ChevronDownIconO className='h-3 mt-2' />
      </div>
    </HtmlTooltip>
    // <div>
    //   <Button
    //     id='basic-button'
    //     aria-controls={open ? 'basic-menu' : undefined}
    //     aria-haspopup='true'
    //     aria-expanded={open ? 'true' : undefined}
    //     onClick={handleClick}
    //     className='flex space-x-2'
    //   >
    //     <>
    //       <div className='mt-1'>
    //         <Icon svgName='ib_notebook' className='h-5' />
    //       </div>

    //       <h2 className='text-base font-semibold text-gray-500'>CCTV</h2>
    //       <ICONS.ChevronDownIconO className='h-3 mt-2' />
    //     </>
    //   </Button>
    //   <Menu
    //     id='basic-menu'
    //     anchorEl={anchorEl}
    //     open={open}
    //     onClose={handleClose}
    //     // MenuListProps={{
    //     //   'aria-labelledby': 'basic-button',
    //     // }}

    //     className='-ml-4 -py-2'
    //   >
    //     {item === 'cctv' && (
    //       <MenuItem
    //         onClick={handleClose}
    //         className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'
    //       >
    //         <p className='text-sm my-1 ml-3 '>Entrega y recepción de turno</p>
    //       </MenuItem>
    //     )}
    //     <MenuItem
    //       onClick={() => {
    //         if (
    //           window.location.href !==
    //           window.location.protocol +
    //             '//' +
    //             window.location.host +
    //             '/recepcionturnocctv'
    //         ) {
    //           navigate('/recepcionturnocctv')
    //         }
    //       }}
    //       className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'
    //     >
    //       <p className='text-sm ml-3 mr-3'>
    //         Historial Entrega y recepción de Turno
    //       </p>
    //     </MenuItem>
    //   </Menu>
    // </div>
  )
}

export default CCTV
