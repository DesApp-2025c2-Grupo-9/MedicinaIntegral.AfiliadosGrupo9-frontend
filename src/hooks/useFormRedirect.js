import { useEffect } from 'react';
import { useNuevoReintegroStore } from '../store/nuevoReintegroStore';
import { useNavigate } from 'react-router-dom';

export const useFormRedirect = isSubmitSuccessful => {
  const { data } = useNuevoReintegroStore(state => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!useNuevoReintegroStore.persist.hasHydrated) return;

    const primerPasoCompleto = data.paraAfiliado && data.fechaDePrestacion && data.especialidad && data.medico && data.lugarDeAtencion;
    if (!primerPasoCompleto && !isSubmitSuccessful) {
      navigate('/reintegros/solicitar-reintegro');
    }
  }, [data, navigate, isSubmitSuccessful]);
};
