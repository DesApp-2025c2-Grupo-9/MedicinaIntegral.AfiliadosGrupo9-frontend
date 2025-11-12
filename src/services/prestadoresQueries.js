import { useQuery } from "@tanstack/react-query";
import { getEspecialidades } from "./api";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { getLocalidades, getPrestadores } from "./prestadoresService";
import { isNil } from "lodash";

// Traer especialidades
export const useGetEspecialidades = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["especialidades"],
    queryFn: () => getEspecialidades(axiosPrivate),
  });
};

// Traer localidades
export const useGetLocalidades = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["localidades"],
    queryFn: () => getLocalidades(axiosPrivate),
  });
};

// Traer prestadores según filtros
export const useGetPrestadores = (filters) => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["prestadores", filters],
    queryFn: () => getPrestadores(axiosPrivate, filters),

    enabled:
      !isNil(filters?.localidad) &&
      filters?.localidad !== "" &&
      !isNil(filters?.especialidad) &&
      filters?.especialidad !== "",
  });
};
