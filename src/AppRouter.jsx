import { Route, Routes } from 'react-router-dom';
import Pruebas from './pages/Pruebas';
import MainLayout from './layout/MainLayout';
import PruebaCards from './pages/PruebaCards';
import PreLayout from './layout/PreLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ReintegroVer from './pages/Reintegro/ReintegroVer';
import Inicio from './pages/Inicio';
import ReintegrosLayout from './layout/ReintegrosLayout';
import MiCuenta from './pages/MiCuenta';
import NuevoReintegroForm from './pages/NuevoReintegroForm';
import DatosFacturaReintegroForm from './pages/DatosFacturaReintegroForm';
import TurnosLayout from './layout/TurnosLayout';
import RecetasLayout from './layout/RecetasLayout';
import AutorizacionesLayout from './layout/AutorizacionesLayout';
import VerRecetas from './pages/Recetas/VerRecetas';
import SolicitarReceta from './pages/Recetas/SolicitarReceta';
import VerAutorizaciones from './pages/Autorizaciones/VerAutorizaciones';
import SolicitarAutorizacion from './pages/Autorizaciones/SolicitarAutorizacion';
import RequireAuth from './components/RequireAuth';
import SolicitarTurno from './pages/Turnos/SolicitarTurno';
import VerTurnos from './pages/Turnos/VerTurnos';

export function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<PreLayout />}>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Route>

      {/* Rutas protegidas */}
      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Inicio />} />
          <Route path='/mi-cuenta' element={<MiCuenta />} />

          <Route path='/turnos' element={<TurnosLayout />}>
            <Route path='turnos-reservados' element={<VerTurnos/>} />
            <Route path='solicitar-turno' element={<SolicitarTurno/>} />
          </Route>

          <Route path='/reintegros' element={<ReintegrosLayout />}>
            <Route path='historial-reintegros' element={<ReintegroVer />} />
            <Route path='solicitar-reintegro' element={<NuevoReintegroForm />} />
            <Route path='datos-factura' element={<DatosFacturaReintegroForm />} />
          </Route>

          <Route path='/recetas' element={<RecetasLayout />}>
            <Route path='ver-recetas' element={<VerRecetas/>} />
            <Route path='solicitar-receta' element={<SolicitarReceta/>} />
          </Route>

          <Route path='/autorizaciones' element={<AutorizacionesLayout />}>
            <Route path='ver-autorizaciones' element={<VerAutorizaciones/>} />
            <Route path='solicitar-autorizacion' element={<SolicitarAutorizacion/>} />
          </Route>

          <Route path='/cartilla-medica' element={<h3>Cartilla Médica.</h3>} />
        </Route>
      </Route>

      {/* Catch all */}
      <Route path='*' element={<h3>Not Found.</h3>} />

      <Route path='/pruebaCards' element={<PruebaCards />} />
      <Route path='/pruebas' element={<Pruebas />} />
    </Routes>
  );
}
