import { Route, Routes } from "react-router-dom";
import SidebarLink from './components/SidebarLink';
import { icons } from './utils/icons';

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<SidebarLink icon={icons.cartillaMedica} description='Cartilla Médica' />} />
    </Routes>
  );
}