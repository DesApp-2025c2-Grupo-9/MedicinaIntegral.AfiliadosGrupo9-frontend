import RecetaCard from "../../components/cards/cards/RecetaCard";
import FiltroEstados from "../../components/FiltroEstados";
import { useGetRecetas } from "../../services/recetasQueries";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import TramitesSkeleton from "../../components/Skeletons/TramitesSkeleton";
import { useState } from "react";

function VerRecetas() {
  const [estadoTramite, setEstadoTramite] = useState("Todos");
  const navigate = useNavigate();
  const location = useLocation();
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
  const getFechaReceta = (receta) => {
    const estado = receta.estado?.toLowerCase();

    // Aceptadas - fechaAprobacion
    if (estado === "aceptado") {
      return receta.fechaAprobacion ? new Date(receta.fechaAprobacion) : null;
    }

    // Rechazadas -fecha de la última observación
    if (estado === "rechazado") {
      if (!receta.observaciones || receta.observaciones.length === 0)
        return null;

      const ultimaObservacion =
        receta.observaciones[receta.observaciones.length - 1];

      return ultimaObservacion?.fecha
        ? new Date(ultimaObservacion.fecha)
        : null;
    }

    // Otras -createdAt
    return receta.createdAt ? new Date(receta.createdAt) : null;
  };
  // Ordenar recetas de más reciente a más antigua
  const recetasOrdenadas = [...recetas].sort((a, b) => {
    const fechaA = getFechaReceta(a);
    const fechaB = getFechaReceta(b);
    return fechaB - fechaA;
  });

  // Función para saber si una fecha supera X días
  const esMayorA_dias = (fecha, dias) => {
    if (!fecha) return false;
    const hoy = new Date();
    const fechaReceta = new Date(fecha);
    const diferenciaMs = hoy - fechaReceta;
    const diferenciaDias = diferenciaMs / (1000 * 60 * 60 * 24);
    return diferenciaDias > dias;
  };

  const mapEstados = {
    "Pendientes de procesamiento": "pendiente",
    "En análisis": "en análisis",
    Observados: "observado",
    "Rechazados última semana": "rechazado",
    "Aceptados última semana": "aceptado",
  };

  const recetasFiltradas = recetasOrdenadas.filter((receta) => {
    const estadoBackend = receta.estado?.toLowerCase();
    const estadoSelect = estadoTramite;
    const fechaBase = getFechaReceta(receta);

    if (estadoSelect === "Todos") {
      if (estadoBackend === "aceptado" || estadoBackend === "rechazado") {
        return !esMayorA_dias(fechaBase, 30);
      }
      return true;
    }

    //  filtros por última semana
    if (
      estadoSelect === "Aceptados última semana" &&
      estadoBackend === "aceptado"
    ) {
      return !esMayorA_dias(fechaBase, 7);
    }
    if (
      estadoSelect === "Rechazados última semana" &&
      estadoBackend === "rechazado"
    ) {
      return !esMayorA_dias(fechaBase, 7);
    }

    // Para pendiente, en análisis, observado
    return mapEstados[estadoSelect] === estadoBackend;
  });

  return (
    <div className="flex flex-col items-end gap-3 relative">
      <FiltroEstados
        className="sm:absolute -top-9.5 mr-auto"
        setEstadoTramite={setEstadoTramite}
      />

      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-3">
        {recetasFiltradas?.map((receta, idReceta) => (
          <RecetaCard receta={receta} key={idReceta} />
        ))}
      </div>
    </div>
  );
}

export default VerRecetas;
