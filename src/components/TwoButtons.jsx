import React from "react";

function TwoButtons({
  firstText = "Cancelar",
  firstStyle = "outln",
  onFirstClick,
  secondText = "Guardar cambios",
  secondStyle = "fill",
  onSecondClick,
  maxWidth = 200, // ancho máximo en escritorio
}) {
  const baseClass = `
    flex-1
    min-h-[52px]
    px-4
    py-3
    rounded-lg
    text-center
    font-semibold
    truncate
  `;

  const styles = {
    fill: "bg-menta-600 text-white hover:bg-menta-200",
    outln:
      "border border-gris-placeholder text-negro-principal hover:border-menta-200 hover:text-menta-200",
  };

  return (
    <div className="flex flex-wrap gap-4 justify-end w-full">
      <button
        onClick={onFirstClick}
        className={`${baseClass} ${styles[firstStyle]}`}
        style={{
          maxWidth: `${maxWidth}px`,
          fontSize: "clamp(12px, 1.2vw, 16px)",
        }}
      >
        {firstText}
      </button>
      <button
        onClick={onSecondClick}
        className={`${baseClass} ${styles[secondStyle]}`}
        style={{
          maxWidth: `${maxWidth}px`,
          fontSize: "clamp(12px, 1.2vw, 16px)",
        }}
      >
        {secondText}
      </button>
    </div>
  );
}

export default TwoButtons;
