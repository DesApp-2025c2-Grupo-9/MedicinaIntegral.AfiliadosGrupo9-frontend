import { useLocation, useNavigate } from 'react-router-dom';
import { useReintegroStore } from '../store/reintegroStore';

export const useReintegroStepOneHandler = () => {
  const reintegro = useReintegroStore(state => state.reintegro);
  const setReintegro = useReintegroStore(state => state.setReintegro);
  const location = useLocation();
  const navigate = useNavigate();
  const nextPath = location.pathname === '/reintegros/solicitar-reintegro' ? '/reintegros/datos-factura' : '/reintegros/editar-reintegro/datos-factura';

  const onSubmit = inputData => {
    setReintegro({ ...reintegro, ...inputData });
    navigate(nextPath);
  };

  return { onSubmit };
};
