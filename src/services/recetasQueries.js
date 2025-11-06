import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const getRecetas = async (axiosClient, idAfiliado) => {
  const res = await axiosClient.get(`api/recetas/${idAfiliado}`);
  return res.data;
};

export function useGetRecetas(idAfiliado) {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["recetas", idAfiliado],
    queryFn: () => getRecetas(axiosPrivate, idAfiliado),
  });
}
const getRecetaById = async (axiosClient, id) => {
  const res = await axiosClient.get(`api/receta/${id}`); // <-- Ruta NUEVA y correcta
  return res.data;
};

export function useGetRecetaById(id) {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["receta", id],
    queryFn: () => getRecetaById(axiosPrivate, id),
    enabled: !!id,
  });
}
const createReceta = async (axiosClient, body) => {
  const res = await axiosClient.post("api/recetas", body);
  return res.data;
};

export function useCreateReceta() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: (data) => createReceta(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recetas"] });
    },
  });
}

const updateReceta = async (axiosPrivate, body) => {
  const res = await axiosPrivate.put(`api/recetas/${body.id}`, body.data);
  return res.data;
};
export function useUpdateReceta() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: (data) => updateReceta(axiosPrivate, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["receta", variables.id],
      });
    },
  });
}
const deleteReceta = async (axiosPrivate, id) => {
  const res = await axiosPrivate.patch(`api/recetas/${id}`, {});
  return res.data;
};
export function useDeleteReceta() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  return useMutation({
    mutationFn: (id) => deleteReceta(axiosPrivate, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recetas"] });
    },
  });
}
const commentRecetaById = async (axiosPrivate, body) => {
  console.log(body);
  const res = await axiosPrivate.post(`api/recetas/${body.id}`, body);
  return res.data;
};

export function useCommentRecetaById() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => commentRecetaById(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recetas"] });
    },
  });
}
