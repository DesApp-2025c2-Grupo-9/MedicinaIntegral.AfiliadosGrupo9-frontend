import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import BotonPapelera from "./cardComponents/BotonPapelera";
import UsuarioActual from "./cardComponents/UsuarioActual";
import BotonEditar from "./cardComponents/BotonEditar";
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import MarcoCard from "./cardComponents/MarcoCard";
import TipoDeTramite from "./cardComponents/TipoDeTramite";
import BotonDescargar from "./cardComponents/BotonDescargar";
import capitalize from "../../../utils/capitalize";
import logo from "../../../assets/img/med_integral_logo.png";
import { jsPDF } from "jspdf";
import Swal from "sweetalert2";
import { useState } from "react";
import EditarReceta from "../../../pages/Recetas/EditarReceta";
import { useDeleteReceta } from "../../../services/recetasQueries"; // <-- import hook delete

function RecetaCard(props) {
  let receta = props.receta;
  const [modalEditarOpen, setModalEditarOpen] = useState(false);

  const { mutateAsync } = useDeleteReceta(); // <-- usar hook delete

  const cardStyle = "grid-cols-2";

  // ===== Descarga PDF =====
  const descargarReceta = () => {
    Swal.fire({
      title: "¿Desea descargar esta receta?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Descargar",
      denyButtonText: "Salir",
    }).then((result) => {
      if (result.isConfirmed) {
        let y = 10;
        const doc = new jsPDF({ format: "a5" });
        doc.addImage(logo, "PNG", 100, 10, 40, 40);
        doc.setFontSize(22);
        doc.text("Medicina Integral", 10, y);
        doc.setFontSize(16);
        doc.text("Receta médica", 10, (y += 10));
        doc.setFontSize(12);
        doc.text(`Nro de afiliado: ${receta.nroAfiliado}`, 10, (y += 10));
        doc.text(`Medicamento: ${receta.medicamento}`, 10, (y += 10));
        doc.text(`Cantidad: ${receta.cantidad}`, 10, (y += 10));
        doc.text(`Presentación: ${receta.presentacion}`, 10, (y += 10));
        doc.text(`Estado: ${capitalize(receta.estado)}`, 10, (y += 10));

        if (receta.observaciones && receta.observaciones.length > 0) {
          doc.text("Observaciones:", 10, (y += 10));
          receta.observaciones.forEach((observacion, index) => {
            let yObs = 90 + index * 10;
            doc.text(`Emisor: ${observacion.emisor}`, 20, yObs);
            doc.text(`Descripción: ${observacion.descripcion}`, 25, yObs + 10);
            doc.text(
              `Fecha: ${new Date(observacion.fecha).toLocaleDateString()}`,
              25,
              yObs + 20
            );
          });
        } else doc.text("Observaciones: Sin observaciones", 10, (y += 10));

        doc.save(`Receta.pdf`);
      }
    });
  };

  // ===== Observaciones =====
  const observacionesHTML = Array.isArray(receta.observaciones)
    ? receta.observaciones
        .map((observacion) => {
          const fecha = new Date(observacion.fecha).toLocaleDateString("es-AR");
          return `
            <div style='text-align:left; margin-bottom:10px'>
              <p><strong>Emisor: </strong>${observacion.emisor}</p>
              <p><strong>Descripción: </strong>${observacion.descripcion}</p>
              <p><strong>Fecha: </strong>${fecha}</p>
            </div>
          `;
        })
        .join("")
    : "";

  const verObservaciones = () => {
    Swal.fire({
      title: "Observaciones",
      html: observacionesHTML || "<p>No hay observaciones para esta receta</p>",
      confirmButtonText: "Cerrar",
    });
  };

  // ===== Delete receta =====
  const eliminarReceta = () => {
    Swal.fire({
      title: "Eliminar receta",
      html: `
        <div style='display: flex ;justify-content-center'>
          <div style='text-align:left'>
            <p><strong>Datos de la receta:</strong><p>
            <p><strong>Receta para: </strong> ${receta.nroAfiliado}</p>
            <p><strong>Medicamento: </strong> ${receta.medicamento}</p>
            <p><strong>Cantidad: </strong> ${receta.cantidad}</p>
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#27a700ff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mutateAsync(receta.id);
          Swal.fire({
            html: res.message,
            title: "Eliminada!",
            icon: "success",
          });
        } catch (err) {
          console.log(err);
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar la receta.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      {/*Modal editar*/}
      {modalEditarOpen && (
        <div className="bg-negro-translucido fixed top-0 left-0 w-dvw h-dvh z-10 flex items-center justify-center">
          <EditarReceta
            className="w-full max-w-[600px]"
            receta={receta}
            cancelBtnOnClick={() => setModalEditarOpen(false)}
          />
        </div>
      )}

      {/* Card */}
      <MarcoCard estilo={cardStyle} estado={receta.estado}>
        <ColumnaPrincipal>
          Receta
          {receta.medicamento}
          {`Cantidad: ${receta.cantidad}`}
          {`Presentación: ${receta.presentacion}`}
          {receta.detalleMedicamento}
        </ColumnaPrincipal>

        <div className="grid grid-rows-4 justify-items-end">
          {props.dashboard ? (
            <TipoDeTramite tipo={"Receta"} />
          ) : (
            <>
              <UsuarioActual paciente={receta.paraAfiliado} />
              {receta.estado === "aceptado" && (
                <div className="flex row-start-4">
                  <BotonDescargar onClick={descargarReceta} />
                  <BotonObservaciones onClick={verObservaciones} />
                </div>
              )}
            </>
          )}

          {receta.estado === "pendiente" && !props.dashboard && (
            <div className="flex items-baseline-last justify-end row-start-4">
              <BotonEditar onClick={() => setModalEditarOpen(true)} />
              <BotonPapelera onClick={eliminarReceta} />
            </div>
          )}
        </div>
      </MarcoCard>
    </>
  );
}

export default RecetaCard;
