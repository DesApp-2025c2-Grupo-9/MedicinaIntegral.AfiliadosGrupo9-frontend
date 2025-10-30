import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Button from '../../components/Button';
import InputContainer from '../../components/InputContainer';
import Select from '../../components/Select';
import { useGetAfiliado, useGetEspecialidades } from '../../services/queries';
import { useUpdateAutorizacion } from '../../services/autorizacionesQueries';
import { useAutorizacionSchema } from '../../hooks/useAutorizacionSchema';
import { format } from 'date-fns';

function EditarAutorizacion({ autorizacion, cancelBtnOnClick }) {
  const { data: especialidadesRes, error, isLoading, isError } = useGetEspecialidades();
  const { data: afiliadoRes } = useGetAfiliado();
  const listaAfiliados = afiliadoRes?.data?.grupoFamiliar.map(familiar => `${familiar.nombre} ${familiar.apellido}`);
  const { autorizacionSchema } = useAutorizacionSchema({ listaAfiliados, listaEspecialidades: especialidadesRes?.data });
  const { mutateAsync } = useUpdateAutorizacion();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(autorizacionSchema),
    defaultValues: {
      paraAfiliado: autorizacion?.paraAfiliado,
      fechaSolicitud: format(autorizacion?.fechaSolicitud, 'yyyy-MM-dd'),
      especialidad: autorizacion?.especialidad,
      practica: autorizacion?.practica,
      medicoSolicitante: autorizacion?.medicoSolicitante,
      lugarAtencion: autorizacion?.lugarAtencion,
      diasDeInternacion: autorizacion?.diasDeInternacion,
      observaciones: autorizacion?.observaciones[0]?.descripcion 
    }
  });
  {console.log("Lista de afiliados:", listaAfiliados.length > 1)}
  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const onSubmit = formData => {
    Swal.fire({
      title: 'Confirmar edición',
      html: `
        <p>¿Desea guardar los cambios en la autorización?</p>
        <br/>
        <p><b>Especialidad: </b> ${formData.especialidad}</p>
        <p><b>Practica: </b> ${formData.practica}</p>
        <p><b>Médico solicitante: </b> ${formData.medicoSolicitante}</p>
        <p><b>Lugar de atención: </b> ${formData.lugarAtencion}</p>
        <p><b>Días de internación: </b> ${formData.diasDeInternacion}</p>
      `,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar'
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await mutateAsync({ data: formData, id: autorizacion.id });

        Swal.fire({
          html: res.message,
          title: 'Autorización actualizada',
          text: 'Los cambios se han guardado correctamente.',
          icon: 'success'
        });
        cancelBtnOnClick();
      }
    });
  };

  const fechaActual = new Date().toISOString().split('T')[0];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Dropdown afiliado + fecha */}
      <InputContainer>
        {listaAfiliados.length > 1 ? <Select
          {...register('paraAfiliado')}
          id='paraAfiliado'
          label='Para afiliado:'
          placeholder='Seleccionar afiliado'
          options={listaAfiliados}
          errorMsg={errors.paraAfiliado?.message}
        /> : <Input
          {...register('paraAfiliado')}
          value={listaAfiliados[0]}
          id='paraAfiliado'
          label='Para afiliado:'
        />}
        <Input
          {...register('fechaSolicitud')}
          type='date'
          id='fechaSolicitud'
          label='Fecha prevista'
          min={fechaActual}
          errorMsg={errors.fechaSolicitud?.message}
        />
      </InputContainer>

      {/* Especialidad + Práctica */}
      <InputContainer>
        <Select
          {...register('especialidad')}
          id='especialidad'
          label='Especialidad:'
          placeholder='Seleccionar especialidad'
          options={especialidadesRes?.data}
          errorMsg={errors.especialidad?.message}
        />
        <Input
          {...register('practica')}
          label='Práctica:'
          placeholder='Ingresar la práctica'
          errorMsg={errors.practica?.message}
        />
      </InputContainer>

      {/* Médico */}
      <div className='w-[calc(50% - 16px)]'>
        <Input
          {...register('medicoSolicitante')}
          label='Médico:'
          placeholder='Ingresar el médico'
          errorMsg={errors.medicoSolicitante?.message}
        />
      </div>

      {/* Lugar de atención + Días de internación */}
      <InputContainer>
        <Input
          {...register('lugarAtencion')}
          id='lugarAtencion'
          label='Lugar de prestación:'
          placeholder='Ingresar lugar de prestación'
          errorMsg={errors.lugarAtencion?.message}
        />
        <Input
          {...register('diasDeInternacion')}
          id='diasDeInternacion'
          label='Días de internación:'
          type='number'
          min={0}
          placeholder='Seleccionar cantidad de días'
          errorMsg={errors.diasDeInternacion?.message}
        />
      </InputContainer>

      {/* Observaciones */}
      <Input
        {...register('observaciones')}
        isTextArea
        id='observaciones'
        label='Observaciones:'
        placeholder='Ingrese observaciones (si las hay)'
        errorMsg={errors.observaciones?.message}
      />

      <InputContainer>
        <Button
          className='ml-auto'
          onClick={cancelBtnOnClick}
          style='outln'
          type='button'
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          state={isSubmitting ? 'disabled' : 'active'}
          disabled={isSubmitting}
        >
          Guardar cambios
        </Button>
      </InputContainer>
    </Form>
  );
}

export default EditarAutorizacion;
