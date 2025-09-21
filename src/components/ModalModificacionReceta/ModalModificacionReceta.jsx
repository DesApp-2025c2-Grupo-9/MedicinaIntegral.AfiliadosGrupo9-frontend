import React from "react";
import DropdownFamiliar from "./DropDownFamiliar";
import Input from "../Input";
import Button from "../Button";
import TwoButtons from "../TwoButtons";

function ModalModificacionReceta({
  open,
  headerText,
  familiares,
  value,
  onChange,
  label,
  firstText,
  firstStyle,
  onFirstClick,
  secondText,
  secondStyle,
  onSecondClick,
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Caja externa */}
      <div
        className="flex flex-col w-full max-w-md nax-h-[90vh] bg-blanco-principal
      rounded-lg p-4 gap-4 overflow-y-auto "
      >
        {headerText && <h2 className="text-lg font-bold mb-2">{headerText}</h2>}
        <DropdownFamiliar
          familiares={familiares}
          value={value}
          onChange={onChange}
          label={label}
        />

        {/* medicamento y cantidad*/}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex-1 min-w-0">
            <Input
              label="Medicamento:"
              value="Loplac 50mg"
              onChange={() => {}}
            />
          </div>
          <div className="flex-1 min-w-0">
            <Input label="Cantidad" value="2 cajas" onChange={() => {}} />
          </div>
        </div>

        {/* Presentacion */}
        <div>
          <Input
            label="Presentación del medicamento:"
            value="Pastillas"
            onChange={() => {}}
          />
        </div>

        {/* Observaciones */}
        <div className="min-h-36">
          <Input
            label="Observaciones"
            value="Necesito que autoricen 2 cajas de 30 unidades cada una"
            onChange={() => {}}
            isTextArea
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end">
          <TwoButtons
            firstText="Cancelar"
            firstStyle="outln"
            onFirstClick={onFirstClick}
            secondText="Guardar cambios"
            secondStyle="fill"
            onSecondClick={onSecondClick}
          />
        </div>
      </div>
    </div>
  );
}

export default ModalModificacionReceta;
