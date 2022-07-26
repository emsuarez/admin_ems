import React, { useRef, useState } from 'react';
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
      maxWidth: 620,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));


const Usuarios=({item})=>{

  const navigate = useNavigate()

  const [open,setOpen] = useState(false)
  const [subopen,setSubOpen] = useState(false)


  const wrapperRef = useRef(null);
  ClickOutSide(wrapperRef,setOpen);


  const toogleTooltip=()=>{
    setOpen(!open)
  }
  const toogleSubTooltip=()=>{
    setSubOpen(!subopen)
    open==false&&setSubOpen(false)
  }


    return(
        <HtmlTooltip
        open={open}
        enterDelay={0} leaveDelay={200}
        title={
          <React.Fragment>
            <ul className=" w-80 space-y-4" ref={wrapperRef}>
                
                <li  className="flex space-x-4 hover:border-l-4 border-blue-500 hover:cursor-pointer hover:bg-slate-200 h-10 ">
                    {/* <ICONS.PencilAltIconS className="h-4 mt-3 ml-3" color="blue"/> */}
                    <p className="text-sm  mt-3 ml-3">Administrar</p>
                </li>

                
            </ul>
          </React.Fragment>
        }
      >


        <div  onClick={()=>toogleTooltip()}  className="flex border-blue-500  hover:border-b-4 hover:cursor-pointer 
              space-x-2 p-3 -mt-1 md:mt-0">
            <ICONS.CollectionIconO className="md:h-7 h-5 mt-[1.5px] md:mt-0"/>
            <h2 className="md:text-xl  ">USUARIOS</h2>
            <ICONS.ChevronDownIconO className="h-3 mt-2"/>
        </div>


      </HtmlTooltip>
    )
}

export default Usuarios