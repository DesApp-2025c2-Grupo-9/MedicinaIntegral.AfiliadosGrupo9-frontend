import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '../api/axios'

//Get all Recetas para probar
const getRecetas = async () => {
    const res = await axios.get(
        `api/recetas`
    )
    return res.data
}

export function useGetRecetas () {
    return useQuery({
        queryKey: ['recetas'],
        queryFn: getRecetas
    })
}


//Recetas del grupo familiar
const getRecetasFamilia = async nroAfiliadoParcial => {
    const res = await axios.get(
        `api/recetas/familia/${nroAfiliadoParcial}`
    )
    return res.data;
}
export function useGetRecetasFamilia (nroAfiliadoParcial) {
    return useQuery({
        queryKey: ['recetas'], nroAfiliadoParcial,
        queryFn: () => getRecetasFamilia(nroAfiliadoParcial)
    })
}


//create Receta
const createReceta = async body => {
    const res = await axios.post('api/recetas', body)
    return res.data;
}
export function useCreateReceta() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createReceta,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recetas']})
        }
    })
}

//Patch Receta
const updateReceta = async body => {
    const res = await axios.patch(`api/recetas/${body.id}`, body.data)
    return res.data;
}
export function useUpdateReceta () {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateReceta,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['recetas']})
        }
    })
}

//Delete Receta
const deleteReceta = async id => {
    const res = await axios.delete(`api/recetas/${id}`);
    return res.data
}
export function useDeleteReceta() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteReceta,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['recetas']})
        }
    })
}







