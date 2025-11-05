import Select from '../../components/Select'
import InputContainer from '../../components/InputContainer'
import Button from '../../components/Button'
import TurnosCard from '../../components/cards/cards/TurnosCard'
import { useState } from 'react';
import { useGetEspecialidadesConTurno, useGetLocalidadesPorEspecialidad, useGetPrestadoresPorEspecialidadYLocalidad, useGetTurnosFiltrados } from '../../services/turnosQueries';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useGetAfiliado } from '../../services/queries';
import React from 'react';

function SolicitarTurno() {
  const axiosPrivate = useAxiosPrivate();
  const {data : afiliadoRes} = useGetAfiliado();


  //Estados de los selects
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('')
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState('')
  const [prestadorSeleccionado, setPrestadorSeleccionado] = useState('')
  const [afiliadoIdSeleccionado, setAfiliadoIdSeleccionado] = useState(undefined)

  //Queries
  //Todas las especialidades
  const { data: especialidades } = useGetEspecialidadesConTurno(axiosPrivate)
  //Las localidades(Depende de especialidadSeleccionada)
  const { data: localidades, isLoading: isLoadingLocalidades } =
    useGetLocalidadesPorEspecialidad(axiosPrivate, especialidadSeleccionada)
  //Los prestadores(Depende de especialidadSeleccionada && localidadSeleccionada)
  const { data: prestadores, isLoading: isLoadingPrestadores } =
    useGetPrestadoresPorEspecialidadYLocalidad(axiosPrivate, especialidadSeleccionada, localidadSeleccionada)

  const {
    data: turnos,
    isPending: isPendingTurnos,
    isLoading: isLoadingTurnos,
    isSuccess: isSuccessTurnos,
    isError: isErrorTurnos,
    refetch: cargarTurnos
  } = useGetTurnosFiltrados(
    axiosPrivate,
    especialidadSeleccionada,
    localidadSeleccionada,
    prestadorSeleccionado
  );

  //Grupo familiar
  const listaAfiliadosCompleta = afiliadoRes?.data?.grupoFamiliar.map((familiar) =>
     ({
      id: familiar.id,
      nombre:`${familiar.nombre} ${familiar.apellido}`})
    ) || [];

  

  const arrayDeAfiliados = listaAfiliadosCompleta.map(afiliado => afiliado.nombre)
  
  const handleAfiliadoChange = (e) => {
    const nombreSeleccionado = e.target.value;
    const afiliadoEncontrado = listaAfiliadosCompleta.find(afiliado => afiliado.nombre === nombreSeleccionado)
    
    setAfiliadoIdSeleccionado(
      afiliadoEncontrado.id
    ) 
  };


  const handleEspecialidadChange = (e) => {
    //Cuando especialidad cambie, se debe setear la especialidad seleoFamiliar)ccionada
    setEspecialidadSeleccionada(e.target.value);
    setLocalidadSeleccionada('');
    setPrestadorSeleccionado('');
  };

  const handleLocalidadChange = (e) => {
    setLocalidadSeleccionada(e.target.value);
    setPrestadorSeleccionado('')


  };

  React.useEffect(() => {
  // Si el ID de afiliado NO está seteado y la lista YA cargó
  if (!afiliadoIdSeleccionado && listaAfiliadosCompleta.length > 0) {
    // Seteamos el ID del primer afiliado (el titular) como default

    setAfiliadoIdSeleccionado(listaAfiliadosCompleta[0].id);
  }
}, [listaAfiliadosCompleta, afiliadoIdSeleccionado]); // Dependencias


  return (
    <div>
      <InputContainer>
        {
          //listaAfiliados >1 &&
          <Select
            placeholder='Para afiliado'
            label={'Para afiliado'}
            options={arrayDeAfiliados}
            onChange={handleAfiliadoChange}
          />
        }
        <Select
          placeholder='Especialidad'
          label={'Especialidad'}
          options={especialidades || []}
          onChange={handleEspecialidadChange}
        />
        {
          <Select
            placeholder='Seleccionar ubicación'
            label={'Ubicación'}
            options={isLoadingLocalidades ? ['Cargando...'] : localidades || []}
            onChange={handleLocalidadChange}
            disabled={!especialidadSeleccionada}
          />
        }
        {
          <Select
            placeholder='Seleccionar profesional'
            label={'Profesional (opcional)'}
            options={isLoadingPrestadores ? ['Cargando...'] : prestadores || []}
            onChange={
              e => {
                setPrestadorSeleccionado(e.target.value)
              }
            }
            disabled={!localidadSeleccionada || isLoadingPrestadores}
          />
        }
      </InputContainer>
      <Button
        onClick={cargarTurnos}
        disabled={!especialidadSeleccionada || !localidadSeleccionada}
      >
        {isLoadingTurnos ? 'Buscando ...' : 'Buscar disponibilidad'
        }
      </Button>
      <div>
        {isErrorTurnos && <p>Error al buscar turnos</p>}
        {!isPendingTurnos && isSuccessTurnos && turnos.length === 0 && (
          <p>No hay turnos disponibles para la búsqueda.</p>
        )}
        {isSuccessTurnos && <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-6">
          {
            turnos.length > 0 &&
            turnos.map(
              turno => <TurnosCard
                key={turno.idTurno}
                turno={turno}
                idAfiliadoParaReservar={afiliadoIdSeleccionado} />
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
