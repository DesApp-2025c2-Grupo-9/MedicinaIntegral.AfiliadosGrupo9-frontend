import React, { useMemo } from 'react'; // <-- Importá useMemo
import { useGetAfiliado } from '../../services/queries';
import { useGetTurnosPorAfiliado } from '../../services/turnosQueries';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import TurnosCard from '../../components/cards/cards/TurnosCard';
import SectionTitle from '../../components/SectionTitle';

function VerTurnos() {
  const axiosPrivate = useAxiosPrivate();

  const {data: afiliadoRes, isLoading: isLoadingAfiliado} = useGetAfiliado();
  const idAfiliado = afiliadoRes?.data?.id;
  const nombreAfiliado = `${afiliadoRes?.data?.nombre} ${afiliadoRes?.data?.apellido}`

  const {
    data: misTurnos, // Esta es la lista COMPLETA (pasados y futuros)
    isLoading: isLoadingTurnos,
    isError: isErrorTurnos
  } = useGetTurnosPorAfiliado(axiosPrivate, idAfiliado);

  // --- ¡AQUÍ ESTÁ LA MAGIA! ---
  // Usamos useMemo para separar la lista en dos (y solo cuando 'misTurnos' cambie)
  const { turnosFuturos, turnosPasados } = useMemo(() => {
    // Si no hay turnos, devolvemos arrays vacíos
    if (!misTurnos) {
      return { turnosFuturos: [], turnosPasados: [] };
    }

    const ahora = new Date();
    const futuros = [];
    const pasados = [];

    // 1. Clasificamos cada turno
    misTurnos.forEach(turno => {
      if (new Date(turno.fechaTurno) > ahora) {
        futuros.push(turno);
      } else {
        pasados.push(turno);
      }
    });

    // 2. Ordenamos las listas como vos querés
    // Futuros: del más próximo al más lejano (ascendente)
    futuros.sort((a, b) => new Date(a.fechaTurno) - new Date(b.fechaTurno));
    // Pasados: del más reciente al más viejo (descendente)
    pasados.sort((a, b) => new Date(b.fechaTurno) - new Date(a.fechaTurno));

    return { turnosFuturos: futuros, turnosPasados: pasados };

  }, [misTurnos]); // <-- Dependencia: solo se recalcula si 'misTurnos' cambia

  // --- MANEJO DE CARGA Y ERROR (queda igual) ---
  if (isLoadingAfiliado || isLoadingTurnos) {
    return <div className='p-4'><p>Cargando tus turnos...</p></div>;
  }
  if (isErrorTurnos) {
    return <div className='p-4'><p>Error al cargar tus turnos.</p></div>;
  }
  
  // --- RENDERIZADO CON 2 SECCIONES ---
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-2'>
      {/* --- SECCIÓN 1: PRÓXIMOS TURNOS --- */}
      {/* <h1 className="text-2xl font-bold mb-4">Mis Próximos Turnos</h1> */}
        <SectionTitle>Mis Próximos Turnos</SectionTitle>
        {turnosFuturos.length > 0 ? (
          <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
            {turnosFuturos.map(turno => (
              <TurnosCard 
                key={turno.idTurno} 
                turno={turno} 
                paciente={true}
                nombrePaciente={nombreAfiliado}
                idAfiliadoParaEliminar={idAfiliado}
                isPast={false} // <-- Prop para que SÍ muestre la papelera
              />
            ))}
          </div>
        ) : (
          <p>No tenés turnos próximos.</p>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        {/* --- SECCIÓN 2: HISTORIAL DE TURNOS --- */}
        {/* <h2 className="text-xl font-bold mt-10 mb-4">Historial de Turnos</h2> */}
        <SectionTitle>Historial de Turnos</SectionTitle>
        {turnosPasados.length > 0 ? (
          <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
            {turnosPasados.map(turno => (
              <TurnosCard 
                key={turno.idTurno} 
                turno={turno} 
                paciente={true}
                nombrePaciente={nombreAfiliado}
                idAfiliadoParaEliminar={idAfiliado}
                isPast={true}
              />
            ))}
          </div>
        ) : (
          <p>No tenés turnos en tu historial.</p>
        )}
      </div>
    </div>
  )
}

export default VerTurnos;