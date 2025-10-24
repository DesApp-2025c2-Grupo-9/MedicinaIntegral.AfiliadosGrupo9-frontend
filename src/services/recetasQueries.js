import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
// import axios, { axiosPrivate } from "../api/axios";

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
    mutationFn: data => createReceta(axiosPrivate, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recetas"] });
    },
  });
}

// //Patch Receta
// const updateReceta = async body => {
//     const res = await axios.patch(`api/recetas/${body.id}`, body.data)
//     return res.data;
// }
// export function useUpdateReceta () {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: updateReceta,
//         onSuccess: () => {
//             queryClient.invalidateQueries({queryKey: ['recetas']})
//         }
//     })
// }

// //Delete Receta
// const deleteReceta = async id => {
//     const res = await axios.delete(`api/recetas/${id}`);
//     return res.data
// }
// export function useDeleteReceta() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: deleteReceta,
//         onSuccess: () => {
//             queryClient.invalidateQueries({queryKey: ['recetas']})
//         }
//     })
// }
