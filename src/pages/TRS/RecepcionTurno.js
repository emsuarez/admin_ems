import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Header,
  ICONS,
  RecepcionTurnoTable,
  RedirectWithoutLogin,
  TRSAuthorized,
} from '../../components';

import {
  deleteInformeTRSAction,
  getAllEjecutivosAction,
  getInformeTrs,
  getInformeTrsById,
} from '../../store/actions';

import { format } from 'date-fns';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import EliminarModalGenerico from '../../components/TRSModals/EliminarModalGenerico';
import recepcionTurnoReportPDF from '../../reports/TRS/recepcionTurnoReportPDF';

const RecepcionTurno = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [itemEliminar, setItemEliminar] = useState('');

  const [fechaInicial, setFechaInicial] = useState(new Date());
  const [fechaFinal, setFechaFinal] = useState(new Date());

  useEffect(() => {
    const fInicial = new Date();
    fInicial.setMonth(fInicial.getMonth() - 1);
    setFechaInicial(fInicial);
    const obtenerInfoVista = () => {
      dispatch(getInformeTrs());
      dispatch(getAllEjecutivosAction());
    };
    obtenerInfoVista();
  }, []);

  const recepcionesTurnoData = useSelector(state => state.informes.informesTrs);

  const handleSearch = e => {
    dispatch(getInformeTrs('/informetrs/?query=' + e.target.value));
  };

  const handleOpenViewInforme = informe => {
    dispatch(getInformeTrsById(informe.id));
    navigate('/viewrecepcion');
  };

  const handleOpenEditInforme = informe => {
    navigate('/editrecepcion');
    dispatch(getInformeTrsById(informe.id));
  };

  const handleOpenDeleteActa = itemEliminar => {
    setOpenDeleteModal(true);
    setItemEliminar(itemEliminar);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteActa = acta => {
    dispatch(deleteInformeTRSAction({ id: acta.id }));
    setOpenDeleteModal(false);
  };

  const handleFiltrarPorFecha = () => {
    const fechaInficialFormat = format(new Date(fechaInicial), 'yyyy-MM-dd');
    const fechaFinalFormat = format(new Date(fechaFinal), 'yyyy-MM-dd');

    dispatch(
      getInformeTrs(
        `/informetrs/?fechainicial=${fechaInficialFormat}&fechafinal=${fechaFinalFormat}`
      )
    );
  };

  return (
    <>
      <div>
        <RedirectWithoutLogin />
        {TRSAuthorized === -1 ? (
          <div className='bg-white flex flex-col justify-center'>
            <h1 className='font-bold text-3xl text-center'>
              No tiene permisos para acceder a esta página
            </h1>
          </div>
        ) : (
          <>
            <Header />
            <div className='flex items-center bg-slate-100 py-2'>
              <ICONS.HomeIconS className='h-6 ml-10 text-gray-600' />
              <p className=' ml-1'>TRS</p>
              <ICONS.ChevronRightIconO className='h-3  ml-1' />
              <p className=' ml-1'>Entrega y recepción de turno</p>
            </div>

            <div className='bg-white mx-10 py-10'>
              <div className='flex mx-10 justify-start'>
                <div>
                  <div className='flex justify-between align-middle text-center mt-4'>
                    <div className='ml-10 mt-2 mr-4 font-semibold'>Desde:</div>
                    <div className='w-60'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          inputProps={{
                            style: {
                              padding: `0.5rem 10px`,
                              buttonColor: 'blue',
                            },
                            className:
                              ' border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none',
                          }}
                          inputFormat='DD/MM/YYYY'
                          value={fechaInicial}
                          onChange={fInicial => setFechaInicial(fInicial)}
                          renderInput={params => (
                            <TextField
                              {...params}
                              sx={{
                                svg: { color: '#26346E' },
                                // input: { color },
                                // label: { color },
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className='flex justify-between align-middle text-center mt-4'>
                    <div className='ml-10 mt-2 mr-4 font-semibold'>Hasta:</div>
                    <div className='w-60'>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          inputProps={{
                            style: {
                              padding: `0.5rem 10px`,
                              buttonColor: 'blue',
                            },
                            className:
                              ' border-[1px] border-neutral-300 pl-2 rounded-md py-2 w-80 focus:border-blue-800 outline-none',
                          }}
                          inputFormat='DD/MM/YYYY'
                          value={fechaFinal}
                          onChange={fFinal => setFechaFinal(fFinal)}
                          renderInput={params => (
                            <TextField
                              {...params}
                              sx={{
                                svg: { color: '#26346E' },
                                // input: { color },
                                // label: { color },
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>

                  <div className='flex justify-between align-middle text-center mt-4'>
                    <span className='ml-10 mt-2 mr-4 font-semibold text-white cursor-default'>
                      Buscar:
                    </span>
                    <div className='w-60'>
                      <button
                        className='bg-blue-900 hover:bg-blue-800 text-white hover:cursor-pointer font-semibold text-base p-1 rounded-md w-full'
                        onClick={() => handleFiltrarPorFecha()}
                      >
                        Buscar por fecha
                      </button>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className='flex flex-row justify-between align-bottom mx-16'>
                <div></div>
                <div className='flex'>
                  <button
                    onClick={() =>
                      recepcionTurnoReportPDF(recepcionesTurnoData.results)
                    }
                  >
                    <div className='flex'>
                      <p className='text-blue-800 hover:cursor-pointer'>
                        Exportar a PDF
                      </p>
                      <ICONS.ChevronDownIconO
                        className='w-3 mb-1.5 ml-2'
                        color='blue'
                      />
                    </div>
                  </button>
                  <div className='flex flex-col ml-4 '>
                    <input
                      placeholder='Buscar'
                      className='border-[1px] outline-none pl-3 rounded-2xl bg-gray-50 py-1'
                      onChange={e => {
                        handleSearch(e);
                      }}
                    />
                  </div>
                </div>
              </div>
              {Object.keys(recepcionesTurnoData).length > 0 && (
                <div className=' pt-4 p-16 flex flex-col'>
                  <RecepcionTurnoTable
                    data={recepcionesTurnoData}
                    handleOpenViewInforme={handleOpenViewInforme}
                    handleOpenEditInforme={handleOpenEditInforme}
                    handleOpenDeleteActa={handleOpenDeleteActa}
                    tipoTabla='trs'
                  />
                </div>
              )}
            </div>
            {/* Modales */}

            <EliminarModalGenerico
              tituloModal={'Eliminar Acta de Entrega y Recepción'}
              descripcionModal={
                ' Al eliminar una Acta, sera de forma definitiva y sin posibilidad de recuperación.'
              }
              openModal={openDeleteModal}
              handleClose={handleCloseDeleteModal}
              handleAction={handleDeleteActa}
              itemEliminar={itemEliminar}
            />
          </>
        )}
      </div>
    </>
  );
};

export default RecepcionTurno;
