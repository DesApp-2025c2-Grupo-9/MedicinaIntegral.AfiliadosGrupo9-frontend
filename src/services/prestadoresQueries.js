import { useQuery } from '@tanstack/react-query';
import { getEspecialidades } from './api';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { getLocalidades, getPrestadores } from './prestadoresService';

// Traer especialidades
export const useGetEspecialidades = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['especialidades'],
    queryFn: () => getEspecialidades(axiosPrivate)
  });
};

// Traer localidades
export const useGetLocalidades = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['localidades'],
    queryFn: () => getLocalidades(axiosPrivate)
  });
};

// Traer prestadores según filtros
export const useGetPrestadores = filters => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['prestadores', filters],
    queryFn: () => getPrestadores(axiosPrivate, filters),
    /* queryFn: async () => {
      if (!filters) return [];
      const params = new URLSearchParams();
      if (filters.localidad) params.append('localidad', filters.localidad);
      if (filters.especialidad) params.append('especialidad', filters.especialidad);

      const res = await axiosPrivate.get(`/api/prestadores?${params.toString()}`);
      return res.data;
    }, */
    enabled: !!filters
  });
};
