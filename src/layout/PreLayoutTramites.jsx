import React from "react";
import FiltroEstados from "../components/FiltroEstados";
import SectionTitle from "../components/SectionTitle";

function PreLayoutTramites({
  title,
  showFilter = true, //por si no queremos mostrar el filtro
  leftButtons,
  onFilterChange = () => {},
  children,
}) {
  return (
    <div className=" flex flex-col gap-4 px-4 sm:px-6">
      {/* Encabezado - título / botones / filtro */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 w-full">
        {/* título y botones */}
        <div className="flex flex-col gap-2">
          {/* título  */}
          {/* <div className="flex items-center gap-3">
            <SectionTitle text={title} />
          </div> */}
          {/* botones  */}
          {/* <div>{leftButtons}</div> */}
        </div>

        {/* filtro de estados */}
        {/* {showFilter && (
          <div>
            <FiltroEstados handleChange={onFilterChange} />
          </div>
        )} */}
      </div>
      {/*contenido restante dinámico*/}
      <div>{children}</div>
    </div>
  );
}

export default PreLayoutTramites;
