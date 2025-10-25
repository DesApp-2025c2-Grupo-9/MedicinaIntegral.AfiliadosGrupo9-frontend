import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from '../hooks/useAxiosPrivate';

//Get All para cargar las cards

const getAllAutorizaciones = async axiosPrivate => {
    const res = await axiosPrivate.get(
        'api/autorizaciones'
    )
    return res.data
}

const createAutorizacion = async (axiosPrivate, body) => {
    const res = await axiosPrivate.post(
        'api/autorizaciones', body
    )
    return res.data
}

const deleteAutorizacion = async (axiosPrivate, id) => {
    const res = await axiosPrivate.patch(
        `api/autorizaciones/${id}`, {}
    )
    return res.data
}

const updateAutorizacion = async (axiosPrivate, body) => {
    console.log(body);
    const res = await axiosPrivate.put(
        `api/autorizaciones/${body.id}`, body.data
    )
    return res.data
}

export function useGetAllAutorizaciones () {
  const axiosPrivate = useAxiosPrivate();
    return useQuery({
        queryKey: ['autorizaciones'],
        queryFn: () => getAllAutorizaciones(axiosPrivate)
    })
}

export function useCreateAutorizacion() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: (data) => createAutorizacion(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['autorizaciones'] });
    }
  });
}

export function useDeleteAutorizacion() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: id => deleteAutorizacion(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['autorizaciones'] });
    }
  });
}

export function useUpdateAutorizacion() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: (data) => updateAutorizacion(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['autorizaciones'] });
    }
  });
}
