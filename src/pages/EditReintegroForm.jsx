import { useForm } from 'react-hook-form';
import Form from '../components/Form';
import { reintegroSchema } from '../schema/reintegroSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from '../components/Select';
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNuevoReintegroStore } from '../store/nuevoReintegroStore';
import TwoButtons from '../components/TwoButtons';
import { addDays, format } from 'date-fns';
import { useEditReintegroHandler } from '../hooks/useEditReintegroHandler';
import { useGetEspecialidades } from '../services/queries';

const nuevoReintegroSchema = reintegroSchema.pick({
  paraAfiliado: true,
  fechaDePrestacion: true,
  especialidad: true,
  medico: true,
  lugarDeAtencion: true
});

function EditReintegroForm({ className, reintegro = {}, cancelBtnOnClick }) {
  const { data: especialidadesRes, error, isLoading } = useGetEspecialidades();
  const fechaActual = new Date().toISOString().split('T')[0];
  const { data, setData } = useNuevoReintegroStore(state => state);
  const { onSubmit } = useEditReintegroHandler();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(nuevoReintegroSchema),
    defaultValues: {
      paraAfiliado: data?.paraAfiliado ?? reintegro.paraAfiliado,
      fechaDePrestacion: data?.fechaDePrestacion ?? format(addDays(reintegro.fechaDePrestacion, 1), 'yyyy-MM-dd'),
      especialidad: data?.especialidad ?? reintegro.especialidad,
      medico: data?.medico ?? reintegro.medico,
      lugarDeAtencion: data?.lugarDeAtencion ?? reintegro.lugarDeAtencion
    }
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

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

      <TwoButtons className='ml-auto'>
        <Button
          type='button'
          style='outln'
          onClick={() => {
            setData({});
            cancelBtnOnClick();
          }}
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          state={isSubmitting ? 'disabled' : 'active'}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Cargando...' : 'Siguiente'}
        </Button>
      </TwoButtons>
    </Form>
  );
}
export default EditReintegroForm;
