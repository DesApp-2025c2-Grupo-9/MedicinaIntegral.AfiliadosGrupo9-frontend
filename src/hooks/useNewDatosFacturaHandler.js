import Swal from 'sweetalert2';
import { useCreateReintegro } from '../services/queries';
import { useNuevoReintegroStore } from '../store/nuevoReintegroStore';
import { useNavigate } from 'react-router-dom';

export const useNewDatosFacturaHandler = () => {
  const { data } = useNuevoReintegroStore(state => state);
  const { mutateAsync } = useCreateReintegro();
  const navigate = useNavigate();

  const onSubmit = async inputData => {
    console.log({
      ...data,
      ...inputData,
      formaDePago: inputData.formaDePago.toLowerCase()
    });
    try {
      await mutateAsync({
        ...data,
        ...inputData,
        formaDePago: inputData.formaDePago.toLowerCase()
      });
      Swal.fire({
        html: `
        La solicitud fue enviada correctamente.<br/>
        N° de gestión: 1234
      `,
        icon: 'success',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#00ab01'
      }).then(() => {
        navigate('/reintegros/historial-reintegros');
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { onSubmit };
};
