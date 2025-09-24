import { useState } from "react";
import PreLayoutTramites from "../../layout/PreLayoutTramites";
import TwoNavButtons from "../../components/TwoNavButtons";
import { ReintegroCard } from "../../components/cards";
import { icons } from "../../utils/icons";
import PaginationButtons from "../../components/PaginationButtons";

const reintegrosFake = [
  {
    id: 1,
    especialidad: "Cardiología",
    medico: "Juan Pérez",
    fecha: new Date(),
    lugar: "Hospital A",
    valor: "$500",
    estado: "Pendiente",
  },
  {
    id: 2,
    especialidad: "Dermatología",
    medico: "Ana Gómez",
    fecha: new Date(),
    lugar: "Clínica B",
    valor: "$300",
    estado: "Aceptado",
  },
  {
    id: 3,
    especialidad: "Neurología",
    medico: "Carlos Ruiz",
    fecha: new Date(),
    lugar: "Hospital C",
    valor: "$450",
    estado: "Rechazado",
  },
  {
    id: 4,
    especialidad: "Pediatría",
    medico: "Laura Sánchez",
    fecha: new Date(),
    lugar: "Hospital Infantil",
    valor: "$200",
    estado: "Pendiente",
  },
  {
    id: 5,
    especialidad: "Oftalmología",
    medico: "Pedro Torres",
    fecha: new Date(),
    lugar: "Clínica Visual",
    valor: "$350",
    estado: "Aceptado",
  },
  {
    id: 6,
    especialidad: "Ginecología",
    medico: "Mariana Díaz",
    fecha: new Date(),
    lugar: "Sanatorio Mujeres",
    valor: "$400",
    estado: "Rechazado",
  },
  {
    id: 7,
    especialidad: "Traumatología",
    medico: "Ricardo Gómez",
    fecha: new Date(),
    lugar: "Clínica Deportiva",
    valor: "$600",
    estado: "Pendiente",
  },
  {
    id: 8,
    especialidad: "Psiquiatría",
    medico: "Sofía Martínez",
    fecha: new Date(),
    lugar: "Instituto Mental",
    valor: "$550",
    estado: "Aceptado",
  },
  {
    id: 9,
    especialidad: "Endocrinología",
    medico: "Julián Herrera",
    fecha: new Date(),
    lugar: "Hospital Central",
    valor: "$480",
    estado: "Pendiente",
  },
];

function ReintegroVer() {
  const [filtro, setFiltro] = useState("Todos");

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const reintegrosFiltrados = reintegrosFake.filter((r) => {
    if (filtro === "Todos") return true;
    if (filtro === "Pendientes de procesamiento")
      return r.estado === "Pendiente";
    if (filtro === "Observados") return r.estado === "Observación";
    if (filtro === "Rechazados última semana") return r.estado === "Rechazado";
    if (filtro === "Aceptados última semana") return r.estado === "Aceptado";
    return true;
  });

  const reintegrosMostrados = reintegrosFiltrados.slice(0, 9);

  return (
    <div className="flex flex-col min-h-screen">
      <PreLayoutTramites
        title="Reintegros"
        showFilter={true}
        leftButtons={
          <TwoNavButtons
            firstIcon={icons.reintegros}
            firstDescription="Historial de reintegros"
            secondIcon={icons.agregar}
            secondDescription="Solicitar nuevo reintegro"
          />
        }
        onFilterChange={handleFiltroChange}
      >
        <div className="flex-1 flex items-center justify-center">
          <div className="grid gri-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
            {reintegrosMostrados.map((r) => (
              <ReintegroCard key={r.id} reintegro={r} />
            ))}
          </div>
        </div>
      </PreLayoutTramites>
      <div className=" flex justify-end p-3 ">
        <PaginationButtons />
      </div>
    </div>
  );
}

export default ReintegroVer;
