import { useLocation, useNavigate } from 'react-router-dom';
import { useReintegroStore } from '../store/reintegroStore';
import { useCreateReintegro, useUpdateReintegro } from '../services/queries';
import Swal from 'sweetalert2';

export const useReintegroStepTwoHandler = () => {
  const reintegro = useReintegroStore(state => state.reintegro);
  const location = useLocation();
  const navigate = useNavigate();
  const { mutateAsync: createReintegro } = useCreateReintegro();
  const { mutateAsync: updateReintegro } = useUpdateReintegro();
  let textToShow = '';

  const newReintegroHandler = async inputData => {
    const nroGestion = Math.floor(1000 + Math.random() * 9000);
    await createReintegro({
      ...reintegro,
      ...inputData,
      nroGestion,
      formaDePago: inputData.formaDePago.toLowerCase()
    });
    textToShow = `La solicitud fue enviada correctamente.<br />N° de gestión: ${nroGestion}.`;
  };

  const editReintegroHandler = async inputData => {
    await updateReintegro({
      data: {
        ...reintegro,
        ...inputData,
        formaDePago: inputData.formaDePago.toLowerCase()
      },
      id: reintegro.id
    });
    textToShow = 'La solicitud fue actualizada correctamente.';
  };

  const onSubmit = async inputData => {
    try {
      if (location.pathname === '/reintegros/datos-factura') {
        await newReintegroHandler(inputData);
      } else {
        await editReintegroHandler(inputData);
      }
      Swal.fire({
        html: textToShow,
        icon: 'success',
        iconColor: '#00ab01',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#00ab01',
        customClass: {
          htmlContainer: 'reintegros-html',
          confirmButton: 'reintegros-confirm-button'
        }
      }).then(() => {
        navigate('/reintegros/historial-reintegros');
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { onSubmit };
};
