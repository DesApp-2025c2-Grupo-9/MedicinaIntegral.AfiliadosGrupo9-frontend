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

const getFechaTramite = (tramite) => {
    const estado = tramite.estado?.toLowerCase();

    // Aceptadas - fechaAprobacion
    if (estado === "aceptado") {
      return tramite.fechaAprobacion ? new Date(tramite.tramitefechaAprobacion) : null;
    }

    // Rechazadas -fecha de la última observación
    if (estado === "rechazado") {
      if (!tramite.observaciones || tramite.observaciones.length === 0)
        return null;tramite

      const ultimaObservacion =
        tramite.observaciones[tramite.observaciones.length - 1];

      return ultimaObservacion?.fecha
        ? new Date(ultimaObservacion.fecha)
        : null;
    }

    // Otras -createdAt
    return tramite.createdAt ? new Date(tramite.createdAt) : null;
};

export default function filtrarTramitePorFecha(tramite, estadoTramite) {
    const tramitesFiltados = tramite.filter((tramite) => {
    const estadoBackend = tramite.estado?.toLowerCase();
    const estadoSelect = estadoTramite;
    const fechaBase = getFechaTramite(tramite);

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
    return tramitesFiltados;
    
}