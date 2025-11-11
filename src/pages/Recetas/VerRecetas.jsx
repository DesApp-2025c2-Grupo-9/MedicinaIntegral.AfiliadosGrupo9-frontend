import RecetaCard from "../../components/cards/cards/RecetaCard";
import { useStateFilter } from "../../store/stateFilter";
import FiltroEstados from "../../components/FiltroEstados";
import { useGetRecetas } from "../../services/recetasQueries";
import { useNavigate, useLocation } from "react-router-dom";
import { capitalize } from "lodash";
import { useUserStore } from "../../store/userStore";
import TramitesSkeleton from "../../components/Skeletons/TramitesSkeleton";

function VerRecetas() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useStateFilter();
  const { user } = useUserStore((state) => state);
  const { data, error, isLoading } = useGetRecetas(user.idAfiliado);
  const recetas = data?.data || [];

  if (isLoading) return <TramitesSkeleton />;
  if (error) {
    if (error?.response?.status === 401) {
      navigate("/login", { state: { from: location }, replace: true });
      return null;
    }
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  let recetasFiltradas = recetas
    ?.filter(
      (receta) => state.includes(capitalize(receta.estado)) || state == "Todos"
    )
    .filter((receta) => {
      const estado = receta.estado?.toLowerCase();
      const fechaCreacion = receta.createdAt
        ? new Date(receta.createdAt)
        : null;

      const haceUnaSemana = new Date();
      haceUnaSemana.setDate(haceUnaSemana.getDate() - 7);
      console.log(haceUnaSemana, receta);
      if (["pendiente", "observado", "en análisis"].includes(estado))
        return true;

      if (["aceptado", "rechazado"].includes(estado) && fechaCreacion) {
        return fechaCreacion <= haceUnaSemana;
      }

      return false;
    });
  return (
    <div className="flex flex-col items-end gap-3 relative">
      <FiltroEstados className="sm:absolute -top-9.5 mr-auto" />
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-3">
        {recetasFiltradas?.map((receta, idReceta) => (
          <RecetaCard receta={receta} key={idReceta} />
        ))}
      </div>
    </div>
  );
}

export default VerRecetas;
