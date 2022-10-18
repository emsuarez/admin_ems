import { Button, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Icon from '../../assets/Icon'
import { setToast } from '../../store/actions'
import {
  getInformeTrs,
  getNovedadesConsignasTrsPendientes,
  postInformeTrs,
} from '../../store/actions/InformesAction'
import AlertCrearInforme from '../alerts/AlertCrearInforme'
import { ICONS } from '../constants'

const TRS = ({ item }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [openModalCrearActaDiurna, setOpenModalCrearActaDiurna] =
    useState(false)
  const [openModalCrearActaNocturna, setOpenModalCrearActaNocturna] =
    useState(false)

  const [anchorEl, setAnchorEl] = useState(null)
  const [subMenu, setSubMenu] = useState()

  const idInforme = useSelector(states => states.informes.idInformeCreado)
  const open = Boolean(anchorEl)
  const openSubMenu = Boolean(subMenu)

  const informesTrsControl = useSelector(state => state.informes.informesTrs)
  const { results } = informesTrsControl
  useEffect(() => {
    dispatch(getInformeTrs())
  }, [])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClickSubMenu = event => {
    setSubMenu(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenCrearActaModal = tipo => {
    if (tipo === 1) {
      setOpenModalCrearActaDiurna(true)
    } else if (tipo === 0) {
      setOpenModalCrearActaNocturna(true)
    }
  }

  const handleCloseCrearActaModal = () => {
    setOpenModalCrearActaDiurna(false)
    setOpenModalCrearActaNocturna(false)
  }

  const handleNuevoInformeDiurno = () => {
    if (results[0].turno === 1) {
      dispatch(
        setToast({
          open: true,
          message: 'Ya existe un informe diurno',
          type: 'error',
        })
      )
      setOpenModalCrearActaDiurna(false)
      return
    }
    dispatch(postInformeTrs(1))
    setOpenModalCrearActaDiurna(false)
    dispatch(getNovedadesConsignasTrsPendientes())

    navigate('/editrecepcion', { state: idInforme })
  }
  const handleNuevoInformeNocturno = () => {
    if (results[0].turno === 0) {
      dispatch(setToast('error', 'Ya existe un informe nocturno'))
      setOpenModalCrearActaNocturna(false)
      return
    }

    dispatch(postInformeTrs(0))
    setOpenModalCrearActaNocturna(false)

    navigate('/editrecepcion', { state: idInforme })
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
        className='-ml-4 mt-1.5'
      >
        {item === 'trs' && (
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
        )}
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
              <MenuItem onClick={() => handleOpenCrearActaModal(1)}>
                Diurno
              </MenuItem>
              <MenuItem onClick={() => handleOpenCrearActaModal(0)}>
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
      <AlertCrearInforme
        tituloModal={'Inicio de Acta, jornada Diurna'}
        descripcionModal={
          'En este momento va a iniciar la Acta entrega recepción de la jornada Diurna, esta usted de acuerdo.'
        }
        openModal={openModalCrearActaDiurna}
        handleClose={handleCloseCrearActaModal}
        handleAction={handleNuevoInformeDiurno}
      />
      <AlertCrearInforme
        tituloModal={'Inicio de Acta, jornada Nocturna'}
        descripcionModal={
          'En este momento va a iniciar la Acta entrega recepción de la jornada Nocturna, esta usted de acuerdo.'
        }
        openModal={openModalCrearActaNocturna}
        handleClose={handleCloseCrearActaModal}
        handleAction={handleNuevoInformeNocturno}
      />
    </div>
  )
}

export default TRS
