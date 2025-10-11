import { useNavigate } from 'react-router-dom';
import { useNuevoReintegroStore } from '../store/nuevoReintegroStore';

export const useNewReintegroHandler = () => {
  const { data, setData } = useNuevoReintegroStore(state => state);
  const navigate = useNavigate();

  const onSubmit = inputData => {
    console.log({ ...data, ...inputData });
    setData({ ...data, ...inputData });
    navigate('/reintegros/datos-factura');
  };

  return { onSubmit };
};
