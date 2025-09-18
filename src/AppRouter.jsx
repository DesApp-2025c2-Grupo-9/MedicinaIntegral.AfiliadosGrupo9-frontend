import { Route, Routes } from "react-router-dom";
import PruebaCards from "./pages/PruebaCards";


export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<h1>Hola Mundo</h1>} />
      <Route path='pruebaCards' element={<PruebaCards/>} />
    </Routes>
  );
}