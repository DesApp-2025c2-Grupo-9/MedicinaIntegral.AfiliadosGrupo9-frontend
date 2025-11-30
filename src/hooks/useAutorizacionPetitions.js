import Swal from 'sweetalert2';
import { useDeleteAutorizacion, useCommentAutorizacionById } from '../services/autorizacionesQueries';
import { addDays, format } from 'date-fns';
export const useEliminarAutorizacion = () => {
  const { mutateAsync } = useDeleteAutorizacion();

  const eliminarAutorizacion = props => {
    Swal.fire({
      icon: 'warning',
      iconColor: '#dc143c',
      titleText: 'Está a punto de eliminar la solicitud de autorización:',
      html: `
        <p>Para afiliado: <b>${props.paraAfiliado}</b></p>
        <p>Fecha prevista: <b>${format(addDays(props.fechaSolicitud, 1), 'dd/MM/yyyy')}</b></p>
        <p>Especialidad: <b>${props.especialidad}</b><p>
        <p>Práctica: <b>${props.practica}</b><p>
        <p>Lugar de prestación: <b>${props.lugarAtencion}</b></p>
        <p>Dias de internación: <b>${props.diasDeInternacion}</b></p><br>
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
      if (result.isConfirmed) {
        try {
          const res = await mutateAsync(props.id);
          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              iconColor: '#00ab01',
              titleText: 'Eliminada',
              html: res.message || 'Autorización eliminada exitosamente.',
              confirmButtonText: 'Continuar',
              customClass: {
                title: 'swal-title',
                htmlContainer: 'swal-html',
                confirmButton: 'swal-confirm-button'
              }
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };
  return { eliminarAutorizacion };
};

export const useCommentAutorizacion = () => {
  const { mutateAsync } = useCommentAutorizacionById();

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
