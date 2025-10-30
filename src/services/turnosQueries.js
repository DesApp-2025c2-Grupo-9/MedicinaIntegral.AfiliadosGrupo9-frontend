import {useMutation, useQuery} from '@tanstack/react-query'

export const useGetTurnosFiltrados = async (axiosPrivate, filters) => {
  const {
    especialidadSeleccionada,
    ubicacionSeleccionada,
    medicoSeleccionado,
    desde
  } = filters;

  const res = await axiosPrivate.get('/api/turnos', {
    params: {
      especialidad: especialidadSeleccionada,
      localidad:   ubicacionSeleccionada,
      prestador:   medicoSeleccionado && medicoSeleccionado !== 'Todos' ? medicoSeleccionado : undefined,
      desde:       desde || undefined
    }
  });
  return res.data;
};


//Get para especialidades (no cambian, solo se piden una vez)
const getEspecialidadesConTurno = async (axiosPrivate) => {
  const res = await axiosPrivate.get('/api/turnos/especialidades')
  return res .data;
}

export function useGetEspecialidadesConTurno (axiosPrivate){
  return useQuery({
    queryKey: ['especialidadesConTurno'],
    queryFn: () => getEspecialidadesConTurno(axiosPrivate)
  })
}

//Mutation para localidades
const getLocalidades = async (axiosPrivate, { especialidad, desde }) => {
  const res = await axiosPrivate.get('/api/turnos/localidades', {
    params: { especialidad, desde: desde || undefined }
  });
  return res.data;
};

export function useGetLocalidades (axiosPrivate){
  return useMutation({
    mutationFn: (filter) => getLocalidades(axiosPrivate, filter)
  });
}


//Mutation para prestadores
const getPrestadores = async (axiosPrivate, { especialidad, localidad, desde }) => {
  const res = await axiosPrivate.get('/api/turnos/prestadores', {
    params: { especialidad, localidad, desde: desde || undefined }
  });
  return res.data;
};

export function useGetPrestadores (axiosPrivate){
  return useMutation({
    mutationFn: (filter) => getPrestadores(axiosPrivate, filter)
  });
}
