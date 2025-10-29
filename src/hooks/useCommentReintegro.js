import Swal from 'sweetalert2';
import { useCommentReintegroById } from '../services/queries';

export const useCommentReintegro = () => {
  const { mutateAsync } = useCommentReintegroById();

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

  return { onSubmit };
};
