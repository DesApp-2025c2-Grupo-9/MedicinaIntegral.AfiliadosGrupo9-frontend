import {useQuery} from '@tanstack/react-query'
import axios, { axiosPrivate } from '../api/axios'

//Get all especialidades de los prestadores

const getAllEspecialidades = async () => {
    const res = await axios.get(
        'api/newEspecialidades'
    )
    return res.data
}

export function useGetAllEspecialidades (){
    return useQuery({
        queryKey: ['newEspecialidades'],
        queryFn: () => getAllEspecialidades()
    })
}

//Obtener las ubicaciones del prestador por especialidad

const getUbicacionesByEspecialidad = async () =>{
    const res = await axios.get(
        `api/prestadores/especialidades/localidades`
    )
    return res.data
}
export function useGetUbicacionesByEspecialidad (){
    return useQuery({
        queryKey: ['ubiByEspecialidad'],
        queryFn: () => getUbicacionesByEspecialidad()
    })
}

