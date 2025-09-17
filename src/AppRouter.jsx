import { Route, Routes } from "react-router-dom";
import Input from './components/Input';

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Input id={'holaMundo'} label={'Nombre:'} placeholder={'Ingresar nombre'} />} />
    </Routes>
  );
}