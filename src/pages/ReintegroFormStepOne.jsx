import { useReintegroStepOneHandler } from '../hooks/useReintegroStepOneHandler';
import { useGetAfiliado, useGetEspecialidades } from '../services/queries';
import { useReintegroStore } from '../store/reintegroStore';
import { useReintegroStepOneSchema } from '../hooks/useReintegroStepOneSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Form from '../components/Form';
import Select from '../components/Select';
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import Button from '../components/Button';
import { addDays, format } from 'date-fns';
import TwoButtons from '../components/TwoButtons';
import { useNavigate } from 'react-router-dom';

function ReintegroFormStepOne({ className }) {
  const navigate = useNavigate();
  const fechaActual = new Date().toISOString().split('T')[0];
  const { data: especialidades } = useGetEspecialidades();
  const { data: afiliados } = useGetAfiliado();
  const listaEspecialidades = especialidades?.data;
  const listaAfiliados = afiliados?.data?.grupoFamiliar.map(familiar => `${familiar.nombre} ${familiar.apellido}`);

  const reintegro = useReintegroStore(state => state.reintegro);
  const fechaDePrestacion = reintegro?.fechaDePrestacion ? format(addDays(reintegro?.fechaDePrestacion, 1), 'yyyy-MM-dd') : '';
  const { reintegroStepOneSchema } = useReintegroStepOneSchema({ listaAfiliados, listaEspecialidades });
  const { onSubmit } = useReintegroStepOneHandler();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(reintegroStepOneSchema),
    defaultValues: {
      paraAfiliado: reintegro?.paraAfiliado,
      fechaDePrestacion: fechaDePrestacion,
      especialidad: reintegro?.especialidad,
      medico: reintegro?.medico,
      lugarDeAtencion: reintegro?.lugarDeAtencion
    }
  });

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={`max-w-211.5 ${className}`}
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
          options={listaEspecialidades}
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
          onClick={() => navigate('/reintegros/historial-reintegros')}
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
export default ReintegroFormStepOne;
