import Select from '../../components/Select'
import InputContainer from '../../components/InputContainer'
import Button from '../../components/Button'
import TurnosCard from '../../components/cards/cards/TurnosCard'
import { useUserStore } from '../../store/userStore';
import { useGetUbicacionesByEspecialidadMedicos } from '../../services/prestadoresQueres';
import { useState } from 'react';
import { useGetTurnosFiltrados } from '../../services/turnosQueries';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function SolicitarTurno() {
  const axiosPrivate = useAxiosPrivate();
  const buscarTurnos = useGetTurnosFiltrados(axiosPrivate)
  //Manejo de estados para cargar progresivamente las opciones
  const [especialidadSeleccionadaObj, setEspecialidadSeleccionadaObj] = useState(null)

  //Datos para cargar la query y buscar turnos
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('')
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState('')
  const [medicoSeleccionado, setMedicoSeleccionado] = useState('');
  const [turnos, setturnos] = useState([])
  
  const { user } = useUserStore(state => state);
  //Datos de los Select
  const { data: ubisByEspecialidadMedicos = [], isLoading, error } = useGetUbicacionesByEspecialidadMedicos()
  const especialidades = ubisByEspecialidadMedicos.map ( ubiConEspecialidad => ubiConEspecialidad.especialidad)
  
  //ubicaciones dispoinibles
  const [ubicacionesDisponibles, setubicacionesDisponibles] = useState([])
  //Médicos disponibles
  const [medicosDisponibles, setmedicosDisponibles] = useState([])

  const listaAfiliados = user.grupoFamiliar?.map(familiar => `${familiar.nombre} ${familiar.apellido}`);

  if (isLoading) return <p>Cargando especialidades...</p>
  if (error) return <p>Error al cargar los datos</p>

  const handleEspecialidadChange = (e) => {
    const nuevaEspecialidad = e.target.value;
    const especialidadObj = ubisByEspecialidadMedicos.find(
      item => item.especialidad === nuevaEspecialidad
    );
    setEspecialidadSeleccionada(nuevaEspecialidad);
    setEspecialidadSeleccionadaObj(especialidadObj);
    setubicacionesDisponibles(Object.keys(especialidadObj?.localidades || {}));
    setUbicacionSeleccionada('');
    setmedicosDisponibles([]);
    setMedicoSeleccionado('')
  };

  const handleUbicacionChange = (e) => {
    const nuevaUbicacion = e.target.value;
    setUbicacionSeleccionada(nuevaUbicacion);
    const medicos = especialidadSeleccionadaObj?.localidades?.[nuevaUbicacion] || [];
    const opciones = ['Todos', ...medicos.map(m => m.nombreCompleto)];
    setmedicosDisponibles(opciones);
    setMedicoSeleccionado('')

  };

  const cargarTurnos = () => {
    const params = {
      especialidadSeleccionada,
      ubicacionSeleccionada,
      medicoSeleccionado: medicoSeleccionado || undefined,
      desde: new Date()
    }
    buscarTurnos.mutate(params,{
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
            options={ubicacionesDisponibles}
            onChange={handleUbicacionChange}
            disabled={!especialidadSeleccionada}
          />
        }
        {ubicacionSeleccionada &&
          <Select 
            placeholder='Seleccionar profesional' 
            label={'Profesional (opcional)'}
            options={medicosDisponibles}
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
