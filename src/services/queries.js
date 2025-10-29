import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { commentReintegroById, createReintegro, deleteReintegro, getAfiliado, getEspecialidades, getReintegros, login, register, updateReintegro } from './api';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

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
export function useGetAfiliado() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['afiliado'],
    queryFn: () => getAfiliado(axiosPrivate)
  });
}

// Reintegros
export function useGetReintegros() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['reintegros'],
    queryFn: () => getReintegros(axiosPrivate)
  });
}

export function useCreateReintegro() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => createReintegro(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reintegros'] });
    }
  });
}

export function useUpdateReintegro() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => updateReintegro(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reintegros'] });
    }
  });
}

export function useDeleteReintegro() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: id => deleteReintegro(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reintegros'] });
    }
  });
}

export function useCommentReintegroById() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => commentReintegroById(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reintegros'] });
    }
  })
}

// Especialidades
export function useGetEspecialidades() {
  // const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['especialidades'],
    queryFn: () => getEspecialidades()
  });
}