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
import { DeleteMovimiento, EditMovimiento, LeaveMovimiento } from '../TRSModals';
import { useNavigate } from 'react-router-dom';



interface Column {
  id: 'Centralista de operaciones saliente' | 'Fetch Salida' | 'Centralista de operaciones entrante' | 'Fetcha Llegada' | 'Entrega y recepcion de turno';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'saliente', label: 'Centralista de operaciones saliente', minWidth: 100 },
  { id: 'Salida', label: 'Fetch Salida', minWidth: 100 },
  { id: 'entrante', label: 'Centralista de operaciones entrante', minWidth: 150 },
  { id: 'Llegada', label: 'Fetcha Llegada', minWidth: 150 },
  { id: 'Entrega', label: 'Entrega y recepcion de turno', minWidth: 200 },

  { id: 'Opciones', label: 'Opciones', minWidth: 100 },
 
];

interface Data {
    saliente: string,
    Salida: string,
    entrante: string,
    Llegada:string,
    Entrega:string,
    Opciones: string,

}

function createData(
    saliente: string,
    Salida: string,
    entrante: string,
    Llegada:string,
    Entrega:String,
    Opciones: string,
): Data {
  return { saliente, Salida, entrante,Llegada,Entrega,Opciones };
}

const rows = [
  createData('TR1','22/11/2021  10:35','TR1','22/11/2021  10:35','Diurno'),
  createData('TR2','22/11/2021  10:35','TR1','22/11/2021  10:35','Nocturno'),
  createData('TR3','22/11/2021  10:35','TR1','22/11/2021  10:35','Diurno'),
  createData('TR8','22/11/2021  10:35','TR1','22/11/2021  10:35','Nocturno'),
  createData('TR7','22/11/2021  10:35','TR1','22/11/2021  10:35','Diurno'),

];

export default function HistorialTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const navigate = useNavigate()

  const [Edit,setEdit] = useState(false)
  const [Delete,setDelete] = useState(false)
  const [leave,setLeave] = useState(false)
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



  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>

{/* DATES */}
<div className=' flex justify-between'>
   
   <div>
    <div className='pb-4 z-50 flex hover:cursor-pointer' >
        <div className='flex space-x-8'>
        <p className='font-semibold mt-2'>Desde</p>
        <p onClick={()=>setOpenDesde(!openDesde)}><DatePicker open={openDesde} className='p-2 rounded-md border-2' selected={Desde} 
            onChange={(date:Date) => setDesde(date)} /></p>
        </div>
        
        <ICONS.CalendarIconS onClick={()=>setOpenDesde(!openDesde)} className="h-7 text-gray-600 ml-60 mt-2 z-50 absolute"/>
        
    </div>

    <div className='pb-4 z-50 flex hover:cursor-pointer' >
        <div className='flex space-x-8'>
        <p className='font-semibold mt-2'>Hasta</p>
        <p onClick={()=>setOpenHasta(!openHasta)}><DatePicker open={openHasta} className='p-2 ml-1 rounded-md border-2' selected={Hasta} 
            onChange={(date:Date) => setHasta(date)} /></p>
        </div>
        
        <ICONS.CalendarIconS onClick={()=>setOpenHasta(!openHasta)} className="h-7 text-gray-600 ml-60 mt-2 z-50 absolute"/>
        
    </div>
    </div>

    <div className='items-end flex flex-col'>
        <div className='flex mr-5'>
            <ICONS.SearchIconS className="h-5 ml-3 z-50 mt-1 text-gray-500"/>
            <input className='absolute py-1 px-3 rounded-3xl'/>
            <ICONS.ChevronDownIconO className="h-3 z-50 ml-36 mt-2 text-gray-500"/>
        </div>
        <div className='flex justify-end mt-32 mb-4'>
                    <p className="text-blue-500 hover:cursor-pointer">Export as PDF</p>
                    <ICONS.ChevronDownIconO className="h-3 mt-1.5 mr-4" color="blue"/>
                    <input
                        placeholder='Buscar'
                        className='border-[1px] outline-none pl-3 rounded-sm'
                    />
                    <ICONS.SearchIconS className="h-5 pr-2 mt-0.5 hover:cursor-pointer absolute text-gray-400"/>
                </div>
    </div>
</div>



    <h3 className='bg-blue-500 ml-48 w-fit px-4 text-lg mb-4 -mt-14 text-white rounded-md'>Buscar</h3>


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
                  <p className='text-gray-600 text-center'>{column.label}</p>
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
                        <TableCell key={column.id} align={column.align} className="">
                          {
                            [column.id] == 'Opciones'?
                            <div className='flex gap-2 -ml-2'>
                                <p onClick={()=>
                                    {
                                      if(window.location.href!==window.location.protocol + '//' + window.location.host+"/viewrecepcion")
                                    { 
                                    
                                      navigate('/viewrecepcion',{state:{shift:"Nocturno"}})
                                    }
                                    }} className='text-white px-2 rounded-md bg-blue-600 hover:cursor-pointer ml-12'>Ver</p>

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
        Edit&&<EditMovimiento Edit={Edit}  setEdit={setEdit}/>
      }
      {
        Delete&&<DeleteMovimiento Delete={Delete} setDelete={setDelete} />
      }
    </div>
    </div>
  );
}