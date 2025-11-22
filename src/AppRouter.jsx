import { Route, Routes } from "react-router-dom";
import Pruebas from "./pages/Pruebas";
import MainLayout from "./layout/MainLayout";
import PreLayout from "./layout/PreLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReintegroVer from "./pages/Reintegro/ReintegroVer";
import Inicio from "./pages/Inicio";
import ReintegrosLayout from "./layout/ReintegrosLayout";
import MiCuenta from "./pages/MiCuenta";
import TurnosLayout from "./layout/TurnosLayout";
import RecetasLayout from "./layout/RecetasLayout";
import AutorizacionesLayout from "./layout/AutorizacionesLayout";
import VerRecetas from "./pages/Recetas/VerRecetas";
import SolicitarReceta from "./pages/Recetas/SolicitarReceta";
import VerAutorizaciones from "./pages/Autorizaciones/VerAutorizaciones";
import RequireAuth from "./components/RequireAuth";
import EditarReceta from "./pages/Recetas/EditarReceta";
import SolicitarTurno from './pages/Turnos/SolicitarTurno';
import VerTurnos from './pages/Turnos/VerTurnos';
import CartillaMedica from "./pages/CartillaMedica";
import ReintegroFormStepOne from './pages/ReintegroFormStepOne';
import ReintegroFormStepTwo from './pages/ReintegroFormStepTwo';
import AutorizacionForm from "./pages/Autorizaciones/AutorizacionForm";
import { ErrorBoundary } from 'react-error-boundary';
import GenErrorBoundary from './components/ErrorBoundaries/GenErrorBoundary';
import TramitesFallback from './components/ErrorFallbacks/TramitesFallback';
import InicioFallback from "./components/ErrorFallbacks/InicioFallback";

export function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<PreLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Rutas protegidas */}
      {/* <Route element={<RequireAuth />}> */}
        <Route element={<MainLayout />}>
          <Route path="/" element={
           <GenErrorBoundary FallbackComponent={InicioFallback}>
              <Inicio />
            </GenErrorBoundary>
          } />
          <Route path="/mi-cuenta" element={<MiCuenta />} />

          <Route path='/turnos' element={<TurnosLayout />}>
            <Route path='turnos-reservados' element={<VerTurnos/>} />
            <Route path='solicitar-turno' element={<SolicitarTurno/>} />
          </Route>

          <Route path="/reintegros" element={<ReintegrosLayout />}>
            <Route path="historial-reintegros" element={
              <GenErrorBoundary queryKeyToReset='reintegros' FallbackComponent={() => TramitesFallback({ tipoTramite: 'Reintegros' })}>
                <ReintegroVer />
              </GenErrorBoundary>
            } />
            <Route
              path="solicitar-reintegro"
              element={<ReintegroFormStepOne />}
            />
            <Route path="datos-factura" element={<ReintegroFormStepTwo />} />

            <Route path="editar-reintegro" element={<ReintegroFormStepOne />} />
            <Route
              path="editar-reintegro/datos-factura"
              element={<ReintegroFormStepTwo />}
            />
          </Route>

          <Route path="/recetas" element={<RecetasLayout />}>
            <Route path="ver-recetas" element={<VerRecetas />} />
            <Route path="solicitar-receta" element={<SolicitarReceta />} />
            <Route path="editar/:id" element={<EditarReceta />} />
          </Route>

          <Route path="/autorizaciones" element={<AutorizacionesLayout />}>
            <Route path="ver-autorizaciones" element={
              <GenErrorBoundary queryKeyToReset='autorizaciones' FallbackComponent={() => TramitesFallback({ tipoTramite: 'Autorizaciones' })}>
                <VerAutorizaciones />
              </GenErrorBoundary>
            } />

            <Route
              path="solicitar-autorizacion"
              element={<AutorizacionForm />}
            />
            <Route
              path="editar-autorizacion"
              element={<AutorizacionForm />}
            />
          </Route>

          <Route path="/cartilla-medica" element={<CartillaMedica />} />
        </Route>
      {/* </Route> */}

      {/* Catch all */}
      <Route path="*" element={<h3>Not Found.</h3>} />
      <Route path="/pruebas" element={<Pruebas />} />
    </Routes>
  );
}