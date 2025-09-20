import { Route, Routes } from "react-router-dom";
import Pruebas from "./pages/Pruebas";
import Topbar from './components/Topbar/Topbar';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Topbar />} />
      <Route path="/pruebas" element={<Pruebas />} />
    </Routes>
  );
}
