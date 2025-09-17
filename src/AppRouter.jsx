import { Route, Routes } from "react-router-dom";
import NavButton from './components/NavButton';

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<NavButton />} />
    </Routes>
  );
}