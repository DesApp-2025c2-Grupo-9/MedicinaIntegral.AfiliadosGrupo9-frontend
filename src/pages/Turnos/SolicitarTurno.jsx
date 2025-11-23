import Select from '../../components/Select'
import InputContainer from '../../components/InputContainer'
import Button from '../../components/Button'
import TurnosCard from '../../components/cards/cards/TurnosCard'
import { useEffect, useState } from 'react';
import { useGetEspecialidadesConTurno, useGetLocalidadesPorEspecialidad, useGetPrestadoresPorEspecialidadYLocalidad, useGetTurnosFiltrados } from '../../services/turnosQueries';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useGetAfiliado } from '../../services/queries';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

function SolicitarTurno() {
  const axiosPrivate = useAxiosPrivate();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: afiliadoRes } = useGetAfiliado();


  //Estados de los selects
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('')
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState('')
  const [prestadorSeleccionado, setPrestadorSeleccionado] = useState('')
  const [afiliadoIdSeleccionado, setAfiliadoIdSeleccionado] = useState(undefined)

  //Estádo con filtros aplicados:
  const [busquedaActual, setBusquedaActual] = useState(null);


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
    data: turnos = [],//Vacío por seguridad
    isPending: isPendingTurnos,
    isLoading: isLoadingTurnos,
    isSuccess: isSuccessTurnos,
    isError: isErrorTurnos
  } = useGetTurnosFiltrados(
    axiosPrivate,
    busquedaActual?.especialidad,
    busquedaActual?.localidad,
    '',{//La query se activa si hay una busquedaActual cargada
      enabled: !!busquedaActual
    }
  );

  //Grupo familiar
  const listaAfiliadosCompleta = afiliadoRes?.data?.grupoFamiliar.map((familiar) =>
  ({
    id: familiar.id,
    nombre: `${familiar.nombre} ${familiar.apellido}`
  })
  ) || [];
  const arrayDeAfiliados = listaAfiliadosCompleta.map(afiliado => afiliado.nombre)

  //Leer la URL al cargar la página
  useEffect(() => {
    const espURL = searchParams.get('especialidad');
    const locURL = searchParams.get('localidad');

    if(espURL && locURL){
      setEspecialidadSeleccionada(espURL);
      setLocalidadSeleccionada(locURL)
      //Disparar la busqueda automáticamente
      setBusquedaActual({
        especialidad: espURL,
        localidad: locURL
      })
    }
  }, [])//Solo ocurre una vez


  //Handlers

  
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
    setBusquedaActual(null)
    setSearchParams({})
  };
  
  const handleLocalidadChange = (e) => {
    setLocalidadSeleccionada(e.target.value);
    setPrestadorSeleccionado('')
    //Limpiar los turnos filtrados
    setBusquedaActual(null)
  };
  const handleBuscarClick = () => {
    const nuevaBusqueda ={
      especialidad: especialidadSeleccionada,
      localidad: localidadSeleccionada
    }
    setBusquedaActual(nuevaBusqueda)
    setPrestadorSeleccionado('')

    setSearchParams(nuevaBusqueda)
  }
  
  React.useEffect(() => {
    // Si el ID de afiliado NO está seteado y la lista YA cargó
    if (!afiliadoIdSeleccionado && listaAfiliadosCompleta.length > 0) {
      // Seteamos el ID del primer afiliado (el titular) como default

      setAfiliadoIdSeleccionado(listaAfiliadosCompleta[0].id);
    }
  }, [listaAfiliadosCompleta, afiliadoIdSeleccionado]); // Dependencias

  //FIltro local
  const turnosFiltrados = turnos.filter(turno => {
    if (!prestadorSeleccionado) return true;
    if (prestadorSeleccionado === 'Todos') return true;

    return turno.prestador === prestadorSeleccionado;
  })


  return (
    <div className='flex flex-col gap-4'>
      <InputContainer>
        {
          arrayDeAfiliados.length > 1 &&
          <Select
            label={'Para afiliado'}
            options={arrayDeAfiliados}
            onChange={handleAfiliadoChange}
          />
        }
        <Select
          placeholder='Seleccionar especialidad'
          label={'Especialidad'}
          options={especialidades || []}
          onChange={handleEspecialidadChange}
        />
        {
          especialidadSeleccionada &&
          <Select
            placeholder='Seleccionar ubicación'
            label={'Ubicación'}
            options={isLoadingLocalidades ? ['Cargando...'] : localidades || []}
            onChange={handleLocalidadChange}
            disabled={!especialidadSeleccionada}
          />
        }
        
      </InputContainer>

      <Button
        onClick={handleBuscarClick}
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
        {busquedaActual && isSuccessTurnos &&
          <div>
              <Select
                placeholder='Todos'
                label={'Profesional'}
                options={isLoadingPrestadores ? ['Cargando...'] : prestadores || []}
                onChange={
                  e => {
                    setPrestadorSeleccionado(e.target.value)
                  }
                }               
              style={{marginBottom: '12px', width: '300px'}}
              />

            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
              {
                turnosFiltrados.length > 0 &&
                turnosFiltrados.map(
                  turno => <TurnosCard
                    key={turno.idTurno}
                    turno={turno}
                    idAfiliadoParaReservar={afiliadoIdSeleccionado}
                    />
                )
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default SolicitarTurno
