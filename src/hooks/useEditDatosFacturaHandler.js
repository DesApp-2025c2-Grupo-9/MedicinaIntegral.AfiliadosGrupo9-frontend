import Swal from 'sweetalert2';
import { useNuevoReintegroStore } from '../store/nuevoReintegroStore';
import { useUpdateReintegro } from '../services/queries';
import { useEditReintegroStep } from '../store/editReintegroStepStore';
import useAxiosPrivate from './useAxiosPrivate';

export const useEditDatosFacturaHandler = (reintegro, setIsModalOpen) => {
  const { data, setData } = useNuevoReintegroStore(state => state);
  const { setCurrentStep } = useEditReintegroStep();
  const axiosPrivate = useAxiosPrivate();
  const { mutateAsync } = useUpdateReintegro(axiosPrivate);

  const onSubmit = async inputData => {
    try {
      await mutateAsync({
        data: {
          ...data,
          ...inputData,
          formaDePago: inputData.formaDePago.toLowerCase()
        },
        id: reintegro.id
      });
      setCurrentStep(3);
      setIsModalOpen(false);
      Swal.fire({
        html: `
        La solicitud fue actualizada correctamente.<br/>
        N° de gestión: 1234
      `,
        icon: 'success',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#00ab01'
      }).then(() => {
        setCurrentStep(1);
        setData({});
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { onSubmit };
};
