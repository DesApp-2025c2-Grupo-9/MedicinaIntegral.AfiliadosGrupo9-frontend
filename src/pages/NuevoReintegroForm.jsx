import { useForm } from 'react-hook-form';
import Form from '../components/Form';
import { reintegroSchema } from '../schema/reintegroSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from '../components/Select';
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNuevoReintegroStore } from '../store/nuevoReintegroStore';
import { useNavigate } from 'react-router-dom';

const nuevoReintegroSchema = reintegroSchema.pick({
  paraAfiliado: true,
  fechaDePrestacion: true,
  especialidad: true,
  medico: true,
  lugarDeAtencion: true
});

function NuevoReintegroForm() {
  const fechaActual = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();
  const { data, setData } = useNuevoReintegroStore(state => state);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(nuevoReintegroSchema),
    defaultValues: {
      paraAfiliado: data?.paraAfiliado,
      fechaDePrestacion: data?.fechaDePrestacion,
      especialidad: data?.especialidad,
      medico: data?.medico,
      lugarDeAtencion: data?.lugarDeAtencion
    }
  });

  const onSubmit = async inputData => {
    await new Promise(res => setTimeout(res, 1000));
    console.log('Soy inputData:', inputData);
    setData(inputData);
    navigate('/reintegros/datos-factura');
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className='mb-5 max-w-211.5'
    >
      <Select
        {...register('paraAfiliado')}
        id='paraAfiliado'
        label='Para afiliado:'
        placeholder='Seleccionar afiliado'
        options={['Carolina Benitez', 'John Doe', 'Jane Doe']}
        errorMsg={errors.paraAfiliado?.message}
      />

      <InputContainer>
        <Input
          {...register('fechaDePrestacion')}
          type='date'
          id='fechaDePrestacion'
          label='Fecha de la prestación:'
          max={fechaActual}
          errorMsg={errors.fechaDePrestacion?.message}
        />
        <Select
          {...register('especialidad')}
          id='especialidad'
          label='Especialidad:'
          placeholder='Seleccionar especialidad'
          options={['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Medicina General']}
          errorMsg={errors.especialidad?.message}
        />
      </InputContainer>

      <InputContainer>
        <Input
          {...register('medico')}
          type='text'
          id='medico'
          label='Médico:'
          placeholder='Ingresar nombre del médico'
          errorMsg={errors.medico?.message}
        />
        <Input
          {...register('lugarDeAtencion')}
          type='text'
          id='lugarDeAtencion'
          label='Lugar donde fue atendido:'
          placeholder='Ingresar lugar de prestación'
          errorMsg={errors.lugarDeAtencion?.message}
        />
      </InputContainer>

      <Button
        type='submit'
        state={isSubmitting ? 'disabled' : 'active'}
        disabled={isSubmitting}
        className='ml-auto'
      >
        {isSubmitting ? 'Cargando...' : 'Siguiente'}
      </Button>
    </Form>
  );
}
export default NuevoReintegroForm;
