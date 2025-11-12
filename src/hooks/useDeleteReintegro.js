import Swal from 'sweetalert2';
import { useDeleteReintegro } from '../services/queries';

export const useDelReintegro = () => {
  const { mutateAsync } = useDeleteReintegro();

  const deleteReintegro = (reintegro, fechaDePrestacion, valorTotal) => {
    Swal.fire({
      icon: 'warning',
      iconColor: '#dc143c',
      titleText: 'Está a punto de eliminar la solicitud de reintegro:',
      html: `
        <p>Para afiliado: <b>${reintegro.paraAfiliado}</b></p>
        <p>Fecha de prestación: <b>${fechaDePrestacion}</b></p>
        <p>Especialidad: <b>${reintegro.especialidad}</b></p>
        <p>Lugar de atención: <b>${reintegro.lugarDeAtencion}</b></p>
        <p>Valor total: <b>${valorTotal}</b></p>
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
    }).then(async result => {
      try {
        if (result.isConfirmed) {
          const res = await mutateAsync(reintegro.id);
          Swal.fire({
            icon: 'success',
            iconColor: '#00ab01',
            titleText: res.message ? 'Eliminada' : 'Eliminado',
            html: res.message || 'Reintegro eliminado exitosamente.',
            confirmButtonText: 'Continuar',
            customClass: {
              title: 'swal-title',
              htmlContainer: 'swal-html',
              confirmButton: 'swal-confirm-button'
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.close();
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return { deleteReintegro };
};
