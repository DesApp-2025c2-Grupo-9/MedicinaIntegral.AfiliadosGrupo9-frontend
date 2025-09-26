import React from "react";
import { icons } from "../utils/icons";
import { twMerge } from 'tailwind-merge';

function BackButton({ onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={twMerge('flex w-[42px] h-7 justify-center items-center rounded-[20px] border border-gris-border bg-blanco-principal text-gris-border hover:bg-menta-200 hover:border-menta-200 hover:text-blanco-principal cursor-pointer', className)}
    >
      {icons.volver}
    </button>
  );
}

export default BackButton;
