import Swal from 'sweetalert2';
import { useCommentReintegroById } from '../services/queries';

export const useCommentReintegro = () => {
  const { mutateAsync } = useCommentReintegroById();

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
          cancelButton: 'swal-cancel-button',
          confirmButton: 'swal-confirm-button'
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { onSubmit };
};
