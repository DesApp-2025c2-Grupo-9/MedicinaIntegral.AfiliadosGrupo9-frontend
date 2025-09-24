import { Outlet, useNavigate } from 'react-router-dom'
import Button from '../components/Button'

function PreLayout() {
  const navigate = useNavigate();

  return (
    <>
      <i>Implementar layout de las páginas de Registro e Inicio de sesión.</i>
      <Button onClick={() => navigate('/')} >Ir a Inicio</Button>
      <Outlet />
    </>
  )
}
export default PreLayout