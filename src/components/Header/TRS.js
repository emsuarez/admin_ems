import { Button, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Icon from '../../assets/Icon'
import { postInformeTrs } from '../../store/actions/InformesAction'
import { ICONS } from '../constants'

const TRS = ({ item }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)
  const [subMenu, setSubMenu] = useState()
  const open = Boolean(anchorEl)
  const openSubMenu = Boolean(subMenu)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClickSubMenu = event => {
    setSubMenu(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNuevoInforme = tipoInforme => {
    navigate('/editrecepcion')
    dispatch(postInformeTrs(tipoInforme))
  }
  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='flex space-x-2'
      >
        <>
          <div className='mt-1'>
            <Icon svgName='ib_automovil' className='h-5' />
          </div>

          <h2 className='text-sm font-semibold text-gray-500'>TRS</h2>
          <ICONS.ChevronDownIconO className='h-3' />
        </>
      </Button>

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        className='-ml-4'
      >
        <MenuItem
          onClick={() => {
            if (
              window.location.href !==
              window.location.protocol +
                '//' +
                window.location.host +
                '/controlmovimiento'
            ) {
              navigate('/controlmovimiento')
            }
          }}
        >
          <div className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'>
            <p className='text-sm mx-3'>Control de movimiento</p>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (
              window.location.href !==
              window.location.protocol +
                '//' +
                window.location.host +
                '/historialmovimiento'
            ) {
              navigate('/historialmovimiento')
            }
          }}
        >
          <div className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'>
            <p className='text-sm mx-3'>Historial Control de movimiento</p>
          </div>
        </MenuItem>
        {item === 'trs' && (
          <MenuItem>
            <div
              aria-controls={openSubMenu ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={openSubMenu ? 'true' : undefined}
              onClick={handleClickSubMenu}
              className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer w-full'
            >
              <>
                <h2 className='text-sm mx-3'>Entrega y recepción de turno</h2>
              </>
            </div>
            <Menu
              anchorEl={subMenu}
              open={openSubMenu}
              onClose={() => setSubMenu(null)}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              className='ml-5'
            >
              <MenuItem onClick={() => handleNuevoInforme(1)}>Diurno</MenuItem>
              <MenuItem onClick={() => handleNuevoInforme(0)}>
                Nocturno
              </MenuItem>
            </Menu>
          </MenuItem>
        )}
        <MenuItem
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
        >
          <div className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'>
            <p className='text-sm mx-3'>
              Historial Entrega y recepción de Turno
            </p>
          </div>
        </MenuItem>
      </Menu>
    </div>
    // <HtmlTooltip
    //   open={open}
    //   enterDelay={0}
    //   leaveDelay={200}
    //   className='pl-40'
    //   title={
    //     <React.Fragment>
    //       <ul className='w-full' ref={wrapperRef}>
    //         {item === 'trs' ? (
    //           <li
    //             onClick={() => {
    //               if (
    //                 window.location.href !==
    //                 window.location.protocol +
    //                   '//' +
    //                   window.location.host +
    //                   '/controlmovimiento'
    //               ) {
    //                 navigate('/controlmovimiento')
    //               }
    //             }}
    //             className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'
    //           >
    //             <p className='text-sm my-1 ml-3 '>Control de movimiento</p>
    //           </li>
    //         ) : null}

    //         <li
    //           onClick={() => {
    //             if (
    //               window.location.href !==
    //               window.location.protocol +
    //                 '//' +
    //                 window.location.host +
    //                 '/historialmovimiento'
    //             ) {
    //               navigate('/historialmovimiento')
    //             }
    //           }}
    //           className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'
    //         >
    //           <p className='text-sm my-1 ml-3 '>
    //             Historial Control de movimiento
    //           </p>
    //         </li>
    //         {item === 'trs' ? (
    //           <li className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'>
    //             <p className='text-sm my-1 ml-3 '>
    //               Entrega y recepción de turno
    //             </p>
    //           </li>
    //         ) : null}

    //         <li
    //           onClick={() => {
    //             if (
    //               window.location.href !==
    //               window.location.protocol +
    //                 '//' +
    //                 window.location.host +
    //                 '/recepcionturno'
    //             ) {
    //               navigate('/recepcionturno')
    //             }
    //           }}
    //           className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'
    //         >
    //           <p className='text-sm my-1 ml-3 mr-3'>
    //             Historial Entrega y recepción de Turno
    //           </p>
    //         </li>
    //       </ul>
    //     </React.Fragment>
    //   }
    // >
    //   <div className='flex space-x-2' onClick={() => toogleTooltip()}>
    //     <div>
    //       <svg
    //         width='22'
    //         height='24'
    //         viewBox='0 0 27 21'
    //         fill='none'
    //         xmlns='http://www.w3.org/2000/svg'
    //       >
    //         <path
    //           d='M25.3967 8.9375H24.1488L21.1493 4.07266C20.9984 3.82388 20.779 3.61668 20.5137 3.47217C20.2483 3.32765 19.9464 3.25099 19.6387 3.25H6.63379C6.32609 3.25099 6.02416 3.32765 5.75879 3.47217C5.49342 3.61668 5.27408 3.82388 5.12313 4.07266L2.12369 8.9375H0.875749C0.643486 8.9375 0.420735 9.0231 0.256501 9.17548C0.0922661 9.32785 0 9.53451 0 9.75C0 9.96549 0.0922661 10.1722 0.256501 10.3245C0.420735 10.4769 0.643486 10.5625 0.875749 10.5625H1.7515V18.6875C1.7515 19.1185 1.93603 19.5318 2.2645 19.8365C2.59297 20.1413 3.03847 20.3125 3.50299 20.3125H6.13024C6.59477 20.3125 7.04027 20.1413 7.36873 19.8365C7.6972 19.5318 7.88174 19.1185 7.88174 18.6875V17.0625H18.3907V18.6875C18.3907 19.1185 18.5753 19.5318 18.9037 19.8365C19.2322 20.1413 19.6777 20.3125 20.1422 20.3125H22.7695C23.234 20.3125 23.6795 20.1413 24.008 19.8365C24.3364 19.5318 24.521 19.1185 24.521 18.6875V10.5625H25.3967C25.629 10.5625 25.8517 10.4769 26.016 10.3245C26.1802 10.1722 26.2725 9.96549 26.2725 9.75C26.2725 9.53451 26.1802 9.32785 26.016 9.17548C25.8517 9.0231 25.629 8.9375 25.3967 8.9375ZM6.63379 4.875H19.6387L22.1345 8.9375H4.13791L6.63379 4.875ZM6.13024 18.6875H3.50299V17.0625H6.13024V18.6875ZM20.1422 18.6875V17.0625H22.7695V18.6875H20.1422ZM22.7695 15.4375H3.50299V10.5625H22.7695V15.4375ZM5.25449 13C5.25449 12.7845 5.34676 12.5778 5.51099 12.4255C5.67523 12.2731 5.89798 12.1875 6.13024 12.1875H7.88174C8.114 12.1875 8.33675 12.2731 8.50098 12.4255C8.66522 12.5778 8.75749 12.7845 8.75749 13C8.75749 13.2155 8.66522 13.4222 8.50098 13.5745C8.33675 13.7269 8.114 13.8125 7.88174 13.8125H6.13024C5.89798 13.8125 5.67523 13.7269 5.51099 13.5745C5.34676 13.4222 5.25449 13.2155 5.25449 13ZM17.515 13C17.515 12.7845 17.6072 12.5778 17.7715 12.4255C17.9357 12.2731 18.1585 12.1875 18.3907 12.1875H20.1422C20.3745 12.1875 20.5972 12.2731 20.7615 12.4255C20.9257 12.5778 21.018 12.7845 21.018 13C21.018 13.2155 20.9257 13.4222 20.7615 13.5745C20.5972 13.7269 20.3745 13.8125 20.1422 13.8125H18.3907C18.1585 13.8125 17.9357 13.7269 17.7715 13.5745C17.6072 13.4222 17.515 13.2155 17.515 13ZM9.63323 0.8125C9.63323 0.597012 9.7255 0.390349 9.88973 0.237976C10.054 0.0856024 10.2767 0 10.509 0H15.7635C15.9957 0 16.2185 0.0856024 16.3827 0.237976C16.547 0.390349 16.6392 0.597012 16.6392 0.8125C16.6392 1.02799 16.547 1.23465 16.3827 1.38702C16.2185 1.5394 15.9957 1.625 15.7635 1.625H10.509C10.2767 1.625 10.054 1.5394 9.88973 1.38702C9.7255 1.23465 9.63323 1.02799 9.63323 0.8125Z'
    //           fill='#26346E'
    //         />
    //       </svg>
    //     </div>
    //     <h2 className='text-base font-semibold text-gray-500'>TRS</h2>
    //     <ICONS.ChevronDownIconO className='h-3 mt-2' />
    //   </div>
    // </HtmlTooltip>
  )
}

export default TRS
