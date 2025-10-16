import { useForm } from 'react-hook-form';
import Form from '../components/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from '../components/Select';
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNuevoReintegroStore } from '../store/nuevoReintegroStore';
import { useGetEspecialidades } from '../services/queries';
import { useNewReintegroHandler } from '../hooks/useNewReintegroHandler';
import { useUserStore } from '../store/userStore';
import { useReintegroSchema } from '../hooks/useReintegroSchema';

function NuevoReintegroForm({ className }) {
  const { data: especialidadesRes, error, isLoading, isError } = useGetEspecialidades();
  const { onSubmit } = useNewReintegroHandler();
  const fechaActual = new Date().toISOString().split('T')[0];
  const { user } = useUserStore(state => state);
  const listaAfiliados = user.grupoFamiliar?.map(familiar => `${familiar.nombre} ${familiar.apellido}`);
  const data = useNuevoReintegroStore(state => state.data);
  const { reintegroSchema } = useReintegroSchema({ listaAfiliados, listaEspecialidades: especialidadesRes?.data });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(reintegroSchema),
    defaultValues: {
      paraAfiliado: data?.paraAfiliado,
      fechaDePrestacion: data?.fechaDePrestacion,
      especialidad: data?.especialidad,
      medico: data?.medico,
      lugarDeAtencion: data?.lugarDeAtencion
    }
  });

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={`mb-5 max-w-211.5 ${className}`}
    >
      <Select
        {...register('paraAfiliado')}
        id='paraAfiliado'
        label='Para afiliado:'
        placeholder='Seleccionar afiliado'
        options={listaAfiliados}
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
          options={especialidadesRes?.data}
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
