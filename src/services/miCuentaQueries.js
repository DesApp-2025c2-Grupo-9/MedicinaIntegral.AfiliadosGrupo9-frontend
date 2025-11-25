import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import axios from 'axios'
import { axiosPrivate } from '../api/axios';
import { useUserStore } from '../store/userStore';


// Api
const getMiCuenta = async axiosClient => {
  const res = await axiosClient.get('/api/mi-cuenta');
  return res.data;
};

const registrarCbu = async (axiosClient, body) => {
  const res = await axiosClient.post('/api/mi-cuenta/cbu', body);
  return res.data;
};

const setCbuPrincipal = async (axiosClient, body) => {
  const res = await axiosClient.put('/api/mi-cuenta/cbu', body);
  return res.data;
};

// Queries
export function useGetMiCuenta() {
  const axiosPrivate = useAxiosPrivate();
  const user = useUserStore(state => state.user);
  const rolSesion = user?.rolSesion;

  return useQuery({
    queryKey: ['mi-cuenta', { rolSesion }],
    queryFn: () => getMiCuenta(axiosPrivate)
  });
}

export function useRegistrarCbu() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => registrarCbu(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mi-cuenta'], exact: false });
    }
  });
}

export function useSetCbuPrincipal() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: data => setCbuPrincipal(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mi-cuenta'], exact: false });
    }
  });
}

export const useEditarCbu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (datos) => {
      return axiosPrivate.put(`/api/mi-cuenta/cbu-principal/${datos.cbuPrincipal}`, datos);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mi-cuenta'] });
    }
  });
};




export const useEliminarCbu = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (idCbu) => {
      const res = await axiosPrivate.delete(`/api/mi-cuenta/cbu-principal/${idCbu}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mi-cuenta'] });
    }
  });
};
