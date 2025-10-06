import { useForm } from 'react-hook-form';
import Form from '../components/Form';
import InputContainer from '../components/InputContainer';
import { reintegroSchema } from '../schema/reintegroSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import { useNuevoReintegroStore } from '../store/nuevoReintegroStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCreateReintegro } from '../services/queries';
import TwoButtons from '../components/TwoButtons';

const datosFacturaReintegroSchema = reintegroSchema.pick({
  factura: true,
  formaDePago: true,
  cbu: true,
  observaciones: true
});

function DatosFacturaReintegroForm() {
  const { mutateAsync } = useCreateReintegro();
  const { data, setData } = useNuevoReintegroStore(state => state);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    watch
  } = useForm({
    resolver: zodResolver(datosFacturaReintegroSchema)
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!useNuevoReintegroStore.persist.hasHydrated) return;

    const primerPasoCompleto = data.paraAfiliado && data.fechaDePrestacion && data.especialidad && data.medico && data.lugarDeAtencion;
    if (!primerPasoCompleto && !isSubmitSuccessful) {
      navigate('/reintegros/solicitar-reintegro');
    }
  }, [data, navigate, isSubmitSuccessful]);

  const formaDePago = watch('formaDePago');

  const onSubmit = async inputData => {
    try {
      const res = await mutateAsync({
        ...data,
        ...inputData,
        formaDePago: inputData.formaDePago.toLowerCase()
      });
      console.log('Reintegro creado.', res);
      Swal.fire({
        html: `
        La solicitud fue enviada correctamente.<br/>
        N° de gestión: 1234
      `,
        icon: 'success',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#00ab01'
      }).then(() => {
        setData({});
        navigate('/reintegros/historial-reintegros');
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      legend='Datos de la factura'
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-211.5'
    >
      <InputContainer>
        <Input
          {...register('factura.fecha')}
          type='date'
          id='factura.fecha'
          label='Fecha:'
          errorMsg={errors.factura?.fecha?.message}
        />
        <Input
          {...register('factura.cuit')}
          type='text'
          id='factura.cuit'
          label='CUIT:'
          placeholder='Ingresar CUIT'
          errorMsg={errors.factura?.cuit?.message}
        />
      </InputContainer>

      <InputContainer>
        <Input
          {...register('factura.valorTotal')}
          type='number'
          id='factura.valorTotal'
          label='Valor total en pesos ARS:'
          placeholder='Ingresar valor'
          errorMsg={errors.factura?.valorTotal?.message}
        />
        <Input
          {...register('factura.personaAFacturar')}
          type='text'
          id='factura.personaAFacturar'
          label='Persona a la que se factura:'
          placeholder='Ingresar nombre completo'
          errorMsg={errors.factura?.personaAFacturar?.message}
        />
      </InputContainer>

      <InputContainer>
        <Select
          {...register('formaDePago')}
          id='formaDePago'
          label='Forma de pago del reintegro:'
          placeholder='Seleccionar forma de pago'
          options={['Cheque', 'Efectivo', 'Transferencia']}
          errorMsg={errors.formaDePago?.message}
        />
        {formaDePago === 'Transferencia' ? (
          <Input
            {...register('cbu')}
            type='number'
            id='cbu'
            label='CBU:'
            placeholder='Ingresar CBU'
            errorMsg={errors.cbu?.message}
          />
        ) : (
          <div className='w-full'></div>
        )}
      </InputContainer>

      <Input
        {...register('observaciones')}
        isTextArea
        id='observaciones'
        label='Observaciones:'
        placeholder='Ingresar observaciones'
        errorMsg={errors.observaciones?.message}
      />
      <TwoButtons className='ml-auto'>
        <Button
          onClick={() => navigate(-1)}
          type='button'
          style='outln'
        >
          Atrás
        </Button>
        <Button
          type='submit'
          state={isSubmitting ? 'disabled' : 'active'}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Cargando...' : 'Confirmar solicitud'}
        </Button>
      </TwoButtons>
    </Form>
  );
}
export default DatosFacturaReintegroForm;
