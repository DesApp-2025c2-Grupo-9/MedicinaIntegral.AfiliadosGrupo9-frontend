import { useForm } from 'react-hook-form';
import { useReintegroStepTwoSchema } from '../hooks/useReintegroStepTwoSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useReintegroStore } from '../store/reintegroStore';
import { useReintegroStepTwoHandler } from '../hooks/useReintegroStepTwoHandler';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TwoButtons from '../components/TwoButtons';
import Input from '../components/Input';
import InputContainer from '../components/InputContainer';
import Select from '../components/Select';
import Form from '../components/Form';
import capitalize from '../utils/capitalize';
import { addDays, format } from 'date-fns';
import { useFormRedirect } from '../hooks/useFormRedirect';

function ReintegroFormStepTwo({ className }) {
  const fechaActual = new Date().toISOString().split('T')[0];

  const reintegro = useReintegroStore(state => state.reintegro);
  const setReintegro = useReintegroStore(state => state.setReintegro);
  const formaDePago = reintegro?.formaDePago && capitalize(reintegro.formaDePago);
  const fechaFactura = reintegro?.factura?.fecha && format(addDays(reintegro?.factura?.fecha, 1), 'yyyy-MM-dd');
  const observacionAfiliado = typeof reintegro?.observaciones === 'object' && reintegro?.observaciones?.find(obs => obs.rolEmisor === 'Afiliado');
  const { reintegroStepTwoSchema } = useReintegroStepTwoSchema();
  const { onSubmit } = useReintegroStepTwoHandler();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(reintegroStepTwoSchema),
    defaultValues: {
      factura: {
        ...reintegro?.factura,
        fecha: fechaFactura
      },
      formaDePago: formaDePago,
      cbu: reintegro?.cbu,
      observaciones: observacionAfiliado?.descripcion ?? reintegro?.observaciones
    }
  });

  const navigate = useNavigate();
  const formaDePagoInput = watch('formaDePago');
  const formValues = watch();

  useFormRedirect();

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
        {formaDePagoInput === 'Transferencia' ? (
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
            setReintegro({ ...reintegro, ...formValues });
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
          isLoading={isSubmitting}
        >
          Confirmar
        </Button>
      </TwoButtons>
    </Form>
  );
}
export default ReintegroFormStepTwo;
