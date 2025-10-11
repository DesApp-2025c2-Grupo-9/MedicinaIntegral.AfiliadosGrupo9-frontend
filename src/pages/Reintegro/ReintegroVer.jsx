import { ReintegroCard } from '../../components/cards';
import PaginationButtons from '../../components/PaginationButtons';
import FiltroEstados from '../../components/FiltroEstados';
import { useStateFilter } from '../../store/stateFilter';
import { useGetReintegros } from '../../services/queries';
import { capitalize } from 'lodash';

function ReintegroVer() {
  const { state } = useStateFilter();
  const { data, error, isLoading } = useGetReintegros();

  const reintegros = data?.data;

  const reintegrosFiltrados = reintegros?.filter(r => state.includes(capitalize(r.estado)) || state === 'Todos');

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='flex flex-col items-end gap-3 relative'>
      <FiltroEstados className='sm:absolute -top-11 mr-auto' />
      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-x-6'>
        {reintegrosFiltrados.map(r => (
          <ReintegroCard
            key={r.id}
            reintegro={r}
            
          />
        ))}
      </div>
      <PaginationButtons />
    </div>
  );
}

export default ReintegroVer;
