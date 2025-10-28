import Form from '../../components/Form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import InputContainer from '../../components/InputContainer';
import Select from '../../components/Select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useNewRecetaSchema } from '../../hooks/useNewRecetaSchema';
import { useUserStore } from '../../store/userStore';
import { useCreateReceta } from '../../services/recetasQueries';
import { axiosPrivate } from '../../api/axios';

function SolicitarReceta() {
  // const solicitudSchema = recetaSchema;
  const { user } = useUserStore(state => state);
  const listaAfiliados = user.grupoFamiliar?.map(familiar => `${familiar.nombre} ${familiar.apellido}`);

  const { recetaSchema } = useNewRecetaSchema({ listaAfiliados });
  const { mutateAsync } = useCreateReceta(axiosPrivate);
  // console.log("Usuario logueado:", JSON.stringify(user, null, 2));
  //Se inicia el form con el resolver de zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(recetaSchema)
  });
  const navigate = useNavigate();

  const onSubmit = async formData => {
    try {
      console.log(formData.paraidAfiliado);
      Swal.fire({
        title: 'Confirmacion de solicitud',
        html: `
            <p>Está a punto de solicitar una receta con los siguientes datos:</p>
            <br/>
            <p>Medicamento: ${formData.medicamento}</p>
            <p>Presentación: ${formData.presentacion} </p>
            <p>Cantidad: ${formData.cantidad}</p>
            `,
        icon: 'question',
        confirmButtonText: 'Aceptar',
        showCancelButton: true,
        width: '400px'
      }).then(async () => {
        await mutateAsync(formData);
        Swal.fire({
          title: 'Enviado',
          text: 'Su receta se ha enviado correctamente, puede encontrarla en "Ver Recetas"',
          icon: 'success'
        });
        navigate('/recetas/ver-recetas');
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/*Dropdown afiliado - Modificar para que aparezca el nro de afiliado tambien*/}
      <Select
        {...register('paraAfiliado')}
        id='paraAfiliado'
        label='Para afiliado:'
        placeholder='Seleccionar afiliado'
        options={listaAfiliados}
        errorMsg={errors.paraAfiliado?.message}
      />
      {/*Input medicamento - Input Cantidad */}
      <InputContainer>
        <Input
          {...register('medicamento')}
          label={'Medicamento'}
          placeholder={'Ingresar Medicamento'}
          maxLength={50}
          errorMsg={errors.medicamento?.message}
        />
        <Input
          {...register('cantidad', { valueAsNumber: true })}
          type='number'
          min={1}
          maxLength={2}
          label={'Cantidad'}
          placeholder={'Ingrese cantidad'}
          errorMsg={errors.cantidad?.message}
        />
      </InputContainer>
      {/*InputPresentación */}
      <Input
        {...register('presentacion')}
        label={'Presentación'}
        maxLength={50}
        placeholder={'Ingrese la presentación'}
        errorMsg={errors.presentacion?.message}
      />

      {/*Input observaciones*/}
      <Input
        {...register('observaciones')}
        label={'Observaciones'}
        errorMsg={errors.observaciones?.message}
        maxLength={100}
      />
      <Button
        type='submit'
        state={isSubmitting ? 'disabled' : 'active'}
        disabled={isSubmitting}
        className={'ml-auto'}
      >
        Confirmar
      </Button>
    </Form>
  );
}

export default SolicitarReceta;
