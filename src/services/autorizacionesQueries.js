import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from '../api/axios'

//Get All para cargar las cards

const getAllAutorizaciones = async () => {
    const res = await axios.get(
        'api/autorizaciones'
    )
    return res.data
}

export function useGetAllAutorizaciones () {
    return useQuery({
        queryKey: ['autorizaciones'],
        queryFn: getAllAutorizaciones
    })
}