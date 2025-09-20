import { Route, Routes } from "react-router-dom";
import Pruebas from "./pages/Pruebas";
import MainLayout from './layout/MainLayout';
import SectionTitle from './components/SectionTitle'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<SectionTitle text={"Inicio"}/>} /> 
        <Route path='/mi-cuenta' element={<h1>Mi cuenta.</h1>} />
        <Route path='/turnos' element={<h1>Turnos.</h1>} />
        <Route path='/reintegros' element={<h1>Reintegros.</h1>} />
        <Route path='/recetas' element={<h1>Recetas.</h1>} />
        <Route path='/autorizaciones' element={<h1>Autorizaciones.</h1>} />
        <Route path='/cartilla-medica' element={<h1>Cartilla Médica.</h1>} />
      </Route>
      
      <Route path="/pruebas" element={<Pruebas />} />

    </Routes>
  );
}
