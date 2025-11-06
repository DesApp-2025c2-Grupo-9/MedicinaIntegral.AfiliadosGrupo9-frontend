import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const getUltimosTurnos= async (axiosPrivate, idAfiliado) => {
    const res = await axiosPrivate.get(
        `api/dashboard/turnos/${idAfiliado}`
    )
    return res.data
}

const getUltimosTramites= async (axiosPrivate, idAfiliado) => {
    const res = await axiosPrivate.get(
        `api/dashboard/tramites/${idAfiliado}`
    )
    return res.data
}


export const useGetUltimosTurnos = ( idAfiliado ) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['turnos', {idAfiliado}],
    queryFn: () => getUltimosTurnos(axiosPrivate, idAfiliado)
  });
};

export const useGetUltimosTramites = ( idAfiliado ) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['autorizaciones', 'recetas', 'reintegros', {idAfiliado}],
    queryFn: () => getUltimosTramites(axiosPrivate, idAfiliado)
  });
};