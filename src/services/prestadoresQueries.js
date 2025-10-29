import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../api/axios";

// Traer especialidades
export const useGetEspecialidades = () => {
  return useQuery({
    queryKey: ["especialidades"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/api/enums/especialidades");
      return res.data;
    },
  });
};

// Traer localidades
export const useGetLocalidades = () => {
  return useQuery({
    queryKey: ["localidades"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/api/enums/localidades");
      return res.data;
    },
  });
};

// Traer prestadores según filtros
export const useGetPrestadores = (filters) => {
  return useQuery({
    queryKey: ["prestadores", filters],
    queryFn: async () => {
      if (!filters) return [];
      const params = new URLSearchParams();
      if (filters.localidad) params.append("localidad", filters.localidad);
      if (filters.especialidad)
        params.append("especialidad", filters.especialidad);

      const res = await axiosPrivate.get(
        `/api/prestadores?${params.toString()}`
      );
      return res.data;
    },
    enabled: !!filters,
  });
};
