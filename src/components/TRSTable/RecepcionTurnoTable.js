import React,{useRef, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ICONS } from '../constants';
import { CreateEjecutivo, DeleteEjecutivo, EditEjecutivo } from '../RecursosModals';
import EditFamilyModal from '../RecursosModals/EditFamilyModal';
import { ClickOutSide } from '../clickOutside/ClickOutSide';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteMovimiento, DeleteRecepcion, EditMovimiento, EditRecepcion, LeaveMovimiento, PDFMovimiento } from '../TRSModals';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import ClockIcon from '@heroicons/react/solid/ClockIcon';



interface Column {
  id: 'Centralista de operaciones salientes' | 'Fecha salida' | 'Centralista de operaciones entrantes' | 'Fecha Llegada' | 'recepcion' | 'Opciones';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'salientes', label: 'Centralista de operaciones salientes', minWidth: 100 },
  { id: 'Salida', label: 'Fetcha Salida', minWidth: 100 },
  { id: 'entrantes', label: 'Centralista de operaciones entrantes', minWidth: 100 },
  { id: 'Llegadah', label: 'Fetcha Llegada', minWidth: 150 },
  { id: 'recepcion', label: 'Entrega y recepción de turno', minWidth: 100 },

  { id: 'Opciones', label: 'Opciones', minWidth: 200 },
 
];

interface Data {
    salientes: string,
    Salida: string,
    entrantes: string,
    Llegadah:string,
    recepcion:string,
    Opciones: string,

}

function createData(
    salientes: string,
    Salida: string,
    entrantes: string,
    Llegadah:string,
    recepcion:string,
    Opciones: string,
): Data {
  return { salientes, Salida, entrantes,Llegadah,recepcion,Opciones };
}

const rows = [
  createData('TR1','22/11/2021  10:35','TR1','22/11/2021  10:35','Nocturno'),
  createData('TR2','22/11/2021  10:35','TR1','22/11/2021  10:35','Diurno'),
  createData('TR3','22/11/2021  10:35','TR1','22/11/2021  10:35','Nocturno'),
  createData('TR8','22/11/2021  10:35','TR1','22/11/2021  10:35','Diurno'),
  createData('TR7','22/11/2021  10:35','TR1','22/11/2021  10:35','Nocturno'),

];

export default function RecepcionTurnoTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const componentRef = useRef();
  const navigate = useNavigate();


  const [Edit,setEdit] = useState(false)
  const [Delete,setDelete] = useState(false)
  const [leave,setLeave] = useState(false)
  const [pdf,setPDF] = useState(false)
  const [openDesde,setOpenDesde] = useState(false)
  const [openHasta,setOpenHasta] = useState(false)
  const [Desde, setDesde] = useState(new Date());
  const [Hasta,setHasta] = useState(new Date());

// CLICK OUTSIDE MODEL CLOSE
const wrapperRef = useRef(null);
ClickOutSide(wrapperRef,setOpenDesde);
ClickOutSide(wrapperRef,setOpenHasta);
ClickOutSide(wrapperRef,setEdit);
ClickOutSide(wrapperRef,setDelete);
ClickOutSide(wrapperRef,setPDF);

let shift;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>

