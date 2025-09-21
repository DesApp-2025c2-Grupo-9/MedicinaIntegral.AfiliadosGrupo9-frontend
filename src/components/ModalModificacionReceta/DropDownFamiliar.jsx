import React from "react";
import { icons } from "../../utils/icons";
import { useState } from "react";

function DropdownFamiliar({ familiares, value, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = familiares.find((f) => f.id === value);

  return (
    <div className="relative in-line block w-full">
      {/*Label opcional*/}
      {label && (
        <label className="block mb-1 text-negro-principal font-bold text-[16px]  leading-normal">
          {label}
        </label>
      )}
      {/* Integrante visible */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between min-h-[43px] px-4 py-3 rounded-lg border
         border-gris-border bg-blanco-principal cursor-pointer w-full overflow-hidden"
      >
        <span className="text-negro-principal whitespace-normal break-words">
          {selected
            ? `${selected.nombre} ${selected.apellido}`
            : "Seleccionar integrante"}
        </span>
        <span
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {icons.chevronDown}
        </span>
      </div>

      {/* Lista desplegable */}
      {isOpen && (
        <div
          className="absolute z-20 mt-1 w-full bg-blanco-principal border
         border-gris-border rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {familiares.map((familiar) => (
            <div
              key={familiar.id}
              onClick={() => {
                onChange(familiar.id);
                setIsOpen(false);
              }}
              className="px-4 py-3 hover:bg-menta-100 cursor-pointer text-negro-principal"
            >
              {familiar.nombre} {familiar.apellido}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownFamiliar;
