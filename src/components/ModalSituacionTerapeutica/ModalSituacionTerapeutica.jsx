import { icons } from "../../utils/icons";
import UsuarioActual from "../UsuarioActual";

function ModalSituacionTerapeutica({
  open,
  onClose,
  prefix,
  nombreUsuario,
  diagnosticoTexto,
  headerText = "Volver",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      {/* Caja externa */}
      <div
        className="flex flex-col w-[720px] p-3 gap-3 rounded-lg border border-gris-border
       bg-fondo-documento shadow-custom-shadow"
      >
        {/* Header */}
        <div
          className="flex justify-between items-start p-2  border-gris-border cursor-pointer"
          onClick={onClose}
        >
          <div className="flex items-center gap-2">
            <span className="w-4 h-4">{icons.flechaVolver}</span>
            <span className="font-bold">{headerText}</span>
          </div>
        </div>

        {/* Usuario y situacion terapeutica*/}
        <div className="border border-gray-300 rounded-lg  flex flex-col  bg-blanco-principal">
          {/* Usuario*/}
          <div
            className="flex justify-between items-center w-full py-3 px-4 bg-menta-100 border-b
           border-gris-border"
          >
            <UsuarioActual prefix={prefix} nombre={nombreUsuario} />
          </div>

          {/* Diagnóstico principal */}
          <div className="flex flex-col gap-2 p-3 px-4  bg-blanco-principal rounded  min-h-[128px]">
            <label className="text-base font-bold w-fit select-none">
              Diagnóstico principal:
            </label>
            <p className="text-sm font-medium text-negro-principal">
              {diagnosticoTexto || "Sin observaciones"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalSituacionTerapeutica;
