import { ReintegroCard } from '../../components/cards';
import FiltroEstados from '../../components/FiltroEstados';
import { useStateFilter } from '../../store/stateFilter';
import { useGetReintegros } from '../../services/queries';
import { capitalize } from 'lodash';
import TramitesSkeleton from '../../components/Skeletons/TramitesSkeleton';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import NoTramitesAvailable from '../NoTramitesAvailable';

function ReintegroVer() {
  const state = useStateFilter(state => state.state);
  const { data, isLoading, /* isError, error */ } = useGetReintegros();

  if (isLoading) return <TramitesSkeleton />;
  // if (isError) throw error;

  const reintegros = data?.data;
  // const reintegros = null;
  const reintegrosFiltrados = reintegros?.filter(r => state.includes(capitalize(r.estado)) || state === 'Todos');

  return (
    <div className={twMerge(clsx('flex flex-col relative gap-3', { 'items-end': reintegros }))}>
      {reintegros ? (
        <>
          <FiltroEstados className='sm:absolute -top-9.5 mr-auto' />
          <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-3'>
            {reintegrosFiltrados.map(r => (
              <ReintegroCard
                key={r.id}
                reintegro={r}
              />
            ))}
          </div>
        </>
      ) : (
        <NoTramitesAvailable
          tipoTramite='Reintegro'
          path='/reintegros/solicitar-reintegro'
        />
      )}
    </div>
  );
}

export default ReintegroVer;
