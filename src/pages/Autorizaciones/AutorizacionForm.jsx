import Form from '../../components/Form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import InputContainer from '../../components/InputContainer';
import Select from '../../components/Select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useGetAfiliado, useGetEspecialidades } from '../../services/queries';
import { useCreateAutorizacion, useUpdateAutorizacion } from '../../services/autorizacionesQueries';
import { useAutorizacionSchema } from '../../hooks/useAutorizacionSchema';
import { useAutorizacionStore } from '../../store/autorizacionStore';
import { addDays, format } from 'date-fns';
import { useLocation } from 'react-router-dom';
import soloLetrasYEspaciosConLimite from '../../utils/validacion.caracteresYLimite';
import { useUserStore } from '../../store/userStore';
import { useIdParaAfiliado } from '../../hooks/useIdParaAfiliado';

function AutorizacionForm({ className }) {
  const navigate = useNavigate();
  const autorizacion = useAutorizacionStore(state => state.autorizacion);
  const { data: especialidadesRes, isLoading: isLoadingEspecialidades } = useGetEspecialidades();
  const { data: afiliado, isLoading: isLoadingAfiliado } = useGetAfiliado();
  const user = useUserStore(state => state.user);

  const rolSesion = user?.rolSesion;
  const listaAfiliadosFiltrados = rolSesion === 'Titular' ? afiliado?.data?.grupoFamiliar?.filter(familiar => familiar.rol !== 'Cónyuge' && familiar.rol !== 'Hijo Mayor' && familiar.rol !== 'Otro') : afiliado?.data?.grupoFamiliar; // Si quien inició sesión es Titular, Cónyuge no me se muestra en el input de paraAfiliado
  const listaAfiliados = listaAfiliadosFiltrados?.map(familiar => `${familiar.nombre} ${familiar.apellido}`);

  const { autorizacionSchema } = useAutorizacionSchema({ listaAfiliados, listaEspecialidades: especialidadesRes?.data });
  const observacionAfiliado = typeof autorizacion?.observaciones === 'object' && autorizacion?.observaciones?.find(obs => obs.rolEmisor === 'Afiliado');
  const { mutateAsync: createAutorizacion } = useCreateAutorizacion();
  const { mutateAsync: updateAutorizacion } = useUpdateAutorizacion();

  
  const { idParaAfiliado } = useIdParaAfiliado()
  
  const location = useLocation();
  const pathDest = location.pathname === '/autorizaciones/editar-autorizacion';
  let sucessText;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(autorizacionSchema),
    defaultValues: {
      paraAfiliado: autorizacion?.paraAfiliado,
      fechaSolicitud: autorizacion?.fechaSolicitud && format(addDays(autorizacion?.fechaSolicitud, 1), 'yyyy-MM-dd'),
      especialidad: autorizacion?.especialidad,
      practica: autorizacion?.practica,
      medicoSolicitante: autorizacion?.medicoSolicitante,
      lugarAtencion: autorizacion?.lugarAtencion,
      diasDeInternacion: autorizacion?.diasDeInternacion || 0,
      observaciones: observacionAfiliado?.descripcion
    }
  });

  if (isLoadingAfiliado || isLoadingEspecialidades) return <div>Cargando...</div>;

  const onSubmit = async formData => {
    if (location.pathname === '/autorizaciones/solicitar-autorizacion') {
      const nroGestion = Math.floor(1000 + Math.random() * 9000);
      await createAutorizacion({...formData, idAfiliado: idParaAfiliado(formData.paraAfiliado)});
      sucessText = `La solicitud fue enviada correctamente.<br />N° de gestión: <b>${nroGestion}</b>.`;
    } else {
      await updateAutorizacion({ data: {...formData, idAfiliado: idParaAfiliado(formData.paraAfiliado)}, id: autorizacion.id });
      sucessText = 'La solicitud fue actualizada correctamente.';
    }

    Swal.fire({
      icon: 'success',
      iconColor: '#00ab01',
      html: sucessText,
      confirmButtonText: 'Continuar',
      customClass: {
        htmlContainer: 'swal-html',
        confirmButton: 'swal-confirm-button'
      }
    }).then(() => {
      navigate('/autorizaciones/ver-autorizaciones');
    });
  };
  const fechaActual = new Date().toISOString().split('T')[0];
  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className={`max-w-211.5 ${className}`}
        legend={pathDest && 'Editar autorización'}
        legendClassName='text-xl font-bold text-blue-500'
      >
        {/* Dropdown afiliado */}
        {!pathDest && afiliado?.data?.grupoFamiliar?.length > 1 && (
          <Select
            {...register('paraAfiliado')}
            id='paraAfiliado'
            label='Para afiliado:'
            placeholder='Seleccionar afiliado'
            options={listaAfiliados}
            errorMsg={errors.paraAfiliado?.message}
          />
        )}
        {/* Fecha + Especialidad */}
        <InputContainer>
          <Input
            {...register('fechaSolicitud')}
            type='date'
            id='fechaSolicitud'
            label='Fecha prevista:'
            min={fechaActual}
            errorMsg={errors.fechaSolicitud?.message}
          />
          <Select
            {...register('especialidad')}
            label='Especialidad:'
            placeholder='Seleccionar Especialidad'
            options={especialidadesRes?.data}
            errorMsg={errors.especialidad?.message}
          />
        </InputContainer>

        {/* Práctica + Médico */}
        <InputContainer>
          <Input
            {...register('practica')}
            label='Práctica:'
            placeholder='Ingresar la práctica'
            errorMsg={errors.practica?.message}
            onKeyDown={soloLetrasYEspaciosConLimite(50)}
          />
          <Input
            {...register('medicoSolicitante')}
            label='Médico:'
            placeholder='Ingresar el médico'
            errorMsg={errors.medicoSolicitante?.message}
            onKeyDown={soloLetrasYEspaciosConLimite(50)}
          />
        </InputContainer>

        {/* Lugar de prestación + Dias de internación */}
        <InputContainer>
          <Input
            {...register('lugarAtencion')}
            id='lugarAtencion'
            label='Lugar de prestación:'
            placeholder='Ingresar lugar de prestación'
            errorMsg={errors.lugarAtencion?.message}
            onKeyDown={soloLetrasYEspaciosConLimite(50)}
          />
          <Input
            {...register('diasDeInternacion')}
            id='diasDeInternacion'
            label='Días de internación:'
            placeholder='Ingresar cantidad de días'
            type='number'
            min={0}
            errorMsg={errors.diasDeInternacion?.message}
          />
        </InputContainer>

        {/*Input observaciones*/}
        <Input
          {...register('observaciones')}
          isTextArea
          id='observaciones'
          label='Observaciones:'
          placeholder='Ingrese observaciones (si las hay)'
          errorMsg={errors.observaciones?.message}
        />
        <Button
          type='submit'
          state={isSubmitting ? 'disabled' : 'active'}
          disabled={isSubmitting}
          className={'ml-auto'}
        >
          Confirmar
        </Button>
      </Form>
    </>
  );
}

export default AutorizacionForm;
