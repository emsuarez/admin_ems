import { Button, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Icon from '../../assets/Icon'
import { ICONS } from '../constants'

const Recursos = ({ item }) => {
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
            <Icon svgName='ib_recursos' className='h-5' />
          </div>

          <h2 className='text-sm font-semibold text-gray-500'>Recursos</h2>
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
        <MenuItem
          onClick={() => {
            if (
              window.location.href !==
              window.location.protocol +
                '//' +
                window.location.host +
                '/ejecutivos'
            ) {
              navigate('/ejecutivos')
            }
          }}
        >
          <div className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'>
            <p className='text-sm mx-3'>Ejecutivos</p>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (
              window.location.href !==
              window.location.protocol +
                '//' +
                window.location.host +
                '/grupofamiliar'
            ) {
              navigate('/grupofamiliar')
            }
          }}
        >
          <div className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'>
            <p className='text-sm mx-3'>Grupo Familiar</p>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (
              window.location.href !==
              window.location.protocol +
                '//' +
                window.location.host +
                '/vehiculosejecutivos'
            ) {
              navigate('/vehiculosejecutivos')
            }
          }}
        >
          <div className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'>
            <p className='text-sm mx-3'>Vehículos de Ejecutivos</p>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (
              window.location.href !==
              window.location.protocol +
                '//' +
                window.location.host +
                '/protectores'
            ) {
              navigate('/protectores')
            }
          }}
        >
          <div className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'>
            <p className='text-sm mx-3'>Protectores</p>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (
              window.location.href !==
              window.location.protocol +
                '//' +
                window.location.host +
                '/vehiculosprotectores'
            ) {
              navigate('/vehiculosprotectores')
            }
          }}
        >
          <div className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'>
            <p className='text-sm mx-3'>Vehículos de Protectores</p>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (
              window.location.href !==
              window.location.protocol +
                '//' +
                window.location.host +
                '/lugares'
            ) {
              navigate('/lugares')
            }
          }}
        >
          <div className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'>
            <p className='text-sm mx-3'>Lugares</p>
          </div>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default Recursos
