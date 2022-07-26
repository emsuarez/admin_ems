import React from 'react';
import { ICONS } from '../constants';
import user from '../../assets/user.jpg'
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import 'reactjs-popup/dist/index.css';








const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));






const RightImage=({handleModal})=>{


const handleLogout=()=>{
  window.localStorage.clear()
  handleModal()
}
  
    return(
        <HtmlTooltip
        // disableTouchListener
        enterDelay={0} leaveDelay={200}
        title={
          <React.Fragment>
            <ul className=" w-44 space-y-4">
                
                <li className="flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200 h-10 ">
                    <ICONS.PencilAltIconS className="h-4 mt-3 ml-3" color="blue"/>
                    <p className="text-sm mt-3 ml-3">Perfil</p>
                </li>
                
                <li onClick={()=>handleLogout()} className="flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200 h-10 ">
                    <ICONS.LogoutIconO className="h-4 mt-3 ml-3" color="blue"/>
                    <p className="text-sm mt-3 ml-3">Cerrar sesión</p>
                </li>
                

            </ul>
          </React.Fragment>
        }
      >
        <div className="flex hover:cursor-pointer">
        <div className="border-2 rounded-full border-blue-300 h-14 ">
                 <img src={user} className="h-12 rounded-full mt-0.5"/>
            </div>
            
            <div className="flex ml-4 mt-4">
             <p className="hidden md:inline-block text-blue-500 ">Katherine</p>
             <ICONS.ChevronDownIconO className="h-3 w-3 hidden mt-2 ml-0.5 text-blue-500 md:inline-block"/>
            </div>
    
        </div>
      </HtmlTooltip>
    )
}

export default RightImage