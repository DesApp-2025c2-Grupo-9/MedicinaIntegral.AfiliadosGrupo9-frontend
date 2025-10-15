import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from '../../components/Button'
import InputContainer from "../../components/InputContainer";
import Select from "../../components/Select";
import { useForm } from "react-hook-form";
import  {autorizacionSchema}  from "../../schema/autorizacionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


function SolicitarAutorizacion() {
  const solicitudSchema = autorizacionSchema

  //Se inicia el form con el resolver de zod
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(solicitudSchema),
    defaultValues : {
      nroAfiliado : '',
      fechaSolicitud : '',
      especialidad :'',
      medicoSolicitante : '',
      lugarAtencion : '',
      diasDeInternacion: 0,
      observaciones : '',
    }
  })
  const navigate = useNavigate()
  
  const onSubmit = () => {
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
        {...register('nroAfiliado')}
        id='paraAfiliado'
        label='Para afiliado:'
        placeholder='Seleccionar afiliado'
        options={['Carolina Benitez', 'John Doe', 'Jane Doe']}
        errorMsg={errors.nroAfiliado?.message}
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
        options={['Oftalmología', 'Traumatología', 'Kinesiología']}/*Modificar esto */
        errorMsg={errors.especialidad?.message}
        />
        <Select 
        {...register("medicoSolicitante")}
        label='Médico:'
        placeholder = 'Seleccionar médico'
        options={['Carolina Benitez', 'John Doe', 'Jane Doe']}/*Modificar esto */
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