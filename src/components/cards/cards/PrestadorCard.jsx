import React from "react";
import { FaPhone } from "react-icons/fa";

function PrestadorCard({ prestador }) {
  if (!prestador) return null;

  const { nombre, especialidad, lugarAtencion = {} } = prestador;

  const {
    nombre: nombreLugar,
    localidad,
    calle,
    numero,
    telefono,
  } = lugarAtencion;

  return (
    <div className="border border-gris-border shadow-custom-shadow rounded-lg p-3 bg-white flex flex-col gap-1 hover:shadow-md transition-shadow duration-200">
      <h3 className="text-base font-bold text-menta-600">{especialidad}</h3>

      <p className="text-gray-800 font-semibold text-sm">{nombre}</p>

      {nombreLugar && <p className="text-gray-700 text-xs">{nombreLugar}</p>}

      {telefono && (
        <div className="flex items-center gap-2 text-black text-xs">
          <FaPhone size={12} />
          <span>{telefono}</span>
        </div>
      )}

      {(calle || numero || localidad) && (
        <p className="text-gray-600 text-xs">
          {calle && `${calle} `}
          {numero && `${numero}, `}
          {localidad && localidad}
        </p>
      )}
    </div>
  );
}

export default PrestadorCard;
