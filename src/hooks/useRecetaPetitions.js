import Swal from "sweetalert2";
import { useCommentRecetaById } from "../services/recetasQueries";
import jsPDF from "jspdf";
import logo from "../assets/img/med_integral_logo.png";
import capitalize from "../utils/capitalize";
import "../styles/recetas.css";

export const useCommentReceta = () => {
  const { mutateAsync } = useCommentRecetaById();
  console.log();
  const onSubmit = async (inputData) => {
    try {
      await mutateAsync(inputData);
      Swal.fire({
        html: "El comentario fue enviado correctamente.",
        icon: "success",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#00ab01",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { onSubmit };
};

export const useDescargarReceta = () => {
  const descargarReceta = (receta) => {
    Swal.fire({
      title: "¿Desea descargar esta receta?",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Descargar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "swal-popup-custom",
        confirmButton: "swal-btn-confirm",
        cancelButton: "swal-btn-cancel",
      },
      reverseButtons: true,
    }).then((result) => {
      if (!result.isConfirmed) return;

      const fechaSolicitud = receta.createdAt
        ? new Date(receta.createdAt).toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "Sin fecha";

      let y = 10;
      const doc = new jsPDF({ format: "a5" });

      // Encabezado
      doc.addImage(logo, "PNG", 100, 10, 40, 40);
      doc.setFontSize(22);
      doc.text("Medicina Integral", 10, y);
      doc.setFontSize(16);
      doc.text("Receta médica", 10, (y += 10));

      // Datos principales
      doc.setFontSize(12);
      doc.text(`Nro de afiliado: ${receta.nroAfiliado}`, 10, (y += 10));
      doc.text(`Medicamento: ${receta.medicamento}`, 10, (y += 10));
      doc.text(`Cantidad: ${receta.cantidad}`, 10, (y += 10));
      doc.text(`Presentación: ${receta.presentacion}`, 10, (y += 10));
      doc.text(`Estado: ${capitalize(receta.estado)}`, 10, (y += 10));
      doc.text(`Fecha de solicitud: ${fechaSolicitud}`, 10, (y += 10));

      // Observaciones
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
      } else {
        doc.text("Observaciones: Sin observaciones", 10, (y += 10));
      }

      doc.save(`Receta.pdf`);
    });
  };

  return { descargarReceta };
};
