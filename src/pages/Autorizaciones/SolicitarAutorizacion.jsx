import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from '../../components/Button'
import InputContainer from "../../components/InputContainer";
import Select from "../../components/Select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import { useUserStore } from '../../store/userStore';
import { useGetAfiliado, useGetEspecialidades } from '../../services/queries';
import { useCreateAutorizacion } from '../../services/autorizacionesQueries';
import { useAutorizacionSchema } from '../../hooks/useAutorizacionSchema';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function SolicitarAutorizacion() {
  const { data: especialidadesRes } = useGetEspecialidades();
  const { data: afiliadoRes } = useGetAfiliado();
  const listaAfiliados = afiliadoRes?.data?.grupoFamiliar.map(familiar => `${familiar.nombre} ${familiar.apellido}`);
  const { autorizacionSchema } = useAutorizacionSchema({ listaAfiliados, listaEspecialidades: especialidadesRes?.data });
  const axiosPrivate = useAxiosPrivate();
  const { mutateAsync } = useCreateAutorizacion(axiosPrivate);

  //Se inicia el form con el resolver de zod
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(autorizacionSchema)
  })
  const navigate = useNavigate()
  
  const onSubmit = async(formData) => {
    console.log(formData.paraidAfiliado)
    await mutateAsync(formData);
    Swal.fire({
            title: 'Solicitud enviada',
            text: 'Su solicitud se envió correctamente, puede verla en "Ver Autorizaciones"',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            draggable: true,
            width: '400px',
            customClass: {
              popup: 'swal-popup-small',
              title: 'swal-title-small',
              confirmButton: 'swal-button-small'
            }
          }).then(() => {
            navigate('/autorizaciones/ver-autorizaciones')
          })
  }
  const fechaActual = new Date().toISOString().split('T')[0]
    return (

    <Form
      onSubmit={handleSubmit(onSubmit)}
    >
      {/*Dropdown afiliado - Modificar para que aparezca el nro de afiliado tambien // Fecha prevista*/}
      <InputContainer>
        <Select
        {...register('paraAfiliado')}
        id='paraAfiliado'
        label='Para afiliado:'
        placeholder='Seleccionar afiliado'
        options={listaAfiliados}
        errorMsg={errors.paraAfiliado?.message}
        />
        <Input 
          {...register('fechaSolicitud')}
          type='date'
          id='fechaSolicitud'
          label= 'Fecha prevista'
          min={fechaActual}
          errorMsg={errors.fechaSolicitud?.message}
        />
      </InputContainer>

      {/*Desplegable especialidad - Desolegable médico */}
      <InputContainer>
        <Select 
        {...register('especialidad')}
        label='Especialidad:'
        placeholder='Seleccionar Especialidad'
        options={especialidadesRes?.data}/*Modificar esto */
        errorMsg={errors.especialidad?.message}
        />
        <Input 
        {...register("practica")}
        label="Práctica:"
        placeholder="Ingresar la práctica"
        errorMsg={errors.practica?.message}
        />  
      </InputContainer>
      <InputContainer>
        <Input 
        {...register("medicoSolicitante")}
        label="Médico:"
        placeholder="Ingresar el médico"
        errorMsg={errors.medicoSolicitante?.message}
        />  
      </InputContainer>
       
      {/*Input Lugar de prestación - Input dias de internación */}
      <InputContainer>
      <Input 
        {...register('lugarAtencion')}
        id='lugarAtencion'
        label= 'Lugar de prestación'
        placeholder='Ingresar lugar de prestación'
        errorMsg={errors.lugarAtencion?.message}
      />
      <Input
        {...register('diasDeInternacion')}
        id='diasDeInternacion'
        label= 'Días de internación'
        placeholder= 'Seleccionar cantidad de días'
        type = 'number'
        min = {1}
        errorMsg={errors.diasDeInternacion?.message}
      />
      </InputContainer>
      {/*Input observaciones*/}
      <Input 
      {...register('observaciones')}
      label={'Observaciones'}
      errorMsg={errors.observaciones?.message}
      />
      <Button
        type='submit'
        state = {isSubmitting ? 'disabled' : 'active'}
        disabled = {isSubmitting}
        className={'ml-auto'}
      >
        Confirmar
      </Button>
    </Form>
  )
}

export default SolicitarAutorizacion