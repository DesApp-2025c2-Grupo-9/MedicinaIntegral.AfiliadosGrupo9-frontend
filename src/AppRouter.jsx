import { Route, Routes } from "react-router-dom";
import Pruebas from "./pages/Pruebas";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<h1>Hola Mundo</h1>} />
      <Route path="/pruebas" element={<Pruebas />} />
    </Routes>
  );
}
