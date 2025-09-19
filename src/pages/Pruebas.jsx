import React from "react";

import ModalObservaciones from "../components/ModalObservaciones/ModalObservaciones";
import { useState } from "react";

function Reintegros() {
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
    </>
  );
}

export default Reintegros;
