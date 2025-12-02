import { useMemo, useState } from 'react';
import { useGetAfiliado } from '../../services/queries';
import { useGetTurnosPorAfiliado } from '../../services/turnosQueries';
import TurnosCard from '../../components/cards/cards/TurnosCard';
import SectionTitle from '../../components/SectionTitle';
import TurnosSkeleton from '../../components/Skeletons/TurnosSkeleton';
import { useUserStore } from '../../store/userStore';
import NoTurnosAvailable from '../../components/NoTurnosAvailable';

function VerTurnos() {
  const user = useUserStore(state => state.user)
  
  const { data: afiliadoRes, isLoading: isLoadingAfiliado } = useGetAfiliado();
  const idAfiliado = afiliadoRes?.data?.id;
  const afiliado = afiliadoRes?.data
  const grupoFamiliar = afiliado?.grupoFamiliar;
  const afiliadoActual = grupoFamiliar?.find(familiar => familiar?.id === user?.idAfiliado)
  
  //Estado para controlar si se ve todo o solo un resumen
  const [mostrarTodoHistorial, setMostrarTodoHistorial] = useState(false)
  const {
    data: misTurnos, // Esta es la lista COMPLETA (pasados y futuros)
    isLoading: isLoadingTurnos,
    isError: isErrorTurnos
  } = useGetTurnosPorAfiliado();

  //  useMemo para separar la lista en dos (y solo cuando 'misTurnos' cambie)
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

    // 2. Ordenamos las listas
    // Futuros: del más próximo al más lejano (ascendente)
    futuros.sort((a, b) => new Date(a.fechaTurno) - new Date(b.fechaTurno));
    // Pasados: del más reciente al más viejo (descendente)
    pasados.sort((a, b) => new Date(b.fechaTurno) - new Date(a.fechaTurno));

    return { turnosFuturos: futuros, turnosPasados: pasados };

  }, [misTurnos]); // <-- Dependencia: solo se recalcula si 'misTurnos' cambia

  // --- MANEJO DE CARGA Y ERROR  ---
  if (isLoadingAfiliado || isLoadingTurnos) {
    return <TurnosSkeleton />;
  }
  if (isErrorTurnos) {
    return <div><p>Error al cargar tus turnos.</p></div>;
  }

  // --- RENDERIZADO CON 2 SECCIONES ---
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-2'>
        {/* --- SECCIÓN 1: PRÓXIMOS TURNOS --- */}
        <SectionTitle>Mis Próximos Turnos</SectionTitle>
        {turnosFuturos.length > 0 ? (
          <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-3">
            {turnosFuturos.map(turno => (
              <TurnosCard
                key={turno.idTurno}
                turno={turno}
                paciente={true}
                nombrePaciente={`${afiliadoActual?.nombre} ${afiliadoActual?.apellido}`}//Usuario que está viendo actualmente
                idAfiliadoTurno={idAfiliado}
                isPast={false} // <-- Prop para que SÍ muestre la papelera
              />
            ))}
          </div>
        ) : (
          <NoTurnosAvailable />
        )}
      </div>

      <div className='flex flex-col gap-2'>
        {/* --- SECCIÓN 2: HISTORIAL DE TURNOS --- */}
        <SectionTitle>Historial de Turnos</SectionTitle>
        {turnosPasados.length > 0 ? (
          <div className='flex flex-col gap-3'>
            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-3">
            {(mostrarTodoHistorial ? turnosPasados: turnosPasados.slice(0,4)).map
            (turno => (
              <TurnosCard
                key={turno.idTurno}
                turno={turno}
                paciente={true}
                nombrePaciente={`${afiliadoActual?.nombre} ${afiliadoActual.apellido}`}
                idAfiliadoParaEliminar={idAfiliado}
                isPast={true}
              />
            ))}
            </div>
          {
            turnosPasados.length > 4 &&(
              <button 
           onClick={() => setMostrarTodoHistorial(!mostrarTodoHistorial)}
           className="text-menta-600 font-semibold hover:underline w-fit self-center cursor-pointer"
        >
           {mostrarTodoHistorial ? "Ver menos" : "Ver historial completo"}
        </button>
            )}
            </div>
        ) : (
          <p>No tenés turnos en tu historial.</p>
        )}
      </div>
    </div>
  )
}

export default VerTurnos;
