import { Route, Routes } from "react-router-dom";
import Reintegros from "./pages/Reintegros";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<h1>Hola Mundo</h1>} />
      <Route path="/reintegros" element={<Reintegros />} />
    </Routes>
  );
}
