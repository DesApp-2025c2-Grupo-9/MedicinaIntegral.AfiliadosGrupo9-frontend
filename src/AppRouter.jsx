import { Route, Routes } from "react-router-dom";
import SidebarLink from './components/Sidebar/SidebarLink';
import { icons } from './utils/icons';
import Sidebar from './components/Sidebar/Sidebar';

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Sidebar />} />
    </Routes>
  );
}