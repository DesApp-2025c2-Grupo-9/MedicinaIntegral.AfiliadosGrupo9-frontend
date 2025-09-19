import React from "react";
import ReintegroObservacionesModal from "../components/Reintegro/ReintegroObservacionesModal";
import ModalPrueba from "../components/Reintegro/ModalPrueba";
import { useState } from "react";

function Reintegros() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setModalOpen(true)}>Abrir modal</button>
      <ModalPrueba
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        nombreUsuario="Carolina"
        observacionesTexto="Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Donec consectetur tortor enim, sit amet efficitur sem aliquam in."
      />
    </>
  );
}

export default Reintegros;
