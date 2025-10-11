import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createReintegro, deleteReintegro, getReintegros, updateReintegro } from './api';

// Reintegros
export function useGetReintegros() {
  return useQuery({
    queryKey: ['reintegros'],
    queryFn: getReintegros
  });
}

export function useCreateReintegro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReintegro,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reintegros'] });
    }
  });
}

export function useUpdateReintegro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateReintegro,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reintegros'] });
    }
  });
}

export function useDeleteReintegro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReintegro,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reintegros'] });
    }
  });
}
