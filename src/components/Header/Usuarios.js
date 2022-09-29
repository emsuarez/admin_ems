import { Button, Menu, MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Icon from '../../assets/Icon'
import { ICONS } from '../constants'

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

const Usuarios = ({ item }) => {
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
            <Icon svgName='ib_usuariomenu' className='h-5' />
          </div>

          <h2 className='text-sm font-semibold text-gray-500'>Usuarios</h2>
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
                '/usuarios'
            ) {
              navigate('/usuarios')
            }
          }}
        >
          <div className='flex hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'>
            <p className='text-sm mx-3'>Administrar</p>
          </div>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default Usuarios
