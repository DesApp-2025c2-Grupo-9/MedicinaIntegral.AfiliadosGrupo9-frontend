import { Route, Routes } from "react-router-dom";
import Pruebas from "./pages/Pruebas";
import MainLayout from "./layout/MainLayout";
import SectionTitle from "./components/SectionTitle";
import PruebaCards from "./pages/PruebaCards";
import PreLayout from "./layout/PreLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReintegroVer from "./pages/Reintegro/ReintegroVer";
import Inicio from "./pages/Inicio";
import ReintegrosLayout from "./layout/ReintegrosLayout";

export function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<PreLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Rutas protegidas */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/mi-cuenta" element={<h1>Mi cuenta.</h1>} />
        <Route path="/turnos" element={<h1>Turnos.</h1>} />

        <Route path="/reintegros" element={<ReintegrosLayout />}>
          <Route path="ver-reintegro" element={<ReintegroVer />} />
          <Route path="solicitar-reintegro" element={<p>Solicitar turno</p>} />
        </Route>

        <Route path="/recetas" element={<h1>Recetas.</h1>} />
        <Route path="/autorizaciones" element={<h1>Autorizaciones.</h1>} />
        <Route path="/cartilla-medica" element={<h1>Cartilla Médica.</h1>} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<h1>Not Found.</h1>} />

      <Route path="/pruebaCards" element={<PruebaCards />} />
      <Route path="/pruebas" element={<Pruebas />} />
    </Routes>
  );
}
