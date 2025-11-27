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
import { useGetMiCuenta } from '../services/miCuentaQueries';
import { useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import soloLetrasYEspaciosConLimite from '../utils/validacion.caracteresYLimite';

function ReintegroFormStepTwo({ className }) {
  const fechaActual = new Date().toISOString().split('T')[0];

  const reintegro = useReintegroStore(state => state.reintegro);
  const setReintegro = useReintegroStore(state => state.setReintegro);
  const formaDePago = reintegro?.formaDePago && capitalize(reintegro.formaDePago);
  const fechaFactura = reintegro?.factura?.fecha && format(addDays(reintegro?.factura?.fecha, 1), 'yyyy-MM-dd');
  const observacionAfiliado = typeof reintegro?.observaciones === 'object' && reintegro?.observaciones?.find(obs => obs.rolEmisor === 'Afiliado');
  const { reintegroStepTwoSchema } = useReintegroStepTwoSchema();
  const { onSubmit } = useReintegroStepTwoHandler();
  const listaFormasDePago = ['Cheque', 'Efectivo', 'Transferencia'];

  const { data, isLoading } = useGetMiCuenta();

  const listaCBUs = data?.data?.cbus;
  const CBUPrincipal = data?.data?.cbuPrincipal;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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

  console.log(reintegro);

  const navigate = useNavigate();
  const formaDePagoInput = watch('formaDePago');
  const cuit = watch('factura.cuit');
  const cbuValue = watch('cbu');
  const formValues = watch();

  const handleChangeOnCuit = e => {
    let value = e.target.value.replace(/\D/g, ''); // Elimina todo caracter que no sea un número
    value = value.slice(0, 11);
    let formatted = value;
    if (value.length > 2 && value.length <= 10) {
      formatted = `${value.slice(0, 2)}-${value.slice(2)}`;
    } else if (value.length > 10) {
      formatted = `${value.slice(0, 2)}-${value.slice(2, 10)}-${value.slice(10)}`;
    }
    setValue('factura.cuit', formatted);
  };

  const handleChangeOnCBU = e => {
    let value = e.target.value.replace(/\D/g, ''); // Elimina todo caracter que no sea un número
    if (value.length > 8) {
      value = value.slice(0, 8) + '-' + value.slice(8, 22);
    }
    value = value.slice(0, 23);
    setValue('cbu', value);
  };

  useEffect(() => {
    if (!reintegro?.cbu) {
      setValue('cbu', CBUPrincipal || '');
    }
  }, [reintegro?.cbu, setValue, CBUPrincipal]);

  useFormRedirect();

  if (isLoading) return <div>Cargando...</div>;

  return (
    <Form
      legend='Datos de la factura'
      onSubmit={handleSubmit(onSubmit)}
      className={`max-w-211.5 ${className}`}
      legendClassName='text-xl font-bold text-blue-500'
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
          id='factura.cuit'
          type='text'
          label='CUIT:'
          placeholder='Ingresar CUIT'
          maxLength='13'
          value={cuit || ''}
          errorMsg={errors.factura?.cuit?.message}
          onChange={handleChangeOnCuit}
        />
      </InputContainer>

      <InputContainer>
        <NumericFormat
          customInput={Input}
          {...register('factura.valorTotal')}
          id='factura.valorTotal'
          label='Valor total en pesos (ARS):'
          placeholder='Ingresar valor total'
          allowNegative={false}
          prefix='$ '
          thousandSeparator='.'
          decimalSeparator=','
          decimalScale={2}
          fixedDecimalScale
          errorMsg={errors.factura?.valorTotal?.message}
          value={reintegro?.factura?.valorTotal}
          onValueChange={({ value }) => {
            setValue('factura.valorTotal', value);
          }}
        />
        <Input
          {...register('factura.personaAFacturar')}
          type='text'
          id='factura.personaAFacturar'
          label='Persona a la que se factura:'
          placeholder='Ingresar nombre completo'
          errorMsg={errors.factura?.personaAFacturar?.message}
          onKeyDown={soloLetrasYEspaciosConLimite(48)}
        />
      </InputContainer>

      <InputContainer>
        <Select
          {...register('formaDePago')}
          id='formaDePago'
          label='Forma de pago del reintegro:'
          placeholder='Seleccionar forma de pago'
          options={listaFormasDePago}
          errorMsg={errors.formaDePago?.message}
        />
        {formaDePagoInput === 'Transferencia' ? (
          <>
            <Input
              {...register('cbu')}
              id='cbu'
              type='text'
              label='CBU:'
              placeholder='Ingresar CBU'
              maxLength='23'
              value={cbuValue || ''}
              errorMsg={errors.cbu?.message}
              onChange={handleChangeOnCBU}
              list={'listaCBU'}
            />
            <datalist id='listaCBU'>
              {listaCBUs.map(entry => (
                <option
                  key={entry.cbu}
                  value={entry.cbu}
                >
                  {`${entry.nombre} ${entry.apellido}: ${entry.cbu}`}
                </option>
              ))}
            </datalist>
          </>
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
      <TwoButtons className='lg:ml-auto'>
        <Button
          type='button'
          style='outln'
          onClick={() => {
            setReintegro({ ...reintegro, ...formValues });
            navigate(-1);
          }}
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
