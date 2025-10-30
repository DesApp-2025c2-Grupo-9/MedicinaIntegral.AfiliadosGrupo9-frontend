import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const getRecetas = async (axiosClient) => {
  const res = await axiosClient.get("api/recetas");
  return res.data;
};

export function useGetRecetas() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["recetas"],
    queryFn: () => getRecetas(axiosPrivate),
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recetas"] });
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
