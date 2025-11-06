import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from '../../components/Button'
import InputContainer from "../../components/InputContainer";
import Select from "../../components/Select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useGetAfiliado, useGetEspecialidades } from '../../services/queries';
import { useCreateAutorizacion, useUpdateAutorizacion } from '../../services/autorizacionesQueries';
import { useAutorizacionSchema } from '../../hooks/useAutorizacionSchema';
import { useAutorizacionStore } from '../../store/autorizacionStore';
import { format } from "date-fns";
import { useLocation } from "react-router-dom";

function AutorizacionForm({ className }) {
  const navigate = useNavigate()
  const autorizacion = useAutorizacionStore(state => state.autorizacion)
  const { paraAfiliado } = useAutorizacionStore(state => state)
  const { data: especialidadesRes } = useGetEspecialidades();
  const { data: afiliadoRes } = useGetAfiliado();
  const listaAfiliados = afiliadoRes?.data?.grupoFamiliar.map(familiar => `${familiar.nombre} ${familiar.apellido}`);
  const { autorizacionSchema } = useAutorizacionSchema({ listaAfiliados, listaEspecialidades: especialidadesRes?.data });
  const observacionAfiliado = typeof autorizacion?.observaciones === 'object' && autorizacion?.observaciones?.find(obs => obs.rolEmisor === 'Afiliado');
  const { mutateAsync: createAutorizacion } = useCreateAutorizacion();
  const { mutateAsync: updateAutorizacion } = useUpdateAutorizacion();

  const location = useLocation();
  const pathDest = location.pathname === '/autorizaciones/editar-autorizacion';
  let sucessText 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(autorizacionSchema),
    defaultValues: {
      paraAfiliado: autorizacion?.paraAfiliado,
      fechaSolicitud: autorizacion?.fechaSolicitud && format(autorizacion?.fechaSolicitud, 'yyyy-MM-dd'),
      especialidad: autorizacion?.especialidad,
      practica: autorizacion?.practica,
      medicoSolicitante: autorizacion?.medicoSolicitante,
      lugarAtencion: autorizacion?.lugarAtencion,
      diasDeInternacion: autorizacion?.diasDeInternacion || 0,
      observaciones: observacionAfiliado?.descripcion 
    }
  })


  const onSubmit = async(formData) => {

    



    if (location.pathname === '/autorizaciones/solicitar-autorizacion') {
        await createAutorizacion(formData);
        sucessText = 'Su solicitud se envió correctamente, puede verla en "Ver Autorizaciones"'
    } else {
        await updateAutorizacion({ data: formData, id: autorizacion.id });
        sucessText = 'Los cambios se han guardado correctamente'
    }

    Swal.fire({
            html: sucessText,
            icon: 'success',
            iconColor: '#00ab01',
            confirmButtonText: 'Continuar',
            draggable: true,
            customClass: {  
              htmlContainer: 'modal-tramites-html',
              confirmButton: 'modal-tramites-confirm-button'
            }
          }).then(() => {
            navigate('/autorizaciones/ver-autorizaciones')
          })
  }
  const fechaActual = new Date().toISOString().split('T')[0]
    return (
    <>
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={`max-w-211.5 ${className}`}
      > 
       {/* Title Editar Autorización */}
       {pathDest && <div className="flex items-center gap-1 w-fit text-blue-400 h-fit">
                <h2 className="text-xl font-bold text-right">Editar autorización</h2>
                </div>}

        {/* Dropdown afiliado */}
        {(!pathDest && listaAfiliados?.length > 1) &&
        <Select
          {...register('paraAfiliado')}
          id='paraAfiliado'
          label='Para afiliado:'
          placeholder='Seleccionar afiliado'
          options={listaAfiliados}
          errorMsg={errors.paraAfiliado?.message}
        />}
        {/* Fecha + Especialidad */}
        <InputContainer>
        <Input 
          {...register('fechaSolicitud')}
          type='date'
          id='fechaSolicitud'
          label= 'Fecha prevista:'
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
        {...register("practica")}
        label="Práctica:"
        placeholder="Ingresar la práctica"
        errorMsg={errors.practica?.message}
          />  
        <Input 
          {...register("medicoSolicitante")}
          label="Médico:"
          placeholder="Ingresar el médico"
          errorMsg={errors.medicoSolicitante?.message}
          /> 
        </InputContainer>
       
        {/* Lugar de prestación + Dias de internación */}
      <InputContainer>
      <Input 
        {...register('lugarAtencion')}
        id='lugarAtencion'
        label= 'Lugar de prestación:'
        placeholder='Ingresar lugar de prestación'
        errorMsg={errors.lugarAtencion?.message}
      />
      <Input
        {...register('diasDeInternacion')}
        id='diasDeInternacion'
        label= 'Días de internación:'
        placeholder= 'Ingresar cantidad de días'
        type = 'number'
        min = {0}
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
        state = {isSubmitting ? 'disabled' : 'active'}
        disabled = {isSubmitting}
        className={'ml-auto'}
      >
        Confirmar
      </Button>
    </Form>
    </>
  )
}

export default AutorizacionForm;