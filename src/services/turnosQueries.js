import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import useAxiosPrivate from '../hooks/useAxiosPrivate';

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

//Get localidades por especialidad
const getLocalidadesPorEspecialidad = async (axiosPrivate, especialidad) => {
  //Especialidad como query.param
  const res = await axiosPrivate.get('/api/turnos/localidades',{
    params: {especialidad: especialidad}
  })
  return res.data
}

export function useGetLocalidadesPorEspecialidad(axiosPrivate, especialidad) {
  return useQuery({
    queryKey: ['localidades', especialidad],
    queryFn: () => getLocalidadesPorEspecialidad(axiosPrivate, especialidad),
    enabled: !!especialidad
  })
}

//Get prestadores por especialidad y ubicacion

const getPrestadoresPorEspecialidadYLocalidad = async(axiosPrivate, especialidad, localidad) => {
  const res= await axiosPrivate.get('/api/turnos/prestadores',{
    params: {especialidad: especialidad, localidad: localidad}
  })
  return res.data
}

export function useGetPrestadoresPorEspecialidadYLocalidad (axiosPrivate, especialidad, localidad) {
  return useQuery({
    queryKey: ['prestadores',especialidad, localidad],//La clave y Las dependencias
    queryFn: () => getPrestadoresPorEspecialidadYLocalidad(axiosPrivate, especialidad, localidad),
    enabled: !!especialidad && !!localidad //Se ejecuta automáticamente
  })
}

//Get Turnos Disponibles
const getTurnosFiltrados = async (axiosPrivate, especialidad, localidad, prestador) => {
  const res = await axiosPrivate.get('api/turnos/filtrados',{
    params: {especialidad: especialidad, localidad: localidad, prestador: prestador}
  })
  return res.data;
}

export function useGetTurnosFiltrados(axiosPrivate, especialidad, localidad, prestador) {
  return useQuery({
    queryKey: ['turnos', especialidad, localidad, prestador],
    queryFn: () => getTurnosFiltrados(
      axiosPrivate, especialidad, localidad, prestador
    ),
    enabled: false //Se ejecuta solo cuando disparo la query
  })
}


//Reservar turno
const reservarTurno = async (axiosPrivate, data) => {
  const {idTurno, idAfiliado} = data

  const res = await axiosPrivate.patch(
    'api/turnos/reservarTurno', // 1er argumento: URL
    {}, // 2do argumento: data (body) - Un objeto vacío
    {  // 3er argumento: config
      params: { // Los params van DENTRO del config
        idTurno: idTurno,
        idAfiliado: idAfiliado
      }
    }
  );
  return res.data;
}

export function useReservarTurno() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => reservarTurno(axiosPrivate, data),

    onSuccess: () => {
      console.log('Turno reservado, invalidando queries...')
      // Invalida la query principal de la búsqueda
      queryClient.invalidateQueries({ queryKey: ['turnos'] });
      
      // Invalida los filtros, porque quizás ya no quedan turnos para esa especialidad
      queryClient.invalidateQueries({ queryKey: ['especialidadesConTurno'] });
      queryClient.invalidateQueries({ queryKey: ['localidades'] });
      queryClient.invalidateQueries({ queryKey: ['prestadores'] });
      
      //Invalida la query de turnosPorAfiliado
      queryClient.invalidateQueries({ queryKey: ['turnosPorAfiliado'] });
    }
  })
}

//Obtener los turnos de un afiliado:
const getTurnosPorAfiliado = async (axiosPrivate, idAfiliado) => {
  const res = 
    await axiosPrivate.get(
      `api/turnos/afiliado/${idAfiliado}`
    )
    return res.data;
}

export function useGetTurnosPorAfiliado (axiosPrivate, idAfiliado){
  return useQuery({
    queryKey: ['turnosPorAfiliado', idAfiliado],
    queryFn: () => getTurnosPorAfiliado(axiosPrivate, idAfiliado),
    enabled: !!idAfiliado
  })

}

//Anular la reserva de un turno
const anularReserva = async (axiosPrivate, data) => {
  const {idTurno, idAfiliado} = data;
  const res = await axiosPrivate.patch(
    'api/turnos/cancelarTurno',
    {
        idTurno: idTurno,
        idAfiliado: idAfiliado
    }
  );
  return res.data;
}

export function useAnularReserva () {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => anularReserva(axiosPrivate, data),

    onSuccess: () => {
      console.log('Turno eliminado, invalidando queries...')
      // Invalida la query principal de la búsqueda
      queryClient.invalidateQueries({ queryKey: ['turnos'] });
      
      // Invalida los filtros, porque quizás ya no quedan turnos para esa especialidad
      queryClient.invalidateQueries({ queryKey: ['especialidadesConTurno'] });
      queryClient.invalidateQueries({ queryKey: ['localidades'] });
      queryClient.invalidateQueries({ queryKey: ['prestadores'] });
      
      //Invalida la query de turnosPorAfiliado
      queryClient.invalidateQueries({ queryKey: ['turnosPorAfiliado'] });
    }
  })

}