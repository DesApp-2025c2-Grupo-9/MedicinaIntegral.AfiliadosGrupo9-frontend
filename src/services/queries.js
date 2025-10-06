import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createReintegro, getReintegros } from './api';

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

export function useUpdateReintegro() {}

export function useDeleteReintegro() {}
