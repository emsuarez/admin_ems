import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import { ICONS } from "../constants";
import Period from "./Period";

const Piechart = () =>{
    return(
        <div className="h-[100vh] md:h-[85vh] w-[90vh] bg-white  shadow-sm border-[1px] ">
        <h3 className=" px-5 pt-5 font-semibold">CONSIGNAS PENDIENTES TRS Y CCTV</h3>
        
        <Period/>
        
        <div className=" mt-20">

            <PieChart
                data={[
                    { title: 'CCTV', value: 46, color: '#1A84E7' },
                    { title: 'TRS', value: 60, color: '#21B739' }
                    
                  ]}
                  className="h-[25vh] "
            />
        </div>

        <div className="flex mt-24  space-x-8 justify-center">
                  
                  <div className=" flex ">
                      <div className="h-3 w-3 bg-[#1A84E7] rounded-full mt-2 m-2"></div>
                      <p>TRS</p>
                  </div>

                  <div className=" flex">
                      <div className="h-3 w-3 bg-[#21B739] rounded-full mt-2 m-2"></div>
                      <p>CCTV</p>
                  </div>

        </div>

        </div>
    )
}

export default Piechart