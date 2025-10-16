import { useForm } from 'react-hook-form';
import Form from '../components/Form';
import InputContainer from '../components/InputContainer';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import TwoButtons from '../components/TwoButtons';
import { useNuevoReintegroStore } from '../store/nuevoReintegroStore';
import { addDays, format } from 'date-fns';
import capitalize from '../utils/capitalize';
import { useDatosFacturaSchema } from '../hooks/useDatosFacturaSchema';

function EditDatosFacturaReintegroForm({ className, onSubmit, reintegro = {}, cancelBtnOnClick }) {
  const fechaActual = new Date().toISOString().split('T')[0];
  const { data, setData } = useNuevoReintegroStore(state => state);
  const { datosFacturaSchema } = useDatosFacturaSchema();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm({
    resolver: zodResolver(datosFacturaSchema),
    defaultValues: {
      factura: {
        fecha: data?.factura?.fecha ?? format(addDays(reintegro.factura?.fecha, 1), 'yyyy-MM-dd'),
        cuit: data?.factura?.cuit ?? reintegro.factura?.cuit,
        valorTotal: data?.factura?.valorTotal ?? reintegro.factura?.valorTotal,
        personaAFacturar: data?.factura?.personaAFacturar ?? reintegro.factura?.personaAFacturar
      },
      formaDePago: data?.formaDePago ?? capitalize(reintegro.formaDePago),
      cbu: data?.cbu ?? reintegro.cbu,
      observaciones: data?.observaciones ?? reintegro.observaciones
    }
  });
  const formaDePago = watch('formaDePago');
  const formValues = watch();

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
            setData({ ...data, ...formValues });
            cancelBtnOnClick();
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
          {isSubmitting ? 'Cargando...' : 'Confirmar'}
        </Button>
      </TwoButtons>
    </Form>
  );
}
export default EditDatosFacturaReintegroForm;
