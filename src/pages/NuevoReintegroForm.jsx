import { useForm } from 'react-hook-form';
import Form from '../components/Form'
import { reintegroSchema } from '../schema/reintegroSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from '../components/Select';
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNuevoReintegroStore } from '../stores/nuevoReintegroStore';
import { useNavigate } from 'react-router-dom';

const nuevoReintegroSchema = reintegroSchema.pick({
  paraAfiliado: true,
  fechaPrestacion: true,
  especialidad: true,
  medico: true,
  lugarPrestacion: true
});

function NuevoReintegroForm() {
  const navigate = useNavigate();
  const { data, setData } = useNuevoReintegroStore((state) => state);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(nuevoReintegroSchema),
    defaultValues: {
      paraAfiliado: data?.paraAfiliado,
      fechaPrestacion: data?.fechaPrestacion,
      especialidad: data?.especialidad,
      medico: data?.medico,
      lugarPrestacion: data?.lugarPrestacion,
    }
  });

  const onSubmit = async (inputData) => {
    await new Promise(res => setTimeout(res, 1000));
    console.log('Soy inputData:', inputData);
    setData(inputData);
    navigate('/reintegros/datos-factura');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='mb-5 max-w-211.5'>
      <Select {...register('paraAfiliado')} id='paraAfiliado' label='Para afiliado:' placeholder='Seleccionar afiliado' options={['Carolina Benitez', 'John Doe', 'Jane Doe']} errorMsg={errors.paraAfiliado?.message} />

      <InputContainer>
        <Input {...register('fechaPrestacion')} type='date' id='fechaPrestacion' label='Fecha de la prestación:' errorMsg={errors.fechaPrestacion?.message} />
        <Select {...register('especialidad')} id='especialidad' label='Especialidad:' placeholder='Seleccionar especialidad' options={['Lorem', 'Ipsum', 'Dolor', 'Sit']} errorMsg={errors.especialidad?.message} />
      </InputContainer>

      <InputContainer>
        <Input {...register('medico')} type='text' id='medico' label='Médico:' placeholder='Ingresar nombre del médico' errorMsg={errors.medico?.message} />
        <Input {...register('lugarPrestacion')} type='text' id='lugarPrestacion' label='Lugar donde fue atendido:' placeholder='Ingresar lugar de prestación' errorMsg={errors.lugarPrestacion?.message} />
      </InputContainer>

      <Button
        type='submit'
        state={ isSubmitting ? 'disabled' : 'active' }
        disabled={isSubmitting}
        className='ml-auto'
      >
        { isSubmitting ? 'Cargando...' : 'Siguiente' }
      </Button>
    </Form>
  )
}
export default NuevoReintegroForm