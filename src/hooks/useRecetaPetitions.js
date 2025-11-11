import Swal from 'sweetalert2';
import { useCommentRecetaById } from '../services/recetasQueries';
import jsPDF from 'jspdf';
import logo from '../assets/img/med_integral_logo.png';
import capitalize from '../utils/capitalize';

export const useCommentReceta = () => {
  const { mutateAsync } = useCommentRecetaById();

  const onSubmit = async inputData => {
    try {
      await mutateAsync(inputData);
      Swal.fire({
        icon: 'success',
        iconColor: '#00ab01',
        text: 'El comentario fue enviado correctamente.',
        confirmButtonText: 'Continuar',
        customClass: {
          htmlContainer: 'swal-html',
          confirmButton: 'swal-confirm-button'
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { onSubmit };
};

export const useDescargarReceta = () => {
  const descargarReceta = receta => {
    Swal.fire({
      icon: 'question',
      iconColor: '#1B76FF',
      text: '¿Desea descargar esta receta?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      customClass: {
        htmlContainer: 'swal-html',
        cancelButton: 'swal-cancel-button',
        confirmButton: 'swal-confirm-button'
      },
      reverseButtons: true
    }).then(result => {
      if (!result.isConfirmed) return;

      const fechaSolicitud = receta.createdAt
        ? new Date(receta.createdAt).toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
        : 'Sin fecha';

      let y = 10;
      const doc = new jsPDF({ format: 'a5' });

      // Encabezado
      doc.addImage(logo, 'PNG', 100, 10, 40, 40);
      doc.setFontSize(22);
      doc.text('Medicina Integral', 10, y);
      doc.setFontSize(16);
      doc.text('Receta médica', 10, (y += 10));

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
        doc.text('Observaciones:', 10, (y += 10));
        receta.observaciones.forEach((observacion, index) => {
          let yObs = 90 + index * 10;
          doc.text(`Emisor: ${observacion.emisor}`, 20, yObs);
          doc.text(`Descripción: ${observacion.descripcion}`, 25, yObs + 10);
          doc.text(`Fecha: ${new Date(observacion.fecha).toLocaleDateString()}`, 25, yObs + 20);
        });
      } else {
        doc.text('Observaciones: Sin observaciones', 10, (y += 10));
      }

      doc.save(`Receta.pdf`);
    });
  };

  return { descargarReceta };
};
