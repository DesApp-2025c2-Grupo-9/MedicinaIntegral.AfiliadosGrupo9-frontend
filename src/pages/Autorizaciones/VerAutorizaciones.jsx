import AutorizacionCard from '../../components/cards/cards/AutorizacionCard'
import { useStateFilter } from "../../store/stateFilter"
import FiltroEstados from "../../components/FiltroEstados"
import { useGetAllAutorizaciones } from '../../services/autorizacionesQueries';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useLocation } from 'react-router-dom';

function VerAutorizaciones() {
  const { state } = useStateFilter();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  const { data, error, isLoading } = useGetAllAutorizaciones(axiosPrivate);
  const autorizaciones = data?.data || [];

  if (isLoading) return <p>Cargando...</p>;
  if (error) {
    if (error?.response?.status === 401) {
      navigate('/login', { state: { from: location }, replace: true });
      return null;
    }
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  const autorizacionesFiltradas = autorizaciones?.filter(
    autorizacion => state.includes(autorizacion.estado) || state == 'Todos'
  )
  return (
    <div className="flex flex-col items-end gap-3 relative">
      <FiltroEstados className='sm:absolute -top-11 mr-auto' />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-2 w-full">
        {autorizacionesFiltradas.map(
          (autorizacion, idAutorizacion) => (
            <AutorizacionCard autorizacion={autorizacion} key={idAutorizacion} />
          )
        )}
      </div>
    </div>
  )
}

export default VerAutorizaciones