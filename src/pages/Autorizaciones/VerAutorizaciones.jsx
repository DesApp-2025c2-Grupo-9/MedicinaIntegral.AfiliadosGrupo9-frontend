import AutorizacionCard from '../../components/cards/cards/AutorizacionCard'
import { useStateFilter } from "../../store/stateFilter"
import FiltroEstados from "../../components/FiltroEstados"
import { useGetAllAutorizaciones } from '../../services/autorizacionesQueries';
import { useLocation, useNavigate } from 'react-router-dom';
import { capitalize } from 'lodash';
import { useUserStore } from '../../store/userStore';


function VerAutorizaciones() {
  const navigate = useNavigate();
  const { state } = useStateFilter();
  const location = useLocation();
  const { user } = useUserStore(state => state);

  const { data, error, isLoading } = useGetAllAutorizaciones(user.idAfiliado);
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
    autorizacion => state.includes(capitalize(autorizacion.estado)) || state == 'Todos'
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