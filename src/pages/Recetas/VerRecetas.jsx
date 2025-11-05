import RecetaCard from "../../components/cards/cards/RecetaCard";
import { useStateFilter } from "../../store/stateFilter";
import FiltroEstados from "../../components/FiltroEstados";
import { useGetRecetas } from "../../services/recetasQueries";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { capitalize } from "lodash";
import { useUserStore } from "../../store/userStore";

function VerRecetas() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useStateFilter();
  const { user } = useUserStore((state) => state);
  const { data, error, isLoading } = useGetRecetas(user.idAfiliado);
  const recetas = data?.data || [];
  if (isLoading) return <p>Cargando...</p>;
  if (error) {
    if (error?.response?.status === 401) {
      navigate("/login", { state: { from: location }, replace: true });
      return null;
    }
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  const recetasFiltradas = recetas?.filter(
    (receta) => state.includes(capitalize(receta.estado)) || state == "Todos"
  );

  return (
    <div className="flex flex-col items-end gap-3 relative">
      <FiltroEstados className='sm:absolute -top-11 mr-auto'/>
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-x-6">
      {recetasFiltradas?.map(
        (receta, idReceta) => (
          <RecetaCard receta={receta} key={idReceta} />
        ))}
      </div>
    </div>
  );
}

export default VerRecetas;
