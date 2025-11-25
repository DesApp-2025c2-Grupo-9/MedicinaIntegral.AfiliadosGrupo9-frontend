import { ReintegroCard } from '../../components/cards';
import FiltroEstados from '../../components/FiltroEstados';
import { useGetReintegros } from '../../services/queries';
import { capitalize } from 'lodash';
import TramitesSkeleton from '../../components/Skeletons/TramitesSkeleton';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import NoTramitesAvailable from '../NoTramitesAvailable';
import { useState } from 'react';
import NoTramitesEstado from '../NoTramitesEstado';

function ReintegroVer() {
  const [estadoTramite, setEstadoTramite] = useState('Todos');
  const { data, isLoading } = useGetReintegros();

  if (isLoading) return <TramitesSkeleton />;

  const reintegros = data?.data;
  // const reintegros = null;
  const reintegrosFiltrados = reintegros?.filter(r => estadoTramite.includes(capitalize(r.estado)) || estadoTramite === 'Todos');

  return (
    <div className={twMerge(clsx('flex flex-col relative gap-3', { 'items-end': reintegros }))}>
      {reintegros ? (
        <>
          <FiltroEstados
            className='sm:absolute -top-9.5 mr-auto'
            setEstadoTramite={setEstadoTramite}
          />
          {reintegrosFiltrados.length >= 1 ? (
            <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-3'>
              {reintegrosFiltrados.map(r => (
                <ReintegroCard
                  key={r.id}
                  reintegro={r}
                />
              ))}
            </div>
          ) : (
            <NoTramitesEstado
              tipoTramite='reintegros'
              estado={estadoTramite}
            />
          )}
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
