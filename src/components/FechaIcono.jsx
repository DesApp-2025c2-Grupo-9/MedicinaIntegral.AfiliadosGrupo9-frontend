import { icons } from "../utils/icons";

function FechaIcono({ fecha }) {
  // Si llega como string o Date se convierte a Date
  const dateObj = typeof fecha === "string" ? new Date(fecha) : fecha;

  const fechaFormateada = dateObj.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-2">
      <span className="w-4 h-4">{icons.calendario}</span>
      <span className="text-sm">{fechaFormateada}</span>
    </div>
  );
}

export default FechaIcono;
