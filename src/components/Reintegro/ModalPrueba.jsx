import { useState } from "react";
import { icons } from "../../utils/icons";
import Input from "../Input";
import NavButton from "../NavButton";
import UsuarioActual from "../UsuarioActual";

function ModalPrueba({ open, onClose }) {
  const [observaciones, setObservaciones] = useState("");
  const [comentario, setComentario] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Caja externa */}
      <div className="flex flex-col w-[720px] p-4 gap-5 rounded-lg border border-[#CECECE] bg-[#EEFFED] shadow-[4px_4px_4px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <div
          className="flex justify-between items-start p-3 px-4 bg-[#C4FFC4] border-b border-[#CECECE] cursor-pointer"
          onClick={onClose}
        >
          <div className="flex items-center gap-2">
            <span className="w-4 h-4">{icons.flechaAtras}</span>
            <span className="font-bold">Volver a reintegros</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4">{icons.calendario}</span>
            <span className="text-sm">20/09/2025</span>
          </div>
        </div>

        {/* Usuario */}
        <UsuarioActual />

        {/* Observaciones */}
        <div className="flex flex-col gap-2 p-3 px-4 bg-white rounded border border-[#CECECE] flex-1">
          <Input
            label="Observaciones"
            isTextArea={true}
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>

        {/* Comentario prestador */}
        <div className="flex flex-col gap-2 p-3 px-4 bg-white rounded border border-[#CECECE] flex-1">
          <Input
            label="Comentario para el prestador"
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
