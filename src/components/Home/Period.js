import React, { useRef, useState } from 'react';
import { ICONS } from '../constants';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
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


const Period=()=>{


  const [open,setOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("Ultimo Día")

  const wrapperRef = useRef(null);
  ClickOutSide(wrapperRef,setOpen);

  const toogleTooltip=()=>{
    setOpen(!open)
  }

  const handlePeriod = (item) =>{
      setSelectedPeriod(item)
  }


    return(
        <HtmlTooltip
        open={open}
        enterDelay={0} leaveDelay={200}
        title={
          <React.Fragment>
            <ul className=" w-40 space-y-4" useRef={wrapperRef}>
                
                <li onClick={()=>{
                    handlePeriod("Hoy dia")
                    toogleTooltip()
                }
                } className="flex space-x-4 hover:cursor-pointer hover:bg-slate-200 h-10 ">
                    <p className="text-sm  mt-3 ml-3">Hoy dia</p>
                </li>

                <li onClick={()=>{
                    handlePeriod("Ultimo Día")
                    toogleTooltip()
                }
                } className="flex space-x-4 hover:cursor-pointer hover:bg-slate-200 h-10 ">
                    <p className="text-sm  mt-3 ml-3">Ultimo Día</p>
                </li>
                
            </ul>
          </React.Fragment>
        }
      >


        <div onClick={()=>toogleTooltip()}
             className="ml-72 justify-end pr-20 flex mt-20 hover:cursor-pointer">
            <h3 className="text-xs text-gray-600">{selectedPeriod}</h3>
            <ICONS.ChevronDownIconO className="h-3 ml-1 mt-0.5 text-gray-600"/>
        </div>


      </HtmlTooltip>
    )
}

export default Period