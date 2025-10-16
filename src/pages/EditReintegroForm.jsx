import { useForm } from 'react-hook-form';
import Form from '../components/Form';
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
import { useUserStore } from '../store/userStore';
import { useReintegroSchema } from '../hooks/useReintegroSchema';

function EditReintegroForm({ className, reintegro = {}, cancelBtnOnClick }) {
  const { data: especialidadesRes, error, isLoading, isError } = useGetEspecialidades();
  const { onSubmit } = useEditReintegroHandler();
  const fechaActual = new Date().toISOString().split('T')[0];
  const { user } = useUserStore(state => state);
  const listaAfiliados = user.grupoFamiliar?.map(familiar => `${familiar.nombre} ${familiar.apellido}`);
  const { data, setData } = useNuevoReintegroStore(state => state);
  const { reintegroSchema } = useReintegroSchema({ listaAfiliados, listaEspecialidades: especialidadesRes?.data });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(reintegroSchema),
    defaultValues: {
      paraAfiliado: data?.paraAfiliado ?? reintegro.paraAfiliado,
      fechaDePrestacion: data?.fechaDePrestacion ?? format(addDays(reintegro.fechaDePrestacion, 1), 'yyyy-MM-dd'),
      especialidad: data?.especialidad ?? reintegro.especialidad,
      medico: data?.medico ?? reintegro.medico,
      lugarDeAtencion: data?.lugarDeAtencion ?? reintegro.lugarDeAtencion
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
