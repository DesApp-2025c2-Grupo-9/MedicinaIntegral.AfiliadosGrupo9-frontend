import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createReintegro, deleteReintegro, getAfiliado, getEspecialidades, getReintegros, login, register, updateReintegro } from './api';

// Registro
export function useRegister() {
  return useMutation({
    mutationFn: register
  });
}

// Sesión
export function useLogin() {
  return useMutation({
    mutationFn: login
  });
}

// Afiliados
export function useGetAfiliado(axiosClient) { // 2. useGetAfiliado recibe un cliente de axios por parámetro y se lo pasa a la función que hará getAfiliado la petición
  return useQuery({
    queryKey: ['afiliado'],
    queryFn: () => getAfiliado(axiosClient)
  });
}

// Reintegros
export function useGetReintegros(axiosClient) {
  return useQuery({
    queryKey: ['reintegros'],
    queryFn: () => getReintegros(axiosClient)
  });
}

export function useCreateReintegro(axiosClient) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => createReintegro(axiosClient, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reintegros'] });
    }
  });
}

export function useUpdateReintegro(axiosClient) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => updateReintegro(axiosClient, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reintegros'] });
    }
  });
}

export function useDeleteReintegro(axiosClient) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: id => deleteReintegro(axiosClient, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reintegros'] });
    }
  });
}

// Especialidades
export function useGetEspecialidades() {
  return useQuery({
    queryKey: ['especialidades'],
    queryFn: getEspecialidades
  });
}
