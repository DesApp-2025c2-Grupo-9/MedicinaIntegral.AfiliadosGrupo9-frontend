import { Route, Routes } from "react-router-dom";
import NavButton from './components/NavButton';
import PruebaCards from "./pages/PruebaCards";


export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<NavButton />} />
      <Route path='pruebaCards' element={<PruebaCards/>} />
    </Routes>
  );
}