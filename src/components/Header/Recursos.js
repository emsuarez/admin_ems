import React, { useState, useRef, useEffect } from 'react'
import { ICONS } from '../constants'
import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { useNavigate } from 'react-router-dom'
import { ClickOutSide } from '../clickOutside/ClickOutSide'

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement='bottom' />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))

const Recursos = () => {
  let navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const wrapperRef = useRef(null)
  ClickOutSide(wrapperRef, setOpen)

  const toogleTooltip = () => {
    setOpen(!open)
  }

  return (
    <HtmlTooltip
      open={open}
      onClick={() => toogleTooltip()}
      enterDelay={0}
      leaveDelay={200}
      className='pl-8'
      title={
        <React.Fragment>
          <ul className='w-44 mt-0 pt-0' ref={wrapperRef}>
            <li
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
              className='flex space-x-4 hover:border-l-4 border-blue-500  hover:cursor-pointer 
                  hover:bg-slate-200'
            >
              {/* <ICONS.PencilAltIconS className="h-4 mt-3 ml-3" color="blue"/> */}
              <p className='text-sm my-1 ml-3'>Ejecutivos</p>
            </li>

            <li
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
              className='flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'
            >
              {/* <ICONS.LogoutIconO className="h-4 mt-3 ml-3" color="blue"/> */}
              <p className='text-sm my-1 ml-3'>Grupo Familiar</p>
            </li>

            <li
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
              className='flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'
            >
              {/* <ICONS.LogoutIconO className="h-4 mt-3 ml-3" color="blue"/> */}
              <p className='text-sm my-1 ml-3'>Vehículos de Ejecutivos</p>
            </li>

            <li
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
              className='flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'
            >
              {/* <ICONS.LogoutIconO className="h-4 mt-3 ml-3" color="blue"/> */}
              <p className='text-sm my-1 ml-3'>Protectores</p>
            </li>

            <li
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
              className='flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'
            >
              {/* <ICONS.LogoutIconO className="h-4 mt-3 ml-3" color="blue"/> */}
              <p className='text-sm my-1 ml-3'>Vehículos de Protectores</p>
            </li>

            <li
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
              className='flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200'
            >
              {/* <ICONS.LogoutIconO className="h-4 mt-3 ml-3" color="blue"/> */}
              <p className='text-sm my-1 ml-3'>Lugares</p>
            </li>
          </ul>
        </React.Fragment>
      }
    >
      <div onClick={() => toogleTooltip()} className='flex space-x-2'>
        <div>
          <svg
            width='22'
            height='24'
            viewBox='0 0 25 19'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12.532 0.0365062C13.3914 0.0365062 14.2156 0.353256 14.8233 0.917075C15.431 1.48089 15.7724 2.2456 15.7724 3.04296C15.7724 3.84032 15.431 4.60502 14.8233 5.16884C14.2156 5.73266 13.3914 6.04941 12.532 6.04941C11.6723 6.04941 10.8479 5.73258 10.2401 5.16864C9.63223 4.60469 9.29075 3.83982 9.29075 3.04228C9.29075 2.24474 9.63223 1.47987 10.2401 0.915923C10.8479 0.351977 11.6723 0.0351563 12.532 0.0351562V0.0365062ZM12.532 1.38651C12.0584 1.38651 11.6043 1.56102 11.2695 1.87167C10.9347 2.18231 10.7466 2.60364 10.7466 3.04296C10.7466 3.48227 10.9347 3.9036 11.2695 4.21424C11.6043 4.52489 12.0584 4.69941 12.532 4.69941C13.0057 4.69941 13.46 4.52482 13.7949 4.21405C14.1299 3.90327 14.3181 3.48178 14.3181 3.04228C14.3181 2.60278 14.1299 2.18129 13.7949 1.87052C13.46 1.55975 13.0057 1.38516 12.532 1.38516V1.38651ZM2.38853 11.525C2.38853 11.704 2.31188 11.8757 2.17543 12.0023C2.03899 12.1289 1.85394 12.2 1.66098 12.2C1.46803 12.2 1.28297 12.1289 1.14653 12.0023C1.01009 11.8757 0.933438 11.704 0.933438 11.525V8.16891C0.933485 7.83825 1.06433 7.5191 1.30116 7.272C1.53799 7.02491 1.86433 6.86704 2.21828 6.82836L2.38853 6.81891H6.40021C6.18849 7.15785 6.05936 7.5357 6.02189 7.92591L6.01025 8.16891H2.38707V11.525H2.38853ZM23.4495 12.2C23.6425 12.2 23.8275 12.1289 23.964 12.0023C24.1004 11.8757 24.177 11.704 24.177 11.525V8.16891L24.1669 8.01231C24.1255 7.68367 23.9555 7.38058 23.6891 7.16058C23.4228 6.94057 23.0786 6.81899 22.722 6.81891H18.671C18.8834 7.16046 19.0202 7.55196 19.0522 7.96776L19.0595 8.17026H22.722V11.525C22.722 11.704 22.7986 11.8757 22.935 12.0023C23.0715 12.1289 23.2565 12.2 23.4495 12.2ZM16.1508 6.81891C16.5074 6.81899 16.8516 6.94057 17.1179 7.16058C17.3843 7.38058 17.5543 7.68367 17.5957 8.01231L17.6044 8.16891V11.525C17.6044 11.704 17.5278 11.8757 17.3913 12.0023C17.2549 12.1289 17.0698 12.2 16.8769 12.2C16.6839 12.2 16.4988 12.1289 16.3624 12.0023C16.226 11.8757 16.1493 11.704 16.1493 11.525V8.16891H8.92043V11.525C8.92043 11.704 8.84377 11.8757 8.70733 12.0023C8.57089 12.1289 8.38584 12.2 8.19288 12.2C7.99992 12.2 7.81487 12.1289 7.67843 12.0023C7.54199 11.8757 7.46534 11.704 7.46534 11.525V8.16891C7.46538 7.83825 7.59623 7.5191 7.83306 7.272C8.06989 7.02491 8.39623 6.86704 8.75018 6.82836L8.92043 6.81891H16.1493H16.1508ZM22.5735 3.46686C22.5735 2.78174 22.2802 2.12469 21.758 1.64024C21.2359 1.15579 20.5277 0.883631 19.7892 0.883631C19.0508 0.883631 18.3426 1.15579 17.8204 1.64024C17.2983 2.12469 17.0049 2.78174 17.0049 3.46686C17.0049 4.15197 17.2983 4.80902 17.8204 5.29347C18.3426 5.77792 19.0508 6.05008 19.7892 6.05008C20.5277 6.05008 21.2359 5.77792 21.758 5.29347C22.2802 4.80902 22.5735 4.15197 22.5735 3.46686ZM18.46 3.46686C18.46 3.13978 18.6 2.82611 18.8493 2.59483C19.0986 2.36356 19.4367 2.23363 19.7892 2.23363C20.1418 2.23363 20.4798 2.36356 20.7291 2.59483C20.9784 2.82611 21.1184 3.13978 21.1184 3.46686C21.1184 3.79393 20.9784 4.1076 20.7291 4.33888C20.4798 4.57015 20.1418 4.70008 19.7892 4.70008C19.4367 4.70008 19.0986 4.57015 18.8493 4.33888C18.6 4.1076 18.46 3.79393 18.46 3.46686ZM5.29871 0.882956C6.03715 0.882956 6.74535 1.15512 7.26751 1.63957C7.78968 2.12401 8.08302 2.78107 8.08302 3.46618C8.08302 4.1513 7.78968 4.80835 7.26751 5.2928C6.74535 5.77725 6.03715 6.04941 5.29871 6.04941C4.56026 6.04941 3.85206 5.77725 3.3299 5.2928C2.80774 4.80835 2.51439 4.1513 2.51439 3.46618C2.51439 2.78107 2.80774 2.12401 3.3299 1.63957C3.85206 1.15512 4.56026 0.882956 5.29871 0.882956ZM5.29871 2.23296C4.94618 2.23296 4.60808 2.36288 4.3588 2.59416C4.10953 2.82543 3.96948 3.13911 3.96948 3.46618C3.96948 3.79325 4.10953 4.10693 4.3588 4.3382C4.60808 4.56948 4.94618 4.69941 5.29871 4.69941C5.65124 4.69941 5.98933 4.56948 6.23861 4.3382C6.48789 4.10693 6.62793 3.79325 6.62793 3.46618C6.62793 3.13911 6.48789 2.82543 6.23861 2.59416C5.98933 2.36288 5.65124 2.23296 5.29871 2.23296ZM1.6377 13.55C1.44474 13.55 1.25969 13.6211 1.12325 13.7477C0.986808 13.8743 0.910156 14.046 0.910156 14.225V15.575C0.910156 16.4701 1.29342 17.3286 1.97562 17.9615C2.65783 18.5944 3.5831 18.95 4.54788 18.95H20.5539C21.5187 18.95 22.4439 18.5944 23.1261 17.9615C23.8083 17.3286 24.1916 16.4701 24.1916 15.575V14.225C24.1916 14.046 24.1149 13.8743 23.9785 13.7477C23.8421 13.6211 23.657 13.55 23.4641 13.55H1.6377ZM2.36525 15.575V14.9H22.7365V15.575C22.7365 16.1121 22.5065 16.6271 22.0972 17.0069C21.6879 17.3867 21.1327 17.6 20.5539 17.6H4.54788C3.96901 17.6 3.41385 17.3867 3.00453 17.0069C2.5952 16.6271 2.36525 16.1121 2.36525 15.575Z'
              fill='#26346E'
            />
          </svg>
        </div>
        <h2 className='text-base font-semibold text-gray-500'>RECURSOS</h2>
        <ICONS.ChevronDownIconO className='h-3 mt-2' />
      </div>
    </HtmlTooltip>
  )
}

export default Recursos
