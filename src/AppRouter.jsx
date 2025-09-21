import { Route, Routes } from "react-router-dom";
import Pruebas from "./pages/Pruebas";
import MainLayout from './layout/MainLayout';
import SectionTitle from './components/SectionTitle'
import PruebaCards from "./pages/PruebaCards";
import PreLayout from './layout/PreLayout';


export function AppRouter() {
  return (
    <Routes>

      {/* Rutas públicas */}
      <Route element={<PreLayout />} >
        <Route path='/register' element={<h1>Ruta /register</h1>} />
        <Route path='/login' element={<h1>Ruta /login</h1>} />
      </Route>

      {/* Rutas protegidas */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<SectionTitle text={"Inicio"}/>} /> 
        <Route path='/mi-cuenta' element={<h1>Mi cuenta.</h1>} />
        <Route path='/turnos' element={<h1>Turnos.</h1>} />
        <Route path='/reintegros' element={<h1>Reintegros.</h1>} />
        <Route path='/recetas' element={<h1>Recetas.</h1>} />
        <Route path='/autorizaciones' element={<h1>Autorizaciones.</h1>} />
        <Route path='/cartilla-medica' element={<h1>Cartilla Médica.</h1>} />
      </Route>

      {/* Catch all */}
      <Route path='*' element={<h1>Not Found.</h1>} />

      <Route path='/pruebaCards' element={<PruebaCards/>} /> 
      <Route path="/pruebas" element={<Pruebas />} />

    </Routes>
  );
}
