import {useMutation, useQuery} from '@tanstack/react-query'

const getTurnosFiltrados = async (axiosPrivate, filters) => {
  if(filters.medicoSeleccionado == 'Todos'){
    filters.medicoSeleccionado = ''
  }

  const res = await axiosPrivate.get('/api/turnos', {
    params: {
      especialidad: filters.especialidadSeleccionada,
      localidad: filters.ubicacionSeleccionada,
      prestador: filters.medicoSeleccionado,
      desde: filters.desde
    }
  })
  return res.data;
}


export function useGetTurnosFiltrados (axiosPrivate){
    return useMutation({
        mutationFn: (filters) => getTurnosFiltrados(axiosPrivate, filters)
    })
}

