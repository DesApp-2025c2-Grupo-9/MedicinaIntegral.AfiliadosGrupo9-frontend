import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from '../../components/Button'
import InputContainer from "../../components/InputContainer";
import Select from "../../components/Select";
import { useForm } from "react-hook-form";
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

//Esquema de solicitud utilizando zod
const solicitudSchema = z.object({
  afiliado: z.string(),
  medicamento : z.string(),
  cantidad : z.coerce.number(),
  presentacion : z.string(),
  observaciones : z.string().optional()
})
function SolicitarReceta() {

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
      {/*Dropdown afiliado */}
      <Select
      {...register('paraAfiliado')}
        id='paraAfiliado'
        label='Para afiliado:'
        placeholder='Seleccionar afiliado'
        options={['Carolina Benitez', 'John Doe', 'Jane Doe']}
        errorMsg={errors.paraAfiliado?.message}
      />
      {/*Input medicamento - Input Cantidad */}
      <InputContainer>
        <Input 
        label={'Medicamento'}
        placeholder={'Ingresar Medicamento'} />
        <Input 
        label={'Cantidad'}
        placeholder = {'Ingrese cantidad'}
        />
      </InputContainer>
      {/*InputPresentación */}
      <Input label={'Presentación'}
      placeholder= {'Ingrese la presentación'}/>
      {/*Input observaciones*/}
      <Input label={'Observaciones'}/>
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