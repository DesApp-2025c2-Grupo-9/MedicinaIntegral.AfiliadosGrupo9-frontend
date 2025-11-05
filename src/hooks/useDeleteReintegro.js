import Swal from 'sweetalert2';
import { useDeleteReintegro } from '../services/queries';

export const useDelReintegro = () => {
  const { mutateAsync } = useDeleteReintegro();

  const deleteReintegro = async (reintegro, fechaDePrestacion, valorTotal) => {
    try {
      Swal.fire({
        html: `<p>Está a punto de cancelar la solicitud de reintegro:</p>
          <br />
          <p>Para afiliado: <b>${reintegro.paraAfiliado}</b></p>
          <p>Fecha de prestación: <b>${fechaDePrestacion}</b></p>
          <p>Especialidad: <b>${reintegro.especialidad}</b></p>
          <p>Lugar de atención: <b>${reintegro.lugarDeAtencion}</b></p>
          <p>Valor total: <b>${valorTotal}</b></p>
          <br />
          <p>¿Desea continuar?</p>
        `,
        icon: 'warning',
        iconColor: '#dc143c',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#dc143c',
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#00ab01',
        customClass: {
          htmlContainer: 'reintegros-html',
          cancelButton: 'reintegros-cancel-button',
          confirmButton: 'reintegros-confirm-button'
        }
      }).then(async result => {
        try {
          if (result.isConfirmed) {
            const res = await mutateAsync(reintegro.id);
            Swal.fire({
              html: res.message,
              icon: 'success',
              iconColor: '#00ab01',
              confirmButtonText: 'Continuar',
              confirmButtonColor: '#00ab01',
              customClass: {
                htmlContainer: 'reintegros-html',
                confirmButton: 'reintegros-confirm-button'
              }
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.close();
          }
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteReintegro };
};
