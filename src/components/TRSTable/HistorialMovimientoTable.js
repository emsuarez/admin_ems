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
import { DeleteMovimiento, EditMovimiento, LeaveMovimiento, PDFMovimiento } from '../TRSModals';
import ReactToPrint, { useReactToPrint } from 'react-to-print';



interface Column {
  id: 'Ejectivo' | 'Salida' | '# Familiares' | 'Opciones';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'Ejectivo', label: 'Ejectivos', minWidth: 100 },
  { id: 'Salida', label: 'Salida', minWidth: 100 },
  { id: 'Llegada', label: 'Llegada', minWidth: 150 },
  { id: 'Ejectivop', label: 'Ejecutivo', minWidth: 150 },
  { id: 'Protectorv', label: 'Protector', minWidth: 200 },
  { id: 'Salidah', label: 'Salida', minWidth: 150 },
  { id: 'Llegadah', label: 'Llegada', minWidth: 200 },
  { id: 'Protector', label: 'Protector', minWidth: 100 },
  { id: 'Observation', label: 'Observation', minWidth: 200 },


  { id: 'Opciones', label: 'Opciones', minWidth: 200 },
 
];

interface Data {
    Ejectivo: string,
    Salida: string,
    Llegada: string,
    Ejectivop:string,
    Protectorv:string,
    Salidah:string,
    Llegadah:string,
    Protector:string,
    Observation:string,
    Opciones: string,

}

function createData(
    Ejectivo: string,
    Salida: string,
    Llegada: string,
    Ejectivop:string,
    Protectorv:String,
    Salidah:string,
    Llegadah:string,
    Protector:string,
    Observation:string,
    Opciones: string,
): Data {
  return { Ejectivo, Salida, Llegada,Ejectivop,Protectorv,Salidah,Llegadah,Protector,Observation,Opciones };
}

const rows = [
  createData('TR1','TR5','TR3','BMW','Plata','22/11/2021  10:35','22/11/2021  10:35','K4','obs demo'),
  createData('TR2','TR3','TR2','BMW','Plata','22/11/2021  10:35','22/11/2021  10:35','K4','obs demo'),
  createData('TR3','TR7','TR5','BMW','Plata','22/11/2021  10:35','22/11/2021  10:35','K4','obs demo'),
  createData('TR8','TR8','TR1','BMW','Plata','22/11/2021  10:35','22/11/2021  10:35','K4','obs demo'),
  createData('TR7','TR4','TR7','BMW','Plata','22/11/2021  10:35','22/11/2021  10:35','K4','obs demo'),

];

export default function HistorialMovimientoTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const componentRef = useRef();



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



    <h3 className='bg-blue-500 ml-48 w-fit px-4 text-lg mb-4 -mt-14 text-white rounded-md'>Buscar</h3>


    <Paper sx={{ width: '100%',zIndex:100 }} >
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table  aria-label=" table">
          <TableHead>
          <TableRow>
              <TableCell align="center" colSpan={2}
                  style={{ top: 0,fontWeight:'bold',backgroundColor:'#F8F9FA' }}
                  
              >
                <p className="text-lg">Lugares</p>
              </TableCell>

              <TableCell align="center" colSpan={3}
                  style={{ top: 0,fontWeight:'bold',backgroundColor:'#F8F9FA' }}
                >
                <p className="text-lg">Vehiculo</p>
              </TableCell>

              <TableCell align="center" colSpan={1}
                  style={{ top: 0,fontWeight:'bold',backgroundColor:'#F8F9FA' }}
                >
                <p className=' ml-20 text-lg'>Hora</p>
              </TableCell>


              <TableCell align="center" colSpan={1}
                  style={{ top: 0,fontWeight:'bold',backgroundColor:'#F8F9FA' }}
                >
                <p className=' ml-20 text-lg'></p>
              </TableCell>

              <TableCell align="center" colSpan={1}
                  style={{ top: 0,fontWeight:'bold',backgroundColor:'#F8F9FA' }}
                >
                <p className=' ml-20 text-lg'></p>
              </TableCell>

              <TableCell align="center" colSpan={1}
                  style={{ top: 0,fontWeight:'bold',backgroundColor:'#F8F9FA' }}
                >
                <p className=' ml-20 text-lg bg-red-500 '></p>
              </TableCell>
              <TableCell align="center" colSpan={1}
                  style={{ top: 0,fontWeight:'bold',backgroundColor:'#F8F9FA' }}
                >
                <p className=' ml-20 text-lg'></p>
              </TableCell>
              
            </TableRow>
            
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
                            [column.id] == 'Opciones'?
                            <div className='flex gap-2 -ml-2'>
                                <ICONS.CheckCircleIconS className="h-5 hover:cursor-pointer" color="red"/>
                                <ICONS.PencilIconS onClick={()=>setEdit(true)} className="h-5 hover:cursor-pointer " color="black" />
                                <p onClick={()=>setLeave(true)} className='text-white px-2 rounded-md bg-blue-600 hover:cursor-pointer'>Ver</p>
                                <ICONS.ArchiveIconS onClick={()=>setDelete(true)} className="h-5 hover:cursor-pointer" color="#A70045"/>

                            </div>
                            :
                            value
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
      {
        pdf&&<PDFMovimiento pdf={pdf} ref={componentRef} handlePrint={handlePrint} setPDF={setPDF}/>
      }

    </div>
    </div>
  );
}