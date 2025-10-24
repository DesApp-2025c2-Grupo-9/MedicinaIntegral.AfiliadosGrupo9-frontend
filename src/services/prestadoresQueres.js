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

/*
    La query debajo obitne euna estructura como la siguiente:
    [
        {
            "especialidad": 'Oftalmologia",
            "localidades": {
                "Flores": [ //Aca están los médicos
                {"nombrecompleto" : "Dra. Carolina Duarte", "integraCentroMedico": null},
                ...
                ]
            }
        },...
    ]
*/

const getUbicacionesByEspecialidadMedicos = async () =>{
    const res = await axios.get(
        `api/prestadores/especialidades/localidades/medicos`
    )
    return res.data
}
export function useGetUbicacionesByEspecialidadMedicos (){
    return useQuery({
        queryKey: ['ubiByEspecialidadMedicos'],
        queryFn: () => getUbicacionesByEspecialidadMedicos()
    })
}

