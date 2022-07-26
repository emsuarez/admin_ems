import React, { useState,useRef,useEffect } from 'react';
import { ICONS } from '../constants';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { ClickOutSide } from '../clickOutside/ClickOutSide';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'white',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));







const Recursos=()=>{

let navigate = useNavigate()

  const [open,setOpen] = useState(false)

const wrapperRef = useRef(null);
  ClickOutSide(wrapperRef,setOpen);


  const toogleTooltip=()=>{
    setOpen(!open)
  }



    return(
        <HtmlTooltip
        
        open={open}
        onClick={()=>toogleTooltip()}   
        enterDelay={0} leaveDelay={200}
        title={
          <React.Fragment>
            <ul className=" w-44 space-y-4" ref={wrapperRef}>
                
                <li onClick={()=>{
                  if(window.location.href!==window.location.protocol + '//' + window.location.host+"/ejecutivos")
                  {
                  navigate('/ejecutivos')
                  }
                }} className="flex space-x-4 hover:border-l-4 border-blue-500  hover:cursor-pointer 
                  hover:bg-slate-200 h-10 ">
                    {/* <ICONS.PencilAltIconS className="h-4 mt-3 ml-3" color="blue"/> */}
                    <p className="text-sm mt-3 ml-3">Ejecutivos</p>
                </li>
                
                <li onClick={()=>{
                 if(window.location.href!==window.location.protocol + '//' + window.location.host+"/grupofamiliar")
                 { 
                  navigate('/grupofamiliar')
                 }
                }} className="flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200 h-10 ">
                    {/* <ICONS.LogoutIconO className="h-4 mt-3 ml-3" color="blue"/> */}
                    <p className="text-sm mt-3 ml-3">Grupo Familiar</p>
                </li>

                <li onClick={()=>{
                  if(window.location.href!==window.location.protocol + '//' + window.location.host+"/vehiculosejecutivos")
                  {
                  navigate('/vehiculosejecutivos')
                  }
                }} className="flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200 h-10 ">
                    {/* <ICONS.LogoutIconO className="h-4 mt-3 ml-3" color="blue"/> */}
                    <p className="text-sm mt-3 ml-3">Vehículos de Ejecutivos</p>
                </li>

                <li onClick={()=>{
                  if(window.location.href!==window.location.protocol + '//' + window.location.host+"/protectores")
                  {
                  navigate('/protectores')
                  }
                }} className="flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200 h-10 ">
                    {/* <ICONS.LogoutIconO className="h-4 mt-3 ml-3" color="blue"/> */}
                    <p className="text-sm mt-3 ml-3">Protectores</p>
                </li>
                
                <li onClick={()=>{
                  if(window.location.href!==window.location.protocol + '//' + window.location.host+"/vehiculosprotectores")
                  {
                  navigate('/vehiculosprotectores')
                  }
                }} className="flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200 h-10 ">
                    {/* <ICONS.LogoutIconO className="h-4 mt-3 ml-3" color="blue"/> */}
                    <p className="text-sm mt-3 ml-3">Vehículos de Protectores</p>
                </li>

                <li onClick={()=>{
                  if(window.location.href!==window.location.protocol + '//' + window.location.host+"/lugares")
                  {
                  navigate('/lugares')
                  }
                }} className="flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200 h-10 ">
                    {/* <ICONS.LogoutIconO className="h-4 mt-3 ml-3" color="blue"/> */}
                    <p className="text-sm mt-3 ml-3">Lugares</p>
                </li>

            </ul>
          </React.Fragment>
        }
      >
        <div 
          className="flex border-blue-500  hover:border-b-4  hover:cursor-pointer
            space-x-2 p-3 -mt-1 md:mt-0 ">
            <ICONS.UserGroupIconO className="md:h-7 h-5 mt-[1.5px] md:mt-0"/>
            <h2 className="md:text-xl">Recursos</h2>
            <ICONS.ChevronDownIconO className="h-3 mt-2"/>
        </div>
      </HtmlTooltip>
    )
}

export default Recursos