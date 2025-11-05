import Swal from "sweetalert2";
import { useDeleteAutorizacion, useCommentAutorizacionById } from '../services/autorizacionesQueries';

export const useEliminarAutorizacion = () => {
    const { mutateAsync } = useDeleteAutorizacion();

    const eliminarAutorizacion = (props) => {
    Swal.fire({
      html: `
            <p>Está a punto de cancelar la solicitud de autorización:</p><br>
             <p>Autorizacion para: <b>${props.paraAfiliado}</b> </p>
             <p>Especialidad: <b>${props.especialidad}</b> <p>
             <p>Practica: <b>${props.practica}</b><p>
             <p>Fecha prevista:  <b>${new Date(props.fechaSolicitud).toLocaleDateString()}</b></p>
             <p>Dias de internación:  <b>${props.diasDeInternacion}</b></p><br>
            <p>¿Desea continuar?</p>
         `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      iconColor: '#dc143c',
      cancelButtonText: 'Cancelar',
      customClass: {
          cancelButton: 'modal-tramites-cancel-button',
          confirmButton: 'modal-tramites-confirm-button'
      }
    }).then(async (result) => {
      if(result.isConfirmed) {
        try {
          const res = await mutateAsync(props.id);
          if (result.isConfirmed) {
            Swal.fire({
              html: res.message,
              title: "Eliminada!",
              text: "Su autorización ha sido eliminada.",
              icon: "success"
            });
          }
        } catch(err){
          console.log(err)
        }
      }
    });
    }
    return { eliminarAutorizacion };
}

export const useCommentAutorizacion = () => {
    const { mutateAsync } = useCommentAutorizacionById();
    console.log()
    const onSubmit = async inputData => {
        try {
          await mutateAsync(inputData);
          Swal.fire({
            html: 'El comentario fue enviado correctamente.',
            icon: 'success',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#00ab01'
          });
        } catch (error) {
          console.log(error);
        }
      };
    return { onSubmit }
}