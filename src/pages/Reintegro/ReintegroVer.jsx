import { ReintegroCard } from "../../components/cards";
import PaginationButtons from "../../components/PaginationButtons";
import FiltroEstados from '../../components/FiltroEstados';
import { useStateFilter } from '../../store/stateFilter';
import { useGetReintegros } from '../../services/queries';

/* const reintegrosFake = [
  {
    id: 1,
    especialidad: "Cardiología",
    medico: "Juan Pérez",
    fecha: new Date(),
    lugar: "Hospital A",
    valor: "$500",
    estado: "Pendiente",
  },
  {
    id: 2,
    especialidad: "Dermatología",
    medico: "Ana Gómez",
    fecha: new Date(),
    lugar: "Clínica B",
    valor: "$300",
    estado: "Aceptado",
  },
  {
    id: 3,
    especialidad: "Neurología",
    medico: "Carlos Ruiz",
    fecha: new Date(),
    lugar: "Hospital C",
    valor: "$450",
    estado: "Rechazado",
  },
  {
    id: 4,
    especialidad: "Pediatría",
    medico: "Laura Sánchez",
    fecha: new Date(),
    lugar: "Hospital Infantil",
    valor: "$200",
    estado: "Pendiente",
  },
  {
    id: 5,
    especialidad: "Oftalmología",
    medico: "Pedro Torres",
    fecha: new Date(),
    lugar: "Clínica Visual",
    valor: "$350",
    estado: "Aceptado",
  },
  {
    id: 6,
    especialidad: "Ginecología",
    medico: "Mariana Díaz",
    fecha: new Date(),
    lugar: "Sanatorio Mujeres",
    valor: "$400",
    estado: "Rechazado",
  },
  {
    id: 7,
    especialidad: "Traumatología",
    medico: "Ricardo Gómez",
    fecha: new Date(),
    lugar: "Clínica Deportiva",
    valor: "$600",
    estado: "Pendiente",
  },
  {
    id: 8,
    especialidad: "Psiquiatría",
    medico: "Sofía Martínez",
    fecha: new Date(),
    lugar: "Instituto Mental",
    valor: "$550",
    estado: "Aceptado",
  },
  {
    id: 9,
    especialidad: "Endocrinología",
    medico: "Julián Herrera",
    fecha: new Date(),
    lugar: "Hospital Central",
    valor: "$480",
    estado: "Pendiente",
  },
]; */

function ReintegroVer() {
  const { state } = useStateFilter();
  const { data, error, isLoading } = useGetReintegros();

  const reintegros = data?.data;

  const reintegrosFiltrados = reintegros?.filter(r => state.includes(r.estado) || state === 'Todos');
  // const reintegrosMostrados = reintegrosFiltrados.slice(0, 9);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='flex flex-col items-end gap-3 relative'>
      <FiltroEstados className='sm:absolute -top-11 mr-auto' />
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6'>
        {
          reintegrosFiltrados.map((r) => (
            <ReintegroCard key={r.id} reintegro={r} />
          ))
        }
      </div>
      <PaginationButtons />
    </div>
  );
}

export default ReintegroVer;
