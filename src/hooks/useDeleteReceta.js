import Swal from 'sweetalert2';
import { useDeleteReceta } from '../services/recetasQueries';

export const useDelReceta = () => {
  const { mutateAsync } = useDeleteReceta();

  const deleteRecetaHandler = async receta => {
    const result = await Swal.fire({
      icon: 'warning',
      iconColor: '#dc143c',
      titleText: 'Está a punto de eliminar la solicitud de receta:',
      html: `
        <p>Medicamento: <b>${receta.medicamento}</b></p>
        <p>Cantidad: <b>${receta.cantidad}</b></p>
        <p>Presentación: <b>${receta.presentacion}</b></p>
        <br />
        <p>¿Desea continuar?</p>
      `,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      customClass: {
        title: 'swal-title',
        htmlContainer: 'swal-html',
        cancelButton: 'swal-cancel-button',
        confirmButton: 'swal-confirm-button'
      }
    });
    if (result.isConfirmed) {
      try {
        const res = await mutateAsync(receta.id);
        Swal.fire({
          icon: 'success',
          iconColor: '#00ab01',
          titleText: 'Eliminada',
          html: res.message || 'Receta eliminada exitosamente.',
          confirmButtonText: 'Continuar',
          customClass: {
            title: 'swal-title',
            htmlContainer: 'swal-html',
            confirmButton: 'swal-confirm-button'
          }
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          iconColor: '#dc143c',
          titleText: 'Ha ocurrido un error',
          text: 'No se pudo eliminar la receta.',
          confirmButtonText: 'Continuar',
          customClass: {
            title: 'swal-title',
            htmlContainer: 'swal-html'
          }
        });
      }
    }
  };

  return { deleteRecetaHandler };
};
