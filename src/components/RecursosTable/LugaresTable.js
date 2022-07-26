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
import { CreateLugar,DeleteLugar,EditLugar } from '../RecursosModals';
import { ClickOutSide } from '../clickOutside/ClickOutSide';



export default function LugaresTable() {



  interface Column {
    id: 'Lugar' | 'Alias' | 'Creado' | 'Opciones';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: Column[] = [
    { id: "Lugar", label: 'Lugar', minWidth: 340 },
    { id: 'Alias', label: 'Alias', minWidth: 200 },
    { id: 'Creado', label: 'Creado', minWidth: 200 },
    { id: 'Opciones', label: 'Opciones', minWidth: 120 },
   
  ];
  
  interface Data {
      Lugar: string,
      Alias: string,
      Creado: string,
      Opciones: string,
  
  }
  
  function createData(
      Lugar: string,
      Alias: string,
      Creado:string,
      Opciones: string,
  ): Data {
    return { Lugar, Alias,Creado,Opciones };
  }
  
  const rows = [
    createData('staging',"TR1",'22/11/2021 10:35'),
    createData('abhin/repo/api/allow_repo_updates',"TR2",'22/11/2021 10:35'),
    createData('zdavis/BBCDEV-1577',"TR3",'22/11/2021 10:35'),
    createData('tkells/BBCDEV-1631-fix-require-account=access',"TF3",'22/11/2021 10:35'),
    createData('jmooring/BBDEV-1603',"TG2",'22/11/2021 10:35'),
  
  ];






  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const [Edit,setEdit] = useState(false)
  const [Delete,setDelete] = useState(false)
  const [Create,setCreate] = useState(false)
  const [data,setData] = useState([])
  const [userID,setUserID] = useState()
  const [lugar,setLugar] = useState()
  const [alias,setAlias] = useState()

  const handleGetLugares=async()=>{
    data = await fetch('https://cloudbitakor.com/api/1.0/lugares/', { 
      method: 'get', 
      headers: new Headers({
        "Authorization":"Token "+window.localStorage.getItem('token')
      })
    }).then(response => response.json())
    .then(data => setData(data));
  }
  useEffect(()=>{
    handleGetLugares();
  },[data])


// CLICK OUTSIDE MODEL CLOSE
const wrapperRef = useRef(null);
ClickOutSide(wrapperRef,setEdit);
ClickOutSide(wrapperRef,setDelete);
ClickOutSide(wrapperRef,setCreate);






  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>

    <div onClick={()=>setCreate(true)} className="w-fit mb-10  -mt-10">
                <h3 className=' mt-3 bg-blue-500 w-32 text-center font-semibold rounded-sm
                 text-white hover:cursor-pointer'>Crear Lugar</h3>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={data.code}>
                    {columns.map((column) => {
                      const value = data[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {
                            [column.id] == 'Opciones'&&
                            <div className='flex gap-2 -ml-2'>
                                <ICONS.CheckCircleIconS className="h-5 hover:cursor-pointer" color={data.is_active?"red":"green"}/>
                                <ICONS.PencilIconS onClick={()=>{
                                  setUserID(data.id)
                                  setLugar(data.lugar)
                                  setAlias(data.alias)
                                  setEdit(true)
                                  }} className="h-5 hover:cursor-pointer " color="#86AD6C" />
                                <ICONS.ArchiveIconS onClick={()=>{
                                 setUserID(data.id)
                                 setDelete(true)
                                
                                }} className="h-5 hover:cursor-pointer" color="#A70045"/>

                            </div>
                          }
                        {
                            [column.id] == 'Lugar'&&
                            data.lugar
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
     
     <div className='justify-start flex flex-col' ref={wrapperRef}>
      {
        Create&&<CreateLugar Create={Create}  setCreate={setCreate}/>
      }
      {
        Edit&&<EditLugar Edit={Edit} userID={userID} lugar={lugar} alias={alias}  setEdit={setEdit}/>
      }
      {
        Delete&&<DeleteLugar Delete={Delete} userID={userID} setDelete={setDelete} />
      }
      
    </div>
    </div>
  );
}
             