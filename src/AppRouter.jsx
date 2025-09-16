import { Route, Routes } from "react-router-dom";

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<h1>Hola Mundo</h1>} />
    </Routes>
  );
}