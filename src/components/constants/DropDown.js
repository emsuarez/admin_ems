import React, { useState } from 'react';
import { ICONS } from '../constants';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

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


const DropDown=()=>{


  const [open,setOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("TR2")

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
            <ul className=" w-40 space-y-4">
                
                <li onClick={()=>{
                    setSelectedPeriod("TR2")
                    toogleTooltip()
                }
                } className="flex space-x-4 hover:cursor-pointer hover:bg-slate-200 h-10 ">
                    <p className="text-sm  mt-3 ml-3">TR2</p>
                </li>

                <li onClick={()=>{
                    setSelectedPeriod("TR1")
                    toogleTooltip()
                }
                } className="flex space-x-4 hover:cursor-pointer hover:bg-slate-200 h-10 ">
                    <p className="text-sm  mt-3 ml-3">TR1</p>
                </li>
                
            </ul>
          </React.Fragment>
        }
      >


        <div onClick={()=>toogleTooltip()}
             className="w-1/2 justify-center flex mt-20 hover:cursor-pointer border-[1px] rounded-md">
            <h3 className=" text-gray-600 pl-2 py-1 text-lg">{selectedPeriod}</h3>
            <ICONS.ChevronDownIconO className="h-3.5 ml-1 mt-3 text-gray-600"/>
        </div>


      </HtmlTooltip>
    )
}

export default DropDown