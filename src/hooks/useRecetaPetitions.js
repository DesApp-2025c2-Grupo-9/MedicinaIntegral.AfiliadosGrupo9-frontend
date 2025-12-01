import Swal from "sweetalert2";
import { useCommentRecetaById } from "../services/recetasQueries";
import jsPDF from "jspdf";
import logo from "../assets/img/med_integral_logo.png";
import capitalize from "../utils/capitalize";

export const useCommentReceta = () => {
  const { mutateAsync } = useCommentRecetaById();

  const onSubmit = async (inputData) => {
    try {
      await mutateAsync(inputData);
      Swal.fire({
        icon: "success",
        iconColor: "#00ab01",
        text: "El comentario fue enviado correctamente.",
        confirmButtonText: "Continuar",
        customClass: {
          htmlContainer: "swal-html",
          confirmButton: "swal-confirm-button",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return { onSubmit };
};

export const useDescargarReceta = () => {
  const descargarReceta = (receta) => {
    const fechaSolicitud = receta.fechaActualizacion
      ? new Date(receta.fechaActualizacion).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "Sin fecha";

    const doc = new jsPDF({ format: "a5" });
    let y = 15;

    //  Encabezado
    doc.addImage(logo, "PNG", 10, y, 25, 25);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Medicina Integral", 40, y + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Receta médica", 40, y + 18);

    //linea
    y += 35;
    doc.setLineWidth(0.5);
    doc.line(10, y, 140, y);
    y += 10;

    //Datos principales
    doc.setFontSize(11);
    const datos = [
      ["N° de afiliado:", receta.nroAfiliado],
      ["Medicamento:", receta.medicamento],
      ["Cantidad:", receta.cantidad],
      ["Presentación:", receta.presentacion],
      ["Estado:", capitalize(receta.estado)],
      ["Fecha de solicitud:", fechaSolicitud],
    ];

    datos.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, 10, y);
      doc.setFont("helvetica", "normal");
      doc.text(String(value), 60, y);
      y += 8;
    });

    // Línea
    y += 2;
    doc.line(10, y, 140, y);
    y += 10;

    //  Observaciones
    doc.setFont("helvetica", "bold");
    doc.text("Observaciones:", 10, y);
    y += 8;
    doc.setFont("helvetica", "normal");

    if (receta.observaciones && receta.observaciones.length > 0) {
      receta.observaciones.forEach((obs, i) => {
        if (y > 180) {
          doc.addPage();
          y = 20;
        }

        doc.text(
          `• Emisor: ${obs.emisor || obs.rolEmisor || "Desconocido"}`,
          15,
          y
        );
        y += 6;
        doc.text(`Descripción: ${obs.descripcion || "Sin descripción"}`, 15, y);
        y += 6;
        doc.text(
          `Fecha: ${new Date(obs.fecha).toLocaleDateString("es-AR")}`,
          15,
          y
        );
        y += 10;
      });
    } else {
      doc.text("Sin observaciones registradas.", 15, y);
    }

    //  Footer
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text("Documento generado automáticamente - Medicina Integral", 10, 195);

    doc.save(`Receta_${receta.nroAfiliado}.pdf`);
  };

  return { descargarReceta };
};
