import Select from '../../components/Select'
import InputContainer from '../../components/InputContainer'
import Button from '../../components/Button'
import { useUserStore } from '../../store/userStore';
import { useGetAllEspecialidades, useGetUbicacionesByEspecialidad } from '../../services/prestadoresQueres';
import { useState } from 'react';

function SolicitarTurno() {
  //Manejo de estados para cargar progresivamente las opciones
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('')
  const [ubicacionSeleccionada, setUbicacionSeleccionada] = useState('')

  const { user } = useUserStore(state => state);

  //Datos de los Select
  const { data: especialidades } = useGetAllEspecialidades();
  const { data: ubisByEspecialidad } = useGetUbicacionesByEspecialidad()

  //ubicaciones
  const [ubicacionesDisponibles, setubicacionesDisponibles] = useState([])


  const listaAfiliados = user.grupoFamiliar?.map(familiar => `${familiar.nombre} ${familiar.apellido}`);

  return (
    <div>
      <InputContainer>
        {/*Si el afiliado es el único en su grupo familiar, no aparece la opción*/}
        {
          listaAfiliados.length > 1 &&
          <Select placeholder='Para afiliado' label={'Para afiliado'} options={listaAfiliados} />
        }
        <Select
          placeholder='Especialidad'
          label={'Especialidad'}
          options={especialidades?.data}
          value={especialidadSeleccionada}
          onChange={(e) => {
            const nuevaEspecialidad = e.target.value;
            setEspecialidadSeleccionada(nuevaEspecialidad);

            const ubicaciones = ubisByEspecialidad.find(
              item => item.especialidad === nuevaEspecialidad
            )?.localidades || [];

            setubicacionesDisponibles(ubicaciones);
          }}

        />
        {/*Luego de elegir especialidad aparece para seleccionar ubicación */}
        {especialidadSeleccionada &&

          <Select
            placeholder='Seleccionar ubicación'
            label={'Ubicación'}
            options={ubicacionesDisponibles}
            value={ubicacionSeleccionada}
            onChange={(e) => { setUbicacionSeleccionada(e.target.value) }}
            disabled={!especialidadSeleccionada} />
        }
        {/*Luego de elegir la ubicación se cargan los profesionales para esa ubicación, con esa especialidad (Se puede buscar sin esto) */}
        {ubicacionSeleccionada &&
          <Select placeholder='Seleccionar profesional' label={'Profesional (opcional)'} />
        }
      </InputContainer>
      <Button onClick={() => console.log(especialidades)}>
        Buscar disponibilidad
      </Button>
      <div>
        <p>Turnos disponibles</p>
        <div>
          {/**Mostrar la llamada a la query de turnos disponibles con los parámetros seleccionados */}
        </div>
      </div>


    </div>
  )
}

export default SolicitarTurno