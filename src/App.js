import { connect } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { EditRecepcion, Toast } from './components'
import EditRecepcionCctv from './components/CCTV/EditRecepcionCctv'
import ProtectedRoutes from './components/routes/ProtectedRoutes'
import { Dashboard, Login, Registration } from './pages'
import { CCTVDashboard, Diurno, Historial, Nocturno } from './pages/CCTV'
import RecepcionTurnoCctv from './pages/CCTV/RecepcionTurnoCctv'
import HistorialCCTV from './pages/CCTVAdmin/HistorialCCTV'
import PerfilUsuario from './pages/PerfilUsuario'
import Ejecutivos from './pages/Recursos/Ejecutivos'
import GrupoFamiliar from './pages/Recursos/GrupoFamiliar'
import Lugares from './pages/Recursos/Lugares'
import Protectores from './pages/Recursos/Protectores'
import VehicleEjectivos from './pages/Recursos/VehicleEjectivos'
import VehicleProtectores from './pages/Recursos/VehicleProtectores'
import { HistorialMovimiento, RecepcionTurno } from './pages/TRS'
import { TRSDashboard } from './pages/TRSUSER'
import Usuarios from './pages/Usuarios'
import { clearToast } from './store/actions'

function App(props) {
  return (
    <div>
      {props.isToastShowing && (
        <Toast
          {...props.toastConfig}
          isToastShowing={props.isToastShowing}
          clearToast={() => props.clearToast()}
        />
      )}

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='register' element={<Registration />} />

        {/* ADMIN */}
        <Route element={<ProtectedRoutes />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='perfilusuario' element={<PerfilUsuario />} />

          <Route path='ejecutivos' element={<Ejecutivos />} />
          <Route path='grupofamiliar' element={<GrupoFamiliar />} />
          <Route path='vehiculosejecutivos' element={<VehicleEjectivos />} />
          <Route path='protectores' element={<Protectores />} />
          <Route path='vehiculosprotectores' element={<VehicleProtectores />} />
          <Route path='lugares' element={<Lugares />} />
          <Route path='admin/historial' element={<HistorialCCTV />} />
          <Route path='usuarios' element={<Usuarios />} />
          {/* TRS */}
          <Route path='historialmovimiento' element={<HistorialMovimiento />} />
          <Route path='recepcionturno' element={<RecepcionTurno />} />
          <Route path='editrecepcion' element={<EditRecepcion />} />
          <Route path='viewrecepcion' element={<EditRecepcion />} />

          {/* TRSUSER */}
          <Route path='trsdashboard' element={<TRSDashboard />} />

          {/* CCTV */}
          <Route path='recepcionturnocctv' element={<RecepcionTurnoCctv />} />
          <Route path='editrecepcioncctv' element={<EditRecepcionCctv />} />
          <Route path='viewrecepcioncctv' element={<EditRecepcionCctv />} />
          {/* CCTVUSER */}
          <Route path='cctvdashboard' element={<CCTVDashboard />} />

          <Route path='cctv/diurno' element={<Diurno />} />
          <Route path='cctv/nocturno' element={<Nocturno />} />
          <Route path='cctv/historial' element={<Historial />} />
        </Route>
      </Routes>
    </div>
  )
}

const mapStateToProps = props => {
  return {
    isToastShowing: props.toast.isToastShowing,
    toastConfig: props.toast.config,
  }
}

export default connect(mapStateToProps, { clearToast })(App)
