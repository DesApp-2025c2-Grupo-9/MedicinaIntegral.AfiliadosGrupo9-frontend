import RecetaCard from "../../components/cards/cards/RecetaCard";
import FiltroEstados from "../../components/FiltroEstados";
import { useGetRecetas } from "../../services/recetasQueries";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import TramitesSkeleton from "../../components/Skeletons/TramitesSkeleton";
import { useState } from "react";
import NoTramitesAvailable from "../NoTramitesAvailable";
import NoTramitesEstado from "../NoTramitesEstado";
import filtrarTramitePorFecha from "../../utils/filtrarTramitePorFecha";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

function VerRecetas() {
  const [estadoTramite, setEstadoTramite] = useState("Todos");
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore((state) => state);
  const { data, error, isLoading } = useGetRecetas(user.idAfiliado);
  const recetas = data?.data;
  const recetasFiltradas =
    data && filtrarTramitePorFecha(data.data, estadoTramite);

  if (isLoading) return <TramitesSkeleton />;

  if (error) {
    if (error?.response?.status === 401) {
      throw error;
    }
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  return (
    <div
      className={twMerge(
        clsx("flex flex-col relative gap-3", { "items-end": recetas })
      )}
    >
      {recetas ? (
        <>
          <FiltroEstados
            className="sm:absolute -top-9.5 mr-auto"
            setEstadoTramite={setEstadoTramite}
          />
          {recetasFiltradas.length >= 1 ? (
            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-3">
              {recetasFiltradas.map((receta, idReceta) => (
                <RecetaCard receta={receta} key={idReceta} />
              ))}
            </div>
          ) : (
            <NoTramitesEstado tipoTramite="recetas" estado={estadoTramite} />
          )}
        </>
      ) : (
        <NoTramitesAvailable
          tipoTramite="Receta"
          path="/recetas/solicitar-receta"
        />
      )}
    </div>
  );
}

export default VerRecetas;
