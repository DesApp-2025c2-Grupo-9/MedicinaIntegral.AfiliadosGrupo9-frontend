import { useEffect } from 'react';
import { useReintegroStore } from '../store/reintegroStore';
import { useNavigate } from 'react-router-dom';

export const useFormRedirect = isSubmitSuccessful => {
  const reintegro = useReintegroStore(state => state.reintegro);
  const navigate = useNavigate();

  useEffect(() => {
    if (!useReintegroStore.persist.hasHydrated) return;

    const primerPasoCompleto = reintegro.paraAfiliado && reintegro.fechaDePrestacion && reintegro.especialidad && reintegro.medico && reintegro.lugarDeAtencion;
    if (!primerPasoCompleto && !isSubmitSuccessful) {
      navigate('/reintegros/solicitar-reintegro');
    }
  }, [reintegro, navigate, isSubmitSuccessful]);
};
