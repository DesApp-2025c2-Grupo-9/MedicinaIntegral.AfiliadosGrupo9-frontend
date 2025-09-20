import React from "react";
import Button from "./Button";

function TwoButtons({
  firstText = "Cancelar",
  firstStyle = "outln",
  onFirstClick,
  secondText = "Guardar cambios",
  secondStyle = "fill",
  onSecondClick,
}) {
  return (
    <div className="flex w-84 items-center gap-4">
      <Button style={firstStyle} onClick={onFirstClick}>
        {firstText}
      </Button>
      <Button style={secondStyle} onClick={onSecondClick}>
        {secondText}
      </Button>
    </div>
  );
}

export default TwoButtons;
