import { Route, Routes } from "react-router-dom";
import AvatarAfiliado from './components/AvatarAfiliado/AvatarAfiliado';

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<AvatarAfiliado />} /> 
    </Routes>
  );
}