import Swal from 'sweetalert2';
import { useCreateReintegro } from '../services/queries';
import { useNuevoReintegroStore } from '../store/nuevoReintegroStore';
import { useNavigate } from 'react-router-dom';

export const useNewDatosFacturaHandler = () => {
  const { data } = useNuevoReintegroStore(state => state);
  const { mutateAsync } = useCreateReintegro();
  const navigate = useNavigate();

  const onSubmit = async inputData => {
    const nroGestion = Math.floor(1000 + Math.random() * 9000);

    try {
      await mutateAsync({
        ...data,
        ...inputData,
        nroGestion,
        formaDePago: inputData.formaDePago.toLowerCase()
      });
      Swal.fire({
        html: `
        La solicitud fue enviada correctamente.<br/>
        N° de gestión: ${nroGestion}
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
