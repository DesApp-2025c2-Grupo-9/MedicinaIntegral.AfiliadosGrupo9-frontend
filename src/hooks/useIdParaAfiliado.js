import { useGetAfiliado } from '../services/queries';

export const useIdParaAfiliado = () => {
  const { data } = useGetAfiliado();
  const grupoFamiliar = data?.data?.grupoFamiliar;

  const idParaAfiliado = paraAfiliado => {
    const unAfiliado = grupoFamiliar.find(familiar => paraAfiliado.includes(familiar.nombre) && paraAfiliado.includes(familiar.apellido));
    return unAfiliado?.id;
  };

  return { idParaAfiliado };
};
