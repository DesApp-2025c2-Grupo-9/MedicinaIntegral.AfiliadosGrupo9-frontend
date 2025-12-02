import AutorizacionCard from '../../components/cards/cards/AutorizacionCard';
import FiltroEstados from '../../components/FiltroEstados';
import { useGetAllAutorizaciones } from '../../services/autorizacionesQueries';
import { useUserStore } from '../../store/userStore';
import TramitesSkeleton from '../../components/Skeletons/TramitesSkeleton';
import { useState } from 'react';
import NoTramitesAvailable from '../NoTramitesAvailable';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import NoTramitesEstado from '../NoTramitesEstado';
import filtrarTramitePorFecha from '../../utils/filtrarTramitePorFecha';

function VerAutorizaciones() {
  const [estadoTramite, setEstadoTramite] = useState('Todos');
  const { user } = useUserStore(state => state);
  const { data, isLoading } = useGetAllAutorizaciones(user.idAfiliado);
  const autorizacionesFiltradas = data && filtrarTramitePorFecha(data.data, estadoTramite)

  const autorizaciones = data?.data;

  if (isLoading) return <TramitesSkeleton />;

  return (
    <div className={twMerge(clsx('flex flex-col relative gap-3', { 'items-end': autorizaciones }))}>
      
      { autorizaciones ? 
          <>
          <FiltroEstados
            className='sm:absolute -top-9.5 mr-auto'
            setEstadoTramite={setEstadoTramite}/>
          {
            autorizacionesFiltradas?.length >= 1 ?  
              <div className='w-full grid sm:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-3'>
                {
                  autorizacionesFiltradas.map((autorizacion, idAutorizacion) => (
                  <AutorizacionCard
                    autorizacion={autorizacion}
                    key={idAutorizacion}
                  />))
                }
              </div>
            : <NoTramitesEstado
                tipoTramite='autorizaciones'
                estado={estadoTramite}
              />
          }
        </>
        : <NoTramitesAvailable tipoTramite='Autorización' path='/autorizaciones/solicitar-autorizacion'/>
      }
    </div>
  );
}

export default VerAutorizaciones;