{/* DATES */}
<div className=' flex justify-between'>
   
   <div>
    <div className='pb-4 z-50 flex hover:cursor-pointer' >
        <div className='flex space-x-8'>
        <p className='font-semibold mt-2'>Desde</p>
        <p onClick={()=>setOpenDesde(!openDesde)}><DatePicker open={openDesde} className='p-2 ml-5 w-52 rounded-md border-2' selected={Desde} 
            onChange={(date:Date) => setDesde(date)} /></p>
        </div>
        
        <ICONS.CalendarIconS onClick={()=>setOpenDesde(!openDesde)} className="h-7 text-gray-600 ml-64 mt-2 z-50 absolute"/>
        
    </div>

    <div className='pb-4 z-50 flex hover:cursor-pointer' >
        <div className='flex space-x-8'>
        <p className='font-semibold mt-2'>Hasta</p>
        <p onClick={()=>setOpenHasta(!openHasta)}><DatePicker open={openHasta} className='p-2 ml-6 w-52 rounded-md border-2' selected={Hasta} 
            onChange={(date:Date) => setHasta(date)} /></p>
        </div>
        
        <ICONS.CalendarIconS onClick={()=>setOpenHasta(!openHasta)} className="h-7 text-gray-600 ml-64 mt-2 z-50 absolute"/>
        
    </div>

    <div className='pb-4 z-50 flex hover:cursor-pointer' >
        <div className='flex space-x-8'>
        <p className='font-semibold mt-2'>Ejecutivo</p>
        <select className='p-2 rounded-md border-2 w-52 '>
            <option>Ejecutivo 1</option>
            <option>Ejecutivo 2</option>
            <option>Ejecutivo 3</option>
        </select>
        </div>
                
    </div>


    </div>

    <div className='items-end flex flex-col'>
        <div className='flex mr-5'>
            <ICONS.SearchIconS className="h-5 ml-3 z-50 mt-1 text-gray-500"/>
            <input className='absolute py-1 px-3 rounded-3xl'/>
            <ICONS.ChevronDownIconO className="h-3 z-50 ml-36 mt-2 text-gray-500"/>
        </div>
        <div className='flex justify-end mt-32 mb-4'>
                    <p onClick={()=>setPDF(true)} className="text-blue-500 hover:cursor-pointer">Export as PDF</p>
                    <ICONS.ChevronDownIconO className="h-3 mt-1.5 mr-4" color="blue"/>
                    <input
                        placeholder='Buscar'
                        className='border-[1px] outline-none pl-3 rounded-sm'
                    />
                    <ICONS.SearchIconS className="h-5 pr-2 mt-0.5 hover:cursor-pointer absolute text-gray-400"/>
                </div>
    </div>
</div>



    <h3 className='bg-blue-500 ml-48 w-fit -mt-4 px-4 text-lg mb-4 text-white rounded-md'>Buscar por fecha</h3>


    <Paper sx={{ width: '100%',zIndex:100 }} >
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table  aria-label=" table">
          <TableHead>
            
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 0, minWidth: column.minWidth,backgroundColor:'#F8F9FA',fontWeight:'bold' }}
                >
                  <p className='text-gray-600'>{column.label}</p>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {
                            [column.id]=="recepcion"?shift=value://;
                            [column.id] == 'Opciones'?
                            
                            <div className='flex gap-2 -ml-2'>
                                <ICONS.CheckCircleIconS className="h-5 hover:cursor-pointer" color="red"/>
                                <ICONS.PencilIconS onClick={()=>
                                    {
                                        if(window.location.href!==window.location.protocol + '//' + window.location.host+"/editrecepcion")
                                    { 
                                      navigate('/editrecepcion',{state:{shift:shift}})
                                    }
                                    }} className="h-5 hover:cursor-pointer " color="black" />
                                <p onClick={()=>
                                    {
                                        if(window.location.href!==window.location.protocol + '//' + window.location.host+"/viewrecepcion")
                                    { 
                                    
                                      navigate('/viewrecepcion',{state:{shift:shift}})
                                    }
                                    }} className='text-white px-2 rounded-md bg-blue-600 hover:cursor-pointer'>Ver</p>
                                <ICONS.ArchiveIconS onClick={()=>setDelete(true)} className="h-5 hover:cursor-pointer" color="#A70045"/>

                            </div>
                            :
                            
                            <p className='text-center'>{value}</p>
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
     
     <div className='justify-start flex flex-col' ref={wrapperRef}>
      {
        leave&&<LeaveMovimiento leave={leave}  setLeave={setLeave}/>
      }
      {
        Delete&&<DeleteRecepcion Delete={Delete} setDelete={setDelete} />
      }
      {
        pdf&&<PDFMovimiento pdf={pdf} ref={componentRef} handlePrint={handlePrint} setPDF={setPDF}/>
      }

    </div>
    </div>
  );
}