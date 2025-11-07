import { ReintegroCard } from '../../components/cards';
import FiltroEstados from '../../components/FiltroEstados';
import { useStateFilter } from '../../store/stateFilter';
import { useGetReintegros } from '../../services/queries';
import { capitalize } from 'lodash';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import TramitesSkeleton from '../../components/Skeletons/TramitesSkeleton';

function ReintegroVer() {
  const { state } = useStateFilter();
  const location = useLocation();
  const { user } = useUserStore(state => state);
  const { data, error, isLoading, isError } = useGetReintegros(user.idAfiliado);

  // if (isLoading) return <div>Cargando...</div>;
  if (isLoading) return <TramitesSkeleton />;
  if (isError && error.status === 401) {
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
        replace
      />
    );
  }
  if (isError) return <div>Error: {error.message}</div>;

  const reintegros = data?.data || [];
  const reintegrosFiltrados = reintegros?.filter(r => state.includes(capitalize(r.estado)) || state === 'Todos');

  return (
    <div className='flex flex-col items-end relative gap-3'>
      <FiltroEstados className='sm:absolute -top-11 mr-auto' />
      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-3'>
        {reintegrosFiltrados.map(r => (
          <ReintegroCard
            key={r.id}
            reintegro={r}
          />
        ))}
      </div>
    </div>
  );
}

export default ReintegroVer;
