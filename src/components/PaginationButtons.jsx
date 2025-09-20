import React from "react";
import { icons } from "../utils/icons";

function PaginationButtons({ onPrev, onNext }) {
  return (
    <div className="inline-flex items-center gap-3">
      {/*Botón previo*/}
      <button
        onClick={onPrev}
        className="flex w-[42px] h-7 justify-center items-center rounded-[20px] border border-gris-border 
                     bg-blanco-principal "
      >
        <span className="text-gris-border">{icons.volver}</span>
      </button>
      {/*Botón next*/}
      <button
        onClick={onNext}
        className="flex w-[42px] h-7 justify-center items-center rounded-[20px] border border-gris-border 
                     bg-blanco-principal "
      >
        <span className="text-gris-border">{icons.avanzar}</span>
      </button>
    </div>
  );
}

export default PaginationButtons;
