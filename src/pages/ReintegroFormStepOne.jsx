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
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import soloLetrasYEspaciosConLimite from '../utils/validacion.caracteresYLimite';

function ReintegroFormStepOne({ className }) {
  const navigate = useNavigate();
  const fechaActual = new Date().toISOString().split('T')[0];
  const { data: especialidades, isLoading: isLoadingEspecialidades } = useGetEspecialidades();
  const { data: afiliado, isLoading: isLoadingAfiliado } = useGetAfiliado();
  const user = useUserStore(state => state.user);

  const rolSesion = user?.rolSesion; // Rol de quien inició sesión
  const listaEspecialidades = especialidades?.data;
  const listaAfiliadosFiltrados = rolSesion === 'Titular' ? afiliado?.data?.grupoFamiliar?.filter(familiar => familiar.rol !== 'Cónyuge' && familiar.rol !== 'Hijo Mayor' && familiar.rol !== 'Otro') : afiliado?.data?.grupoFamiliar; // Si quien inició sesión es Titular, Cónyuge no me se muestra en el input de paraAfiliado
  const listaAfiliados = listaAfiliadosFiltrados?.map(familiar => `${familiar.nombre} ${familiar.apellido}`);

  const reintegro = useReintegroStore(state => state.reintegro);
  const fechaDePrestacion = reintegro?.fechaDePrestacion ? format(addDays(reintegro?.fechaDePrestacion, 1), 'yyyy-MM-dd') : '';
  const { reintegroStepOneSchema } = useReintegroStepOneSchema({
    listaAfiliados,
    listaEspecialidades
  });
  const { onSubmit } = useReintegroStepOneHandler();

  const location = useLocation();
  const isEditPath = location.pathname === '/reintegros/editar-reintegro';

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

  if (isLoadingAfiliado || isLoadingEspecialidades) return <div>Cargando...</div>;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={`max-w-211.5 ${className}`}
      legend={isEditPath && 'Editar reintegro'}
      legendClassName='text-xl font-bold text-blue-500'
    >
      {afiliado?.data?.grupoFamiliar?.length > 1 && (
        <Select
          {...register('paraAfiliado')}
          id='paraAfiliado'
          label='Para afiliado:'
          placeholder='Seleccionar afiliado'
          options={listaAfiliados}
          errorMsg={errors.paraAfiliado?.message}
        />
      )}
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
          onKeyDown={soloLetrasYEspaciosConLimite(48)}
        />
        <Input
          {...register('lugarDeAtencion')}
          type='text'
          id='lugarDeAtencion'
          label='Lugar donde fue atendido:'
          placeholder='Ingresar lugar de prestación'
          errorMsg={errors.lugarDeAtencion?.message}
          onKeyDown={soloLetrasYEspaciosConLimite(48)}
        />
      </InputContainer>

      <TwoButtons className='lg:ml-auto'>
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
          isLoading={isSubmitting}
        >
          Siguiente
        </Button>
      </TwoButtons>
    </Form>
  );
}
export default ReintegroFormStepOne;
