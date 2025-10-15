import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { axiosPrivate } from '../api/axios'

//Get All para cargar las cards

const getAllAutorizaciones = async axiosPrivate => {
    const res = await axiosPrivate.get(
        'api/autorizaciones'
    )
    return res.data
}

export function useGetAllAutorizaciones (axiosPrivate) {
    return useQuery({
        queryKey: ['autorizaciones'],
        queryFn: () => getAllAutorizaciones(axiosPrivate)
    })
}

