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
import { result } from "lodash";
import { formToJSON } from "axios";


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
      nroAfiliado : '',
      medicamento : '',
      cantidad :0,
      presentacion : '',
      observaciones : ''
    }
  })
  const navigate = useNavigate()
  
  const onSubmit = (formData) => {
    Swal.fire({
            title: 'Confirmacion de solicitud',
            html: `
            <p>Está a punto de solicitar una receta con los siguientes datos:</p>
            <br/>
            <p>Medicamento: ${formData.medicamento}</p>
            <p>Presentación: ${formData.presentacion} </p>
            <p>Cantidad: ${formData.cantidad}</p>
            `,
            
            icon: 'question',
            confirmButtonText: 'Aceptar',
            showCancelButton: true,
            width: '400px'
          }).then((result) => {
            if(result.isConfirmed) {
              //Insertar tryCatch con lógica para crear la receta

              Swal.fire({
                title: 'Enviado',
                text: 'Su receta se ha enviado correctamente, puede encontrarla en "Ver Recetas"',
                icon: "success"
              })
            navigate('/recetas/ver-recetas')
            }
          })
      }
  return (
    <Form
      onSubmit={handleSubmit((onSubmit))}
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
        maxLength={50}
        errorMsg={errors.medicamento?.message}
        />
        <Input 
        {...register("cantidad", {valueAsNumber: true})}
        type= 'number'
        min = {1}
        max = {10}
        maxLength={2}
        label={'Cantidad'}
        placeholder = {'Ingrese cantidad'}
        errorMsg={errors.cantidad?.message}
        />
      </InputContainer>
      {/*InputPresentación */}
      <Input 
      {...register('presentacion')}
      label={'Presentación'}
      maxLength={50}
      placeholder= {'Ingrese la presentación'}
      errorMsg={errors.presentacion?.message}
      />
      
      {/*Input observaciones*/}
      <Input 
      {...register('observaciones')}
      label={'Observaciones'}
      errorMsg={errors.observaciones?.message}
      maxLength={100}
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