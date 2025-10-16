import RecetaCard from "../../components/cards/cards/RecetaCard";
import { useStateFilter } from "../../store/stateFilter"
import FiltroEstados from '../../components/FiltroEstados'
import { useGetRecetas } from "../../services/recetasQueries";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { capitalize } from 'lodash';


function VerRecetas() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const { state } = useStateFilter();
  //Llamada a la API
  //Obtener el nro de afiliado general del grupo familiar/Usuario
  //const nroGrupoFamiliar = provider
  //const {data,error, isLoading} = useGetRecetaFamilia(nroGrupoFamiliar);
  //const recetas = data?.data

  //Usar la seed
  const {data, error, isLoading} = useGetRecetas(axiosPrivate);
  const recetas = data?.data || [];

  if (isLoading) return <p>Cargando...</p>;
  if (error) {
    if (error?.response?.status === 401) {
      navigate('/login', { state: { from: location }, replace: true });
      return null;
    }
    return <p>Error: {JSON.stringify(error)}</p>;
  }


  
  const recetasFiltradas = recetas?.filter(receta => state.includes(capitalize(receta.estado)) || state == 'Todos');
  
  return (
    <div className="flex flex-col items-end gap-3 relative">
      <FiltroEstados className='sm:absolute -top-11 mr-auto'/>
    <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-2 w-full">
      {recetasFiltradas?.map(
        (receta, idReceta) => (
          <RecetaCard receta={receta} key={idReceta} />
        )
      )}
    </div>
      </div>
  )
}

export default VerRecetas