import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from '../../components/Button'
import InputContainer from "../../components/InputContainer";
import Select from "../../components/Select";
import { useForm } from "react-hook-form";
import  {recetaSchema}  from "../../schema/recetaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


function SolicitarReceta() {
  const solicitudSchema = recetaSchema

  //Se inicia el form con el resolver de zod
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(solicitudSchema),
    defaultValues : {
      afiliado : '',
      medicamento : '',
      cantidad :0,
      presentacion : '',
      observaciones : ''
    }
  })
  const navigate = useNavigate()
  
  const onSubmit = () => {
    Swal.fire({
            title: 'Solicitud enviada',
            text: 'Su solicitud se envió correctamente, puede verla en "Ver Recetas',
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
            navigate('/recetas/ver-recetas')
          })
  }
    return (

    <Form
      onSubmit={handleSubmit(onSubmit)}
    >
      {/*Dropdown afiliado - Modificar para que aparezca el nro de afiliado tambien*/}
      <Select
      {...register('nroAfiliado')}
        id='nroAfiliado'
        label='Para afiliado:'
        placeholder='Seleccionar afiliado'
        options={['Carolina Benitez', 'John Doe', 'Jane Doe']}/*Modificar esto */
        errorMsg={errors.paraAfiliado?.message}
      />
      {/*Input medicamento - Input Cantidad */}
      <InputContainer>
        <Input 
        {...register('medicamento')}
        label={'Medicamento'}
        placeholder={'Ingresar Medicamento'}
        errorMsg={errors.medicamento?.message}
        />
        <Input 
        {...register("cantidad", {valueAsNumber: true})}
        label={'Cantidad'}
        placeholder = {'Ingrese cantidad'}
        errorMsg={errors.cantidad?.message}
        />
      </InputContainer>
      {/*InputPresentación */}
      <Input 
      {...register('presentacion')}
      label={'Presentación'}
      placeholder= {'Ingrese la presentación'}
      errorMsg={errors.presentacion?.message}
      />
      
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

export default SolicitarReceta