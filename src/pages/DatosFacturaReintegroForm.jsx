import { useForm } from 'react-hook-form';
import Form from '../components/Form';
import InputContainer from '../components/InputContainer';
import { ERROR_MESSAGES, reintegroSchema } from '../schema/reintegroSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import TwoButtons from '../components/TwoButtons';
import { useFormRedirect } from '../hooks/useFormRedirect';
import { useNuevoReintegroStore } from '../store/nuevoReintegroStore';
import { useNewDatosFacturaHandler } from '../hooks/useNewDatosFacturaHandler';

const datosFacturaReintegroSchema = reintegroSchema
  .pick({
    factura: true,
    formaDePago: true,
    cbu: true,
    observaciones: true
  })
  .refine(
    data => {
      if (data.formaDePago === 'Transferencia') {
        return data.cbu?.length === 22;
      } else {
        return true;
      }
    },
    {
      error: iss => {
        const message = iss.input.cbu?.length > 0 ? ERROR_MESSAGES.CBU.LENGTH : ERROR_MESSAGES.CBU.REQUIRED;
        return message;
      },
      path: ['cbu']
    }
  );

function DatosFacturaReintegroForm({ className }) {
  const fechaActual = new Date().toISOString().split('T')[0];
  const { onSubmit } = useNewDatosFacturaHandler();
  const setData = useNuevoReintegroStore(state => state.setData);
  const data = useNuevoReintegroStore(state => state.data);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    watch
  } = useForm({
    resolver: zodResolver(datosFacturaReintegroSchema),
    defaultValues: {
      factura: {
        fecha: data?.factura?.fecha,
        cuit: data?.factura?.cuit,
        valorTotal: data?.factura?.valorTotal,
        personaAFacturar: data?.factura?.personaAFacturar
      },
      formaDePago: data?.formaDePago,
      cbu: data?.cbu,
      observaciones: data?.observaciones
    }
  });
  const navigate = useNavigate();
  const formaDePago = watch('formaDePago');
  const formValues = watch();

  useFormRedirect(isSubmitSuccessful);

  return (
    <Form
      legend='Datos de la factura'
      onSubmit={handleSubmit(onSubmit)}
      className={`max-w-211.5 ${className}`}
    >
      <InputContainer>
        <Input
          {...register('factura.fecha')}
          type='date'
          id='factura.fecha'
          label='Fecha:'
          max={fechaActual}
          errorMsg={errors.factura?.fecha?.message}
        />
        <Input
          {...register('factura.cuit')}
          type='text'
          id='factura.cuit'
          label='CUIT (sin guiones):'
          placeholder='Ingresar CUIT'
          maxLength='11'
          onInput={e => {
            e.target.value = e.target.value.replace(/\D/g, ''); // elimina todo lo que no sea número
          }}
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
          onKeyDown={e => {
            if (e.key === '-' || e.key === 'e') {
              e.preventDefault();
            }
          }}
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
            type='text'
            id='cbu'
            label='CBU:'
            placeholder='Ingresar CBU'
            maxLength='22'
            onInput={e => {
              e.target.value = e.target.value.replace(/\D/g, ''); // elimina todo lo que no sea número
            }}
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
          onClick={() => {
            console.log({ ...data, ...formValues });
            setData({ ...data, ...formValues });
            navigate(-1);
          }}
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
