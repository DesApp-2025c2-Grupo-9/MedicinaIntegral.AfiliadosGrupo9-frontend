import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { commentReintegroById, createReintegro, deleteReintegro, getAfiliado, getReintegros, login, register, updateReintegro, getEspecialidades } from './api';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useUserStore } from '../store/userStore';

// Registro & Sesión
export function useRegister() {
  return useMutation({
    mutationFn: register
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: login
  });
}

// Afiliados
export function useGetAfiliado() {
  const axiosPrivate = useAxiosPrivate();
  const user = useUserStore(state => state.user);
  const rolSesion = user?.rolSesion;

  return useQuery({
    queryKey: ['afiliado', { rolSesion }],
    queryFn: () => getAfiliado(axiosPrivate)
  });
}

// Reintegros
export function useGetReintegros() {
  const axiosPrivate = useAxiosPrivate();
  const user = useUserStore(state => state.user);
  const idAfiliado = user?.idAfiliado;

  return useQuery({
    queryKey: ['reintegros', { idAfiliado }],
    queryFn: () => getReintegros(axiosPrivate, idAfiliado)
  });
}

export function useCreateReintegro() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => createReintegro(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reintegros'], exact: false });
    }
  });
}

export function useUpdateReintegro() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => updateReintegro(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reintegros'], exact: false });
    }
  });
}

export function useDeleteReintegro() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: id => deleteReintegro(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reintegros'], exact: false });
    }
  });
}

export function useCommentReintegroById() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => commentReintegroById(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reintegros'], exact: false });
    }
  });
}

// Especialidades
export function useGetEspecialidades() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['especialidades'],
    queryFn: () => getEspecialidades(axiosPrivate)
  });
}
