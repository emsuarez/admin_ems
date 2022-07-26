import React,{useEffect, useRef, useState} from 'react';
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

interface Column {
  id: 'Ejectivos' | 'Alias' | '# Familiares' | 'Opciones';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'Ejectivos', label: 'Ejectivos', minWidth: 300 },
  { id: 'Alias', label: 'Alias', minWidth: 250 },
  { id: 'Familiares', label: '# Familiares', minWidth: 200 },
  { id: 'Creado', label: 'Creado', minWidth: 200 },
  { id: 'Opciones', label: 'Opciones', minWidth: 300 },
 
];

interface Data {
    Ejectivos: string,
    Alias: string,
    Creado: string,
    Opciones: string,

}

// function createData(
//     Ejectivos: string,
//     Alias: string,
//     Familiares: string,
//     Creado:string,
//     Opciones: string,
// ): Data {
//   return { Ejectivos, Alias, Familiares,Creado,Opciones };
// }

// const rows = [
//   createData('staging',"TR1",'0','22/11/2021  10:35'),
//   createData('abhin/repo/api/allow_repo_updates',"TR2",'1','22/11/2021  10:35'),
//   createData('zdavis/BBCDEV-1577',"TR3",'2','22/11/2021  10:35'),
//   createData('tkells/BBCDEV-1631-fix-require-account=access',"TF3",'0','22/11/2021  10:35'),
//   createData('jmooring/BBDEV-1603',"TG2",'4','22/11/2021  10:35'),

// ];

export default function EjectivosTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data,setData] = useState([])
  const [userID,setUserID] = useState()
  
const handleGetEjecutivos=async()=>{
  const dataTemp = await fetch('https://cloudbitakor.com/api/1.0/ejecutivo/', { 
    method: 'get', 
    headers: new Headers({
      "Authorization":"Token "+window.localStorage.getItem('token')
    })
  }).then(response => response.json())
  .then(dataTemp => setData(dataTemp));
}
useEffect(()=>{
  handleGetEjecutivos();
},[data])

  const [Edit,setEdit] = useState(false)
  const [Delete,setDelete] = useState(false)
  const [Create,setCreate] = useState(false)
  const [EditFamily,setEditFamily] = useState(false)
  const [nombre,setNombre] = useState()
  const [alias,setAlias] = useState()

// CLICK OUTSIDE MODEL CLOSE
const wrapperRef = useRef(null);
ClickOutSide(wrapperRef,setEdit);
ClickOutSide(wrapperRef,setDelete);
ClickOutSide(wrapperRef,setCreate);
ClickOutSide(wrapperRef,setEditFamily);





  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>

    <div onClick={()=>setCreate(true)} className="bg-red-400 w-fit mb-10  -mt-10">
                <h3 className=' mt-3 bg-blue-500 w-32 text-center font-semibold rounded-sm
                 text-white hover:cursor-pointer'>Crear Ejecutivo</h3>
    </div>

    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 0, minWidth: column.minWidth,backgroundColor:'#F8F9FA',fontWeight:'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((data) => {
                return (
                  <TableRow role="checkbox" tabIndex={-1} key={data.code}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {
                            [column.id] == 'Opciones'&&
                            <div className='flex gap-2 -ml-2'>
                                <ICONS.CheckCircleIconS className="h-5 hover:cursor-pointer" color={data.is_active?"red":"green"}/>
                                <ICONS.UserAddIconO onClick={()=>setEditFamily(true)} className="h-5 hover:cursor-pointer " color="black" />
                                
                                <ICONS.PencilIconS onClick={()=>{
                                  setNombre(data.nombres)
                                  setAlias(data.alias)
                                  setUserID(data.id)
                                  setEdit(true)
                                
                                }} className="h-5 hover:cursor-pointer " color="#86AD6C" />

                                <ICONS.ArchiveIconS onClick={()=>{
                                  setUserID(data.id)
                                  setDelete(true)
                                  
                                  }} className="h-5 hover:cursor-pointer" color="#A70045"/>

                            </div>
                      }
                      {
                            [column.id] == 'Ejectivos'&&
                            data.nombres
                      }
                       {
                            [column.id] == 'Alias'&&
                            data.alias
                      }
                                             {
                            [column.id] == 'Creado'&&
                            data.created
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
     
     <div className='justify-start flex flex-col' ref={wrapperRef}>
      {
        Create&&<CreateEjecutivo Create={Create}  setCreate={setCreate}/>
      }
      {
        Edit&&<EditEjecutivo Edit={Edit} nombre={nombre} alias={alias} userID={userID}  setEdit={setEdit}/>
      }
      {
        Delete&&<DeleteEjecutivo Delete={Delete} userID={userID} setDelete={setDelete} />
      }
      {
        EditFamily&&<EditFamilyModal EditFamily={EditFamily} setEditFamily={setEditFamily} />
      }
    </div>
    </div>
  );
}
             