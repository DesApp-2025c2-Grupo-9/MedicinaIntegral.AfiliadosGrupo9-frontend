import { useState } from "react";
import { icons } from "../../utils/icons";
import Input from "../Input";
import NavButton from "../NavButton";
import UsuarioActual from "../UsuarioActual";

function ModalPrueba({ open, onClose, nombreUsuario, observacionesTexto }) {
  const [observaciones, setObservaciones] = useState("");
  const [comentario, setComentario] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Caja externa */}
      <div
        className="flex flex-col w-[720px] p-3 gap-3 rounded-lg border border-gris-border
       bg-fondo-documento shadow-custom-shadow"
      >
        {/* Header */}
        <div
          className="flex justify-between items-start p-2  border-[#CECECE] cursor-pointer"
          onClick={onClose}
        >
          <div className="flex items-center gap-2">
            <span className="w-4 h-4">{icons.flechaVolver}</span>
            <span className="font-bold">Volver a Reintegros</span>
          </div>
        </div>

        {/* Usuario,calendario y observaciones*/}
        <div className="border border-gray-300 rounded  flex flex-col  bg-white">
          {/* Usuario y calendario */}
          <div
            className="flex justify-between items-center w-full py-3 px-4 bg-[#C4FFC4] border-b
           border-[#CECECE] cursor-pointer"
          >
            <UsuarioActual nombre={nombreUsuario} />
            <div className="flex items-center gap-2">
              <span className="w-4 h-4">{icons.calendario}</span>
              <span className="text-sm">20/09/2025</span>
            </div>
          </div>

          {/* Observaciones */}
          <div className="flex flex-col gap-2 p-3 px-4  bg-blanco-principal rounded border border-gris-border min-h-[128px]">
            <label className="text-base font-bold w-fit select-none">
              Observaciones:
            </label>
            <p className="text-sm font-medium text-negro-principal">
              {observacionesTexto || "Sin observaciones"}
            </p>
          </div>
        </div>
        {/* Comentario prestador */}
        <div className="flex flex-col gap-2 rounded  min-h-[128px]">
          <Input
            label="Comentario para el prestador:"
            isTextArea={true}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </div>

        {/* Botón enviar */}
        <div className="flex justify-end">
          <NavButton
            description="Enviar"
            onClick={() => {
              console.log("Enviar:", { observaciones, comentario });
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ModalPrueba;
