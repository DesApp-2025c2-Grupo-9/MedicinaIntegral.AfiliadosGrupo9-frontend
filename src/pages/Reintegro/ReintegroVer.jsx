import { ReintegroCard } from '../../components/cards';
import PaginationButtons from '../../components/PaginationButtons';
import FiltroEstados from '../../components/FiltroEstados';
import { useStateFilter } from '../../store/stateFilter';
import { useGetReintegros } from '../../services/queries';
import { capitalize } from 'lodash';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';

function ReintegroVer() {
  const { state } = useStateFilter();
  const axiosPrivate = useAxiosPrivate();
  const { data, error, isLoading } = useGetReintegros(axiosPrivate);
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) return <p>Cargando...</p>;
  if (error) {
    navigate('/login', { state: { from: location }, replace: true });
  }

  const reintegros = data?.data;
  const reintegrosFiltrados = reintegros?.filter(r => state.includes(capitalize(r.estado)) || state === 'Todos');

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
