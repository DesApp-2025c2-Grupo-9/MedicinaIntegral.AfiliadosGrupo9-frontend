import { useForm } from 'react-hook-form';
import Form from '../components/Form'
import InputContainer from '../components/InputContainer'
import { reintegroSchema } from '../schema/reintegroSchema'
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import { useNuevoReintegroStore } from '../stores/nuevoReintegroStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const datosFacturaReintegroSchema = reintegroSchema.pick({
  fechaFactura: true,
  cuit: true,
  valorTotal: true,
  personaFactura: true,
  formaDeReintegro: true,
  cbu: true,
  observaciones: true
});

function DatosFacturaReintegroForm() {
  const { data, setData } = useNuevoReintegroStore((state) => state);
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
    resolver: zodResolver(datosFacturaReintegroSchema)
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!useNuevoReintegroStore.persist.hasHydrated) return;

    const primerPasoCompleto = data.paraAfiliado && data.fechaPrestacion && data.especialidad && data.medico && data.lugarPrestacion;
    if (!primerPasoCompleto && !isSubmitSuccessful) {
      navigate('/reintegros/solicitar-reintegro');
    }
  }, [data, navigate, isSubmitSuccessful]);

  const onSubmit = async (inputData) => {
    await new Promise(res => setTimeout(res, 1000));
    console.log('Soy inputData:', {
      ...data,
      ...inputData
    });
    Swal.fire({
      html: `
        La solicitud fue enviada correctamente.<br/>
        N° de gestión: 1234
      `,
      icon: 'success',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#00ab01'
    })
    .then(() => {
      setData({});
      navigate('/reintegros/historial-reintegros');
    });
  };

  return (
    <Form legend='Datos de la factura' onSubmit={handleSubmit(onSubmit)} className='max-w-211.5'>
      <InputContainer>
        <Input {...register('fechaFactura')} type='date' id='fechaFactura' label='Fecha:' errorMsg={errors.fechaFactura?.message} />
        <Input {...register('cuit')} type='text' id='cuit' label='CUIT:' placeholder='Ingresar CUIT' errorMsg={errors.cuit?.message} />
      </InputContainer>
      
      <InputContainer>
        <Input {...register('valorTotal')} type='number' id='valorTotal' label='Valor total en pesos ARS:' placeholder='Ingresar valor' errorMsg={errors.valorTotal?.message} />
        <Input {...register('personaFactura')} type='text' id='personaFactura' label='Persona a la que se factura:' placeholder='Ingresar nombre completo' errorMsg={errors.personaFactura?.message} />
      </InputContainer>

      <InputContainer>
        <Select {...register('formaDeReintegro')} id='formaDeReintegro' label='Forma de pago del reintegro:' placeholder='Seleccionar forma de pago' options={['Cheque', 'Efectivo', 'Transferencia']} errorMsg={errors.formaDeReintegro?.message} />
        <Input {...register('cbu')} type='number' id='cbu' label='CBU:' placeholder='Ingresar CBU' errorMsg={errors.cbu?.message} />
      </InputContainer>

      <Input {...register('observaciones')} isTextArea id='observaciones' label='Observaciones:' placeholder='Ingresar observaciones' errorMsg={errors.observaciones?.message} />

      <Button
        type='submit'
        state={ isSubmitting ? 'disabled' : 'active' }
        disabled={isSubmitting}
        className='ml-auto'
      >
        { isSubmitting ? 'Cargando...' : 'Confirmar solicitud' }
      </Button>
    </Form>
  )
}
export default DatosFacturaReintegroForm