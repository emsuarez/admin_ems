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

const Usuarios = ({ item }) => {
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
          <ul className='w-32' ref={wrapperRef}>
            <li className='flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200 h-10 '>
              {/* <ICONS.PencilAltIconS className="h-4 mt-3 ml-3" color="blue"/> */}
              <p className='text-sm  mt-3 ml-3'>Administrar</p>
            </li>
          </ul>
        </React.Fragment>
      }
    >
      <div onClick={() => toogleTooltip()} className='flex space-x-2'>
        <div className=''>
          <svg
            width='22'
            height='24'
            viewBox='0 0 24 26'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0.642352 25.2119C0.308575 25.0636 0.18424 24.8121 0.187565 24.449C0.200198 22.9586 0.174932 21.4675 0.196873 19.9771C0.234772 17.406 1.37905 15.4455 3.5998 14.1035C3.73012 14.0247 3.78663 13.9446 3.77666 13.7949C3.76669 13.6406 3.76469 13.4804 3.79528 13.3301C3.87639 12.9342 4.21881 12.6558 4.65764 12.6479C5.34581 12.6348 6.03464 12.64 6.7228 12.6472C7.00006 12.6499 7.2627 12.7431 7.40964 12.9801C7.52666 13.1699 7.67028 13.1988 7.86177 13.185C7.97613 13.1764 8.09182 13.1837 8.24076 13.1837C8.24076 12.7497 8.24541 12.3347 8.23544 11.9204C8.23411 11.8594 8.16762 11.793 8.11908 11.7412C7.63038 11.2225 7.2853 10.6224 7.08384 9.94416C7.04262 9.80628 6.98145 9.75178 6.8365 9.72421C6.08052 9.58173 5.5353 8.93764 5.52068 8.17931C5.5127 7.76173 5.51469 7.34416 5.51935 6.92592C5.52467 6.44795 5.80991 6.06911 6.27666 5.95421C6.43889 5.91416 6.46217 5.84062 6.4615 5.70143C6.45751 4.68572 6.45419 3.67002 6.46084 2.65431C6.47081 1.1488 7.61443 0.0392076 9.1357 0.0483995C9.4256 0.0503692 9.57719 0.164612 9.58717 0.39047C9.5978 0.625521 9.44155 0.779157 9.14235 0.764713C8.26004 0.723349 7.40964 1.30835 7.2381 2.20653C7.149 2.67401 7.18092 3.16446 7.15764 3.66345C8.20951 3.66345 9.21682 3.66345 10.2541 3.66345C10.2221 3.59582 10.1962 3.53214 10.1636 3.47173C9.57586 2.3687 10.0486 1.38845 11.2973 1.20921C11.6955 1.15209 12.133 1.18688 12.5233 1.28997C13.4136 1.52502 13.792 2.36936 13.4382 3.21042C13.3757 3.3588 13.2999 3.50128 13.2195 3.66673C14.2527 3.66673 15.2594 3.66673 16.2986 3.66673C16.2826 3.11653 16.3724 2.56699 16.2009 2.0332C15.9575 1.27683 15.2634 0.779157 14.4296 0.771278C13.3511 0.76143 12.2733 0.768652 11.1949 0.767995C11.1118 0.767995 11.028 0.771278 10.9462 0.762086C10.7182 0.735167 10.5865 0.595319 10.5932 0.393753C10.5991 0.196783 10.7447 0.0575914 10.9695 0.0497126C11.1763 0.0424904 11.3844 0.0477429 11.5918 0.0477429C12.4874 0.0477429 13.3837 0.0470864 14.2793 0.0477429C15.9223 0.0490561 17.018 1.1337 17.02 2.76199C17.0213 3.80199 17.02 4.84133 17.02 5.87148C17.0473 5.89052 17.0592 5.90497 17.0745 5.9089C17.8638 6.10325 18.0692 6.36062 18.0685 7.15966C18.0685 7.49517 18.0739 7.83133 18.0659 8.16683C18.0473 8.97704 17.4741 9.62375 16.665 9.7334C16.4974 9.75638 16.4283 9.82204 16.3824 9.97633C16.1869 10.6395 15.8378 11.2179 15.3731 11.7333C15.2993 11.8154 15.2467 11.9441 15.2421 12.0537C15.2261 12.4194 15.2361 12.7864 15.2361 13.1804C15.4529 13.1804 15.6417 13.1896 15.8292 13.1751C15.8884 13.1705 15.9595 13.1141 15.9947 13.0615C16.1862 12.7766 16.4582 12.6453 16.7939 12.6433C17.4575 12.6387 18.1211 12.6341 18.7846 12.644C19.3498 12.6525 19.7221 13.0215 19.6982 13.5842C19.6849 13.8941 19.7846 14.0575 20.0572 14.2164C20.4322 14.4351 20.7667 14.7246 21.1064 14.9984C21.2986 15.1533 21.3099 15.3858 21.1643 15.5381C21.0213 15.6871 20.8185 15.6845 20.6297 15.5328C20.3431 15.3024 20.0553 15.0732 19.7235 14.8073C19.7235 17.1651 19.7235 19.4519 19.7235 21.7551C20.6576 21.7551 21.5905 21.7551 22.5233 21.7551C22.5326 21.7426 22.5506 21.7302 22.5506 21.7177C22.5506 20.4847 22.6849 19.2392 22.2467 18.0449C22.1038 17.6549 21.9136 17.28 21.7328 16.9044C21.6078 16.6451 21.6264 16.4579 21.8172 16.345C22.0134 16.2288 22.2228 16.3043 22.3678 16.5525C22.9422 17.5354 23.266 18.5957 23.2806 19.7296C23.3013 21.3349 23.284 22.9402 23.29 24.5455C23.2913 24.8791 23.1191 25.0754 22.8378 25.2106C18.01 25.2106 13.1822 25.2106 8.35512 25.2106C8.28996 25.1299 8.2002 25.0576 8.16496 24.9657C8.06655 24.7083 8.25738 24.4937 8.58916 24.4917C9.41828 24.4864 10.2474 24.4904 11.0765 24.4891C11.1723 24.4891 11.2674 24.4799 11.381 24.474C11.381 24.3591 11.381 24.2704 11.381 24.1811C11.381 23.1825 11.3744 22.1832 11.385 21.1846C11.3877 20.9134 11.3279 20.7276 11.1084 20.5195C10.014 19.4827 8.94887 18.4145 7.88371 17.3476C7.38238 16.8453 7.04262 16.2373 6.96416 15.5355C6.89435 14.9117 6.90897 14.2788 6.89767 13.6492C6.89368 13.4417 6.82187 13.357 6.60312 13.3609C6.01469 13.3714 5.4256 13.3642 4.83717 13.3649C4.51203 13.3649 4.49209 13.3852 4.49209 13.7181C4.49142 15.2328 4.49142 16.7475 4.49209 18.2622C4.49209 18.3416 4.50006 18.4217 4.50405 18.5058C4.85113 18.5058 5.17759 18.5058 5.52068 18.5058C5.52068 18.4007 5.52068 18.3114 5.52068 18.2228C5.52068 17.6168 5.51735 17.0108 5.52267 16.4054C5.52467 16.1631 5.66429 16.018 5.87573 16.0134C6.09049 16.0089 6.22945 16.1461 6.25006 16.387C6.25538 16.452 6.25206 16.5177 6.25206 16.5833C6.25206 17.1644 6.25671 17.7461 6.24873 18.3272C6.24674 18.4795 6.2853 18.5511 6.44488 18.6043C7.02666 18.7979 7.40166 19.3042 7.40565 19.9043C7.41363 21.2141 7.41363 22.5246 7.40499 23.8345C7.401 24.4247 7.02533 24.9184 6.46283 25.1253C6.39501 25.1502 6.33052 25.1824 6.26469 25.2113C4.39169 25.2119 2.51735 25.2119 0.642352 25.2119ZM18.9888 24.4746C18.9888 24.3709 18.9888 24.275 18.9888 24.1792C18.9888 22.3198 18.9888 20.461 18.9888 18.6016C18.9888 16.9635 18.9894 15.3254 18.9881 13.6872C18.9881 13.3918 18.9595 13.3662 18.6603 13.3655C18.0799 13.3649 17.4994 13.3649 16.9183 13.3655C16.6084 13.3662 16.5865 13.3878 16.5858 13.7069C16.5845 14.0917 16.5852 14.4771 16.5852 14.8618C16.5858 15.8894 16.2068 16.7573 15.4708 17.4809C14.4715 18.4631 13.4775 19.4506 12.4795 20.4341C12.4037 20.509 12.3072 20.5667 12.2428 20.6495C12.1796 20.7302 12.1058 20.8326 12.1045 20.9259C12.0951 22.0394 12.0985 23.1536 12.0991 24.2671C12.0991 24.3308 12.1078 24.3945 12.1138 24.4733C14.403 24.4746 16.6796 24.4746 18.9888 24.4746ZM15.9063 7.62188C15.7813 7.60219 15.7088 7.58643 15.6357 7.57986C14.905 7.51552 14.2255 7.29098 13.6064 6.90754C12.3564 6.13279 11.1184 6.13279 9.87108 6.91148C9.35512 7.2332 8.78996 7.44067 8.18491 7.53653C7.99873 7.56608 7.8119 7.5884 7.61243 7.61598C7.61243 7.96724 7.60911 8.30209 7.6131 8.63694C7.62639 9.72946 8.02267 10.6638 8.81988 11.4227C9.32121 11.8994 9.83384 12.3649 10.3505 12.8252C11.1902 13.5737 12.2939 13.5717 13.1364 12.8212C13.647 12.3662 14.151 11.9033 14.6497 11.4365C15.2434 10.8804 15.6543 10.2088 15.7773 9.4084C15.8678 8.82209 15.8664 8.22264 15.9063 7.62188ZM7.61509 13.9151C7.61509 14.221 7.61775 14.4988 7.61443 14.7765C7.60578 15.6392 7.90765 16.3726 8.52932 16.9825C9.52932 17.9641 10.526 18.9483 11.5167 19.9384C11.6849 20.1065 11.7986 20.1039 11.9655 19.9377C12.9568 18.9476 13.9469 17.9562 14.9555 16.9839C15.8478 16.1231 15.9429 15.0562 15.8445 13.9243C15.6404 13.9243 15.4469 13.9243 15.2467 13.9243C15.2414 13.9912 15.2374 14.0392 15.2341 14.0871C15.153 15.4508 14.2055 16.5289 12.8312 16.7265C12.2461 16.8105 11.6397 16.7711 11.0433 16.7626C9.67161 16.7436 8.55459 15.8099 8.29195 14.4751C8.25605 14.2932 8.24608 14.1061 8.22281 13.9151C8.02267 13.9151 7.83451 13.9151 7.61509 13.9151ZM2.64634 21.8608C2.64634 22.4662 2.64501 23.0715 2.64701 23.6769C2.64834 24.2468 2.88903 24.4891 3.45685 24.4904C4.2607 24.4923 5.06389 24.4923 5.86775 24.4904C6.41695 24.4884 6.68025 24.2356 6.68158 23.6992C6.68491 22.48 6.68491 21.2614 6.68158 20.0421C6.68025 19.5018 6.42094 19.2385 5.87772 19.2339C5.06589 19.2273 4.25405 19.2287 3.44222 19.2332C2.90432 19.2365 2.65033 19.4906 2.64767 20.0192C2.64368 20.6337 2.64634 21.2469 2.64634 21.8608ZM9.04661 4.39027C8.4994 4.39027 7.95286 4.39552 7.40565 4.38699C7.23743 4.38436 7.17294 4.42901 7.1756 4.60562C7.18491 5.26022 7.17759 5.91481 7.18025 6.56941C7.18092 6.8537 7.22147 6.8885 7.51935 6.88259C8.30392 6.86749 9.00605 6.60421 9.66629 6.20108C10.4382 5.73032 11.2767 5.54057 12.1842 5.63971C12.8245 5.70931 13.3983 5.93976 13.9402 6.27133C14.5646 6.65411 15.2428 6.86486 15.9821 6.88719C16.2228 6.89441 16.3086 6.80577 16.3059 6.57466C16.2979 5.92795 16.2966 5.28188 16.3072 4.63517C16.3106 4.44279 16.2554 4.38305 16.0566 4.38567C15.137 4.39552 14.2162 4.408 13.2973 4.38173C12.8757 4.36991 12.5493 4.43294 12.2687 4.79209C12.0021 5.13284 11.5007 5.09739 11.1896 4.78618C11.1084 4.70476 11.0446 4.60168 10.9529 4.53603C10.8611 4.46971 10.7447 4.39946 10.6377 4.39683C10.1078 4.38239 9.57719 4.39027 9.04661 4.39027ZM8.98145 12.5533C8.98145 13.1383 8.93557 13.6721 8.99142 14.1961C9.10046 15.2236 9.86243 15.955 10.9043 16.0351C11.4888 16.0798 12.0845 16.0804 12.6663 16.0213C13.5386 15.9327 14.1271 15.4258 14.4057 14.6117C14.6297 13.9571 14.4861 13.2729 14.528 12.5284C14.2029 12.8252 13.9369 13.0668 13.6716 13.3091C12.524 14.3576 10.9628 14.3602 9.81722 13.3143C9.54993 13.0714 9.28264 12.8278 8.98145 12.5533ZM3.7627 14.8454C3.65432 14.9137 3.57719 14.9577 3.50472 15.0082C2.50804 15.7108 1.78996 16.626 1.33052 17.7481C0.803256 19.0356 0.922937 20.3822 0.930251 21.7197C0.930251 21.7321 0.948203 21.744 0.956182 21.7545C1.276 21.7545 1.59381 21.7545 1.92892 21.7545C1.92892 21.1563 1.92759 20.5772 1.92959 19.9975C1.93291 19.0914 2.50272 18.5268 3.41496 18.5235C3.52799 18.5228 3.64036 18.5235 3.76336 18.5235C3.7627 17.2918 3.7627 16.0916 3.7627 14.8454ZM19.7235 24.47C20.6749 24.47 21.6118 24.47 22.5486 24.47C22.5486 23.8069 22.5486 23.1654 22.5486 22.518C21.5965 22.518 20.6603 22.518 19.7235 22.518C19.7235 23.1805 19.7235 23.8226 19.7235 24.47ZM11.7414 4.31805C12.159 3.87552 12.5533 3.44875 12.7833 2.90577C12.9575 2.49476 12.77 2.10673 12.3392 1.97017C11.9429 1.84476 11.5393 1.84476 11.143 1.97017C10.7122 2.10673 10.5253 2.49411 10.6995 2.90577C10.9283 3.4481 11.3232 3.87552 11.7414 4.31805ZM0.925597 24.4772C1.31788 24.4772 1.68557 24.4772 1.9881 24.4772C1.95884 23.8154 1.93025 23.1641 1.90166 22.5174C1.56788 22.5174 1.25006 22.5174 0.925597 22.5174C0.925597 23.174 0.925597 23.8095 0.925597 24.4772ZM17.032 6.63244C17.0213 6.96204 16.9143 7.22466 16.665 7.4236C16.6271 7.45446 16.5985 7.52012 16.5985 7.57002C16.5938 8.04865 16.5958 8.52729 16.5958 9.00724C17.0326 8.93764 17.3292 8.61527 17.3485 8.16027C17.3651 7.76108 17.3558 7.36057 17.3518 6.96072C17.3491 6.77688 17.266 6.65214 17.032 6.63244ZM6.44621 6.66658C6.4256 6.66133 6.40432 6.65542 6.38371 6.65017C6.3385 6.74274 6.25605 6.83401 6.25405 6.92724C6.24342 7.36845 6.23876 7.81032 6.26203 8.25087C6.28131 8.61855 6.54461 8.89759 6.8877 8.9731C6.8877 8.5089 6.88969 8.04471 6.88504 7.58118C6.88437 7.52997 6.86243 7.46037 6.8252 7.43148C6.57586 7.23582 6.46815 6.97385 6.44621 6.66658Z'
              fill='#26346E'
            />
          </svg>
        </div>
        <h2 className='text-base font-semibold text-gray-500'>USUARIOS</h2>
        <ICONS.ChevronDownIconO className='h-3 mt-2 ' />
      </div>
    </HtmlTooltip>
  )
}

export default Usuarios
