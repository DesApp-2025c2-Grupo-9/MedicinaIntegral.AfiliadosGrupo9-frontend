import React from "react";
import ModalObservaciones from "../components/ModalObservaciones/ModalObservaciones";
import BackButton from "../components/BackButton";
import PaginationButtons from "../components/PaginationButtons";
import TwoButtons from "../components/TwoButtons";
import { useState } from "react";
import ModalSituacionTerapeutica from "../components/ModalSituacionTerapeutica/ModalSituacionTerapeutica";
import DropdownFamiliar from "../components/ModalModificacionReceta/DropDownFamiliar";
import ModalModificacionReceta from "../components/ModalModificacionReceta/ModalModificacionReceta";
import TwoNavButtons from "../components/TwoNavButtons";
import { icons } from "../utils/icons";

function Pruebas() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSituacionOpen, setModalSituacionOpen] = useState(false);
  const [modalOpenRecetas, setModalOpenRecetas] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const familiares = [
    { id: 1, nombre: "Carolina", apellido: "Benitez" },
    { id: 2, nombre: "Juan", apellido: "Perez" },
    { id: 3, nombre: "Ana", apellido: "Gomez" },
    { id: 4, nombre: "Luis", apellido: "Rodriguez" },
  ];
  return (
    <>
      <h2>Prueba Dropdown</h2>
      <DropdownFamiliar
        label={"Modificar solicitud de Receta"}
        familiares={familiares}
        value={selectedUser?.id}
        onChange={(id) => {
          const user = familiares.find((f) => f.id === id);
          setSelectedUser(user);
        }}
      />

      {selectedUser && (
        <p>
          Seleccionado: {selectedUser.nombre} {selectedUser.apellido}
        </p>
      )}
      <button onClick={() => setModalOpen(true)}>
        Abrir Modal Observaciones
      </button>
      <button onClick={() => setModalSituacionOpen(true)}>
        Abrir Modal Situación Terapéutica
      </button>
      <button onClick={() => setModalOpenRecetas(true)}>
        Abrir modal recetas
      </button>

      <ModalObservaciones
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        nombreUsuario="Carolina"
        prefix="Para"
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

      <ModalSituacionTerapeutica
        open={modalSituacionOpen}
        onClose={() => setModalSituacionOpen(false)}
        nombreUsuario="Carolina"
        prefix="Situación terapéutica,"
        diagnosticoTexto="Diabetes tipo 2"
        headerText="Volver a Mi cuenta"
      />

      <ModalModificacionReceta
        open={modalOpenRecetas}
        onClose={() => setModalOpenRecetas(false)}
        label="Para afiliado:"
        familiares={familiares}
        headerText="Modificar solicitud de Receta"
        value={selectedUser?.id}
        onChange={(id) => {
          const user = familiares.find((f) => f.id === id);
          setSelectedUser(user);
        }}
      />
      <TwoNavButtons
        firstIcon={icons.reintegros}
        firstDescription="Historial de reintegros"
        secondIcon={icons.agregar}
        secondDescription="Solicitar nuevo reintegro"
      />
    </>
  );
}

export default Pruebas;
