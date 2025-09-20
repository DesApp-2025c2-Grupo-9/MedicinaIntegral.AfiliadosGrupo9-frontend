import React from "react";
import ModalObservaciones from "../components/ModalObservaciones/ModalObservaciones";
import BackButton from "../components/BackButton";
import PaginationButtons from "../components/PaginationButtons";

import TwoButtons from "../components/TwoButtons";
import { useState } from "react";

function Pruebas() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setModalOpen(true)}>Abrir modal</button>
      <ModalObservaciones
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        nombreUsuario="Carolina"
        fechaEnvio="2025-08-20T14:30:00Z"
        observacionesTexto="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Donec consectetur tortor enim, sit amet efficitur sem aliquam in."
        headerText="Volver a Reintegros"
      />
      <BackButton />
      <PaginationButtons />

      <TwoButtons
        firstStyle="outln"
        firstText="Prueba"
        onFirstClick={() => alert("Prueba1")}
        secondStyle="fill"
        secondText="Confirmar"
        onSecondClick={() => alert("Prueba2")}
      />
    </>
  );
}

export default Pruebas;
