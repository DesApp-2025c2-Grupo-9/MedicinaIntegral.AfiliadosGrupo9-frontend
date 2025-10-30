import Select from '../../components/Select'
import InputContainer from '../../components/InputContainer'
import Button from '../../components/Button'
import TurnosCard from '../../components/cards/cards/TurnosCard'
import { useUserStore } from '../../store/userStore';
import { useState } from 'react';
import { useGetEspecialidadesConTurno, useGetLocalidades, useGetPrestadores, useGetTurnosFiltrados } from '../../services/turnosQueries';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function SolicitarTurno() {
  const axiosPrivate = useAxiosPrivate();

  const buscarTurnos = useGetTurnosFiltrados(axiosPrivate)
  const obtenerUbicaciones = useGetLocalidades(axiosPrivate)
  const obtenerPrestadores = useGetPrestadores(axiosPrivate)
  //Manejo de estados para cargar progresivamente las opciones
  const [especialidadSeleccionadaObj, setEspecialidadSeleccionadaObj] = useState(null)

  //Datos para cargar la query y buscar turnos
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('')
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState('')
  const [medicoSeleccionado, setMedicoSeleccionado] = useState('');
  const [turnos, setturnos] = useState([])
  
  const { user } = useUserStore(state => state);
  //Datos de los Select
    //Especialidades
  const {data: especialidades = []} = useGetEspecialidadesConTurno()
    //Ubicaciones
  const [ubicaciones, setUbicaciones] = useState([])
    //Médicos
  const [medicos, setMedicos] = useState([])

  const listaAfiliados = user.grupoFamiliar?.map(familiar => `${familiar.nombre} ${familiar.apellido}`);

  const handleEspecialidadChange = (e) => {
    const nuevaEspecialidad = e.target.value;
    const especialidadObj = ubisByEspecialidadMedicos.find(
      item => item.especialidad === nuevaEspecialidad
    );
    setEspecialidadSeleccionada(nuevaEspecialidad);
    setEspecialidadSeleccionadaObj(especialidadObj);
    //Mutar la lista de ubicaciones
    obtenerUbicaciones.mutate({
      especialidad: nuevaEspecialidad, desde: new Date().toISOString()
    }, {
      onSuccess: (data) => {setUbicaciones(data)}
    })
    setUbicacionSeleccionada('');
    setmedicosDisponibles([]);
    setMedicoSeleccionado('')
  };

  const handleUbicacionChange = (e) => {
    const nuevaUbicacion = e.target.value;
    setUbicacionSeleccionada(nuevaUbicacion);
    const filters = {especialidadSeleccionada, ubicacionSeleccionada}
    //Mutar los médicos
    obtenerPrestadores.mutate({
      especialidad: especialidadSeleccionada, localidad: nuevaUbicacion, desde: new Date().toISOString()
    },{
      onSuccess: (data) => {setMedicos(data)}
    }
    )
    const medicos = especialidadSeleccionadaObj?.localidades?.[nuevaUbicacion] || [];
    const opciones = ['Todos', ...medicos.map(m => m.nombreCompleto)];
    setmedicosDisponibles(opciones);
    setMedicoSeleccionado('')

  };

  const cargarTurnos = () => {
    const filters = {
      especialidadSeleccionada,
      ubicacionSeleccionada,
      medicoSeleccionado: medicoSeleccionado || undefined,
      desde: new Date().toISOString()
    }
    buscarTurnos.mutate(filters,{
      onSuccess: (data) => {
        setturnos(data)
      }
    })

  }


  return (
    <div>
      <InputContainer>
        {
          listaAfiliados.length > 1 &&
          <Select placeholder='Para afiliado' label={'Para afiliado'} options={listaAfiliados} />
        }
        <Select
          placeholder='Especialidad'
          label={'Especialidad'}
          options={especialidades}
          onChange={handleEspecialidadChange}
        />
        {especialidadSeleccionada &&
          <Select
            placeholder='Seleccionar ubicación'
            label={'Ubicación'}
            options={ubicaciones}
            onChange={handleUbicacionChange}
            disabled={!especialidadSeleccionada}
          />
        }
        {ubicacionSeleccionada &&
          <Select 
            placeholder='Seleccionar profesional' 
            label={'Profesional (opcional)'}
            options={medicos}
            onChange={
              e => {
                setMedicoSeleccionado(e.target.value)
              }
            }
          />
        }
      </InputContainer>
      <Button 
        disabled={!especialidadSeleccionada || !ubicacionSeleccionada}
        onClick={cargarTurnos}
      >
        {buscarTurnos.isPending ? 'Buscando ...' : 'Buscar disponibilidad' }
      </Button>
      <div>
        <p>Turnos disponibles</p>
        {buscarTurnos.isError && <p>Error al buscar turnos</p>}
        {!buscarTurnos.isPending && buscarTurnos.isSuccess && turnos.length === 0 && (
          <p>No hay turnos disponibles para el prestador {medicoSeleccionado}</p>
        )}
        {buscarTurnos.isSuccess && <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-6">
          {
            turnos.length >0 &&
            turnos.map(
              turno => <TurnosCard key={turno.fechaTurno+turno.telefono} turno = {turno}/>
            )
          }
          </div>}
        <div>
        </div>
      </div>
    </div>
  )
}

export default SolicitarTurno
