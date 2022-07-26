import React from 'react'
import logo from '../../assets/logo.png'
import { ICONS } from '../constants';
import JsPDF from 'jspdf';


const PDFMovimiento = React.forwardRef((props, ref) => {
    const {pdf,setPDF,handlePrint} = props

    const handleCancel=()=>{
        setPDF(false)
    }

    const generatePDF = () => {
        handlePrint();
    }
    return(
        <>
        <div ref={ref} className=' flex flex-col items-center -mt-[80vh] ml-72'>
        <div id='report' className='bg-white border-2 w-fit px-10 shadow-md -ml-96 z-50 flex flex-col'>
            <div className='flex'>
            <img
                src={logo}
                className=" h-24 flex ml-44 -mt-1"
            />
            <div className='flex text-blue-700 mt-10 ml-36'>
                <p className="hover:cursor-pointer" onClick={generatePDF}>Export as PDF</p>
                <ICONS.ChevronDownIconO className="h-5"/>
            </div>
            </div>

            <h1 className='font-bold text-3xl text-center'>Evento de Control de Movimiento</h1>

        {/* TOP DETAIL */}
        <div className='flex justify-between mt-14 pb-8 border-b-[1px] border-gray-300'>
            <div className='space-y-3'>
                <div className='flex '>
                    <p className='font-semibold absolute'>Ejecutivo : </p>
                    <p className='ml-40'>Mercurio</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Familiar : </p>
                    <p className='ml-40'>Ejecutivo</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Vehiculo : </p>
                    <p className='ml-40'>Mercedez Blanco</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Observación : </p>
                    <p className='ml-40'>Vehiculo Amigo</p>
                </div>
            </div>
        
            <div className='space-y-3 '>
                <div className='flex'>
                    <p className='font-semibold absolute'>Fetcha Creacion : </p>
                    <p className='ml-44'>22/11/2021 10:35</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Fetcha Modificacion : </p>
                    <p className='ml-44'>22/11/2021 10:35</p>
                </div>
            </div>
        </div>


        {/* MIDDLE */}
        <div>
        <div className='space-y-3 pt-8 pb-8 border-b-[1px] border-gray-300'>
                <div className='flex '>
                    <p className='font-semibold absolute'>Protector : </p>
                    <p className='ml-40'>Sagitario</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Vehiculo Protector : </p>
                    <p className='ml-40'>Blazer Negro</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Placa : </p>
                    <p className='ml-40'>PCB4512</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Descripcion : </p>
                    <p className='ml-40'>Camioneta  4x4 con sirena alta potencia</p>
                </div>
            </div>
        </div>


         {/* BOTTOM DETAIL */}
         <div className='flex justify-between mt-14'>
            <div className='space-y-3'>
                <div className='flex '>
                    <p className='font-semibold absolute'>Lugar Salida : </p>
                    <p className='ml-40'>Scala/Cumbaya</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Lugar Llegada : </p>
                    <p className='ml-40'>Oficina/Centro</p>
                </div>

            </div>
        
            <div className='space-y-3 pb-4'>
                <div className='flex'>
                    <p className='font-semibold absolute'>Fetcha Salida : </p>
                    <p className='ml-44'>22/11/2021 10:35</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Fetcha Llegada : </p>
                    <p className='ml-44'>22/11/2021 10:35</p>
                </div>
            </div>
        </div>

        <div className='flex pb-16'>
                    <p className='font-semibold absolute'>Observación : </p>
                    <p className='ml-44'>Sin ninguna novedad, salida y llegada con normalidad</p>
        </div>
        <div onClick={()=>handleCancel()} className='items-end flex flex-col pt-8 pb-8'>
            <h4 className='bg-blue-600 text-white w-fit px-4 font-semibold rounded-sm hover:cursor-pointer
            hover:bg-blue-500'>Salir</h4>
        </div>
        </div>
        </div>


        {/* PDF */}
        <div ref={ref} id="repo" className=' flex flex-col items-center ml-96 md:hidden'>
        <div id='report' className='bg-white w-fit px-10 -ml-96 z-50 flex flex-col'>
            <div className='flex'>
            <img
                src={logo}
                className=" h-24 flex ml-44 -mt-1"
            />
           
            </div>

            <h1 className='font-bold text-3xl text-center'>Evento de Control de Movimiento</h1>

        {/* TOP DETAIL */}
        <div className='flex justify-between mt-14 pb-8 border-b-[1px] border-gray-300'>
            <div className='space-y-3'>
                <div className='flex '>
                    <p className='font-semibold absolute'>Ejecutivo : </p>
                    <p className='ml-40'>Mercurio</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Familiar : </p>
                    <p className='ml-40'>Ejecutivo</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Vehiculo : </p>
                    <p className='ml-40'>Mercedez Blanco</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Observación : </p>
                    <p className='ml-40'>Vehiculo Amigo</p>
                </div>
            </div>
        
            <div className='space-y-3 '>
                <div className='flex'>
                    <p className='font-semibold absolute'>Fetcha Creacion : </p>
                    <p className='ml-44'>22/11/2021 10:35</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Fetcha Modificacion : </p>
                    <p className='ml-44'>22/11/2021 10:35</p>
                </div>
            </div>
        </div>


        {/* MIDDLE */}
        <div>
        <div className='space-y-3 pt-8 pb-8 border-b-[1px] border-gray-300'>
                <div className='flex '>
                    <p className='font-semibold absolute'>Protector : </p>
                    <p className='ml-40'>Sagitario</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Vehiculo Protector : </p>
                    <p className='ml-40'>Blazer Negro</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Placa : </p>
                    <p className='ml-40'>PCB4512</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Descripcion : </p>
                    <p className='ml-40'>Camioneta  4x4 con sirena alta potencia</p>
                </div>
            </div>
        </div>


         {/* BOTTOM DETAIL */}
         <div className='flex justify-between mt-14'>
            <div className='space-y-3'>
                <div className='flex '>
                    <p className='font-semibold absolute'>Lugar Salida : </p>
                    <p className='ml-40'>Scala/Cumbaya</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Lugar Llegada : </p>
                    <p className='ml-40'>Oficina/Centro</p>
                </div>

            </div>
        
            <div className='space-y-3 pb-4'>
                <div className='flex'>
                    <p className='font-semibold absolute'>Fetcha Salida : </p>
                    <p className='ml-44'>22/11/2021 10:35</p>
                </div>

                <div className='flex'>
                    <p className='font-semibold absolute'>Fetcha Llegada : </p>
                    <p className='ml-44'>22/11/2021 10:35</p>
                </div>
            </div>
        </div>

        <div className='flex pb-16'>
                    <p className='font-semibold absolute'>Observación : </p>
                    <p className='ml-44'>Sin ninguna novedad, salida y llegada con normalidad</p>
        </div>
        </div>
        </div>
        </>
    )
    })

export default PDFMovimiento