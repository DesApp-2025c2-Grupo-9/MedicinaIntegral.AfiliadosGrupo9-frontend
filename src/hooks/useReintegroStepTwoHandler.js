import { useLocation, useNavigate } from 'react-router-dom';
import { useReintegroStore } from '../store/reintegroStore';
import { useCreateReintegro, useUpdateReintegro, useGetAfiliado } from '../services/queries';
import Swal from 'sweetalert2';

export const useReintegroStepTwoHandler = () => {
  const reintegro = useReintegroStore(state => state.reintegro);
  const location = useLocation();
  const navigate = useNavigate();
  const { mutateAsync: createReintegro } = useCreateReintegro();
  const { mutateAsync: updateReintegro } = useUpdateReintegro();
  let textToShow = '';

  const { data } = useGetAfiliado();
  const grupoFamiliar = data?.data?.grupoFamiliar;

  const idParaAfiliado = paraAfiliado => {
    const unAfiliado = grupoFamiliar.find(familiar => paraAfiliado.includes(familiar.nombre) && paraAfiliado.includes(familiar.apellido));
    return unAfiliado?.id;
  };

  const newReintegroHandler = async inputData => {
    const nroGestion = Math.floor(1000 + Math.random() * 9000);
    const idAfiliado = idParaAfiliado(reintegro.paraAfiliado);
    await createReintegro({
      ...reintegro,
      ...inputData,
      idAfiliado,
      nroGestion,
      formaDePago: inputData.formaDePago.toLowerCase()
    });
    textToShow = `La solicitud fue enviada correctamente.<br />N° de gestión: <b>${nroGestion}</b>.`;
  };

  const editReintegroHandler = async inputData => {
    const idAfiliado = idParaAfiliado(reintegro.paraAfiliado);
    await updateReintegro({
      data: {
        ...reintegro,
        ...inputData,
        idAfiliado,
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
        icon: 'success',
        iconColor: '#00ab01',
        html: textToShow,
        confirmButtonText: 'Continuar',
        customClass: {
          htmlContainer: 'swal-html',
          confirmButton: 'swal-confirm-button'
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
