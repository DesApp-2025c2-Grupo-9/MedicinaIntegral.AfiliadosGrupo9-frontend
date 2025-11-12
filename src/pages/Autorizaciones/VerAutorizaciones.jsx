import AutorizacionCard from '../../components/cards/cards/AutorizacionCard';
import FiltroEstados from '../../components/FiltroEstados';
import { useGetAllAutorizaciones } from '../../services/autorizacionesQueries';
import { useLocation, useNavigate } from 'react-router-dom';
import { capitalize } from 'lodash';
import { useUserStore } from '../../store/userStore';
import TramitesSkeleton from '../../components/Skeletons/TramitesSkeleton';
import { useState } from 'react';

function VerAutorizaciones() {
  const [estadoTramite, setEstadoTramite] = useState('Todos');
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore(state => state);

  const { data, error, isLoading } = useGetAllAutorizaciones(user.idAfiliado);
  const autorizaciones = data?.data || [];

  if (isLoading) return <TramitesSkeleton />;
  if (error) {
    if (error?.response?.status === 401) {
      navigate('/login', { state: { from: location }, replace: true });
      return null;
    }
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  const autorizacionesFiltradas = autorizaciones?.filter(autorizacion => estadoTramite.includes(capitalize(autorizacion.estado)) || estadoTramite == 'Todos');

  return (
    <div className='flex flex-col items-end gap-3 relative'>
      <FiltroEstados
        className='sm:absolute -top-9.5 mr-auto'
        setEstadoTramite={setEstadoTramite}
      />
      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-3'>
        {autorizacionesFiltradas.map((autorizacion, idAutorizacion) => (
          <AutorizacionCard
            autorizacion={autorizacion}
            key={idAutorizacion}
          />
        ))}
      </div>
    </div>
  );
}

export default VerAutorizaciones;
