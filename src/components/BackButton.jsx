import React from "react";
import { icons } from "../utils/icons";

function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-[42px] h-7 justify-center items-center rounded-[20px] border border-gris-border 
                 bg-blanco-principal hover:bg-menta-200 hover:border-menta-200"
    >
      <span className="text-gris-border hover:text-blanco-principal">
        {icons.volver}
      </span>
    </button>
  );
}

export default BackButton;
