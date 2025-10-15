import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { autorizacionSchema } from "../../schema/autorizacionSchema";
import Swal from "sweetalert2";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import InputContainer from "../../components/InputContainer";
import Select from "../../components/Select";

function EditarAutorizacion({ autorizacion, cancelBtnOnClick }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(autorizacionSchema),
    defaultValues: {
      nroAfiliado: autorizacion?.nroAfiliado || "",
      fechaSolicitud: autorizacion?.fechaSolicitud || "",
      especialidad: autorizacion?.especialidad || "",
      medicoSolicitante: autorizacion?.medicoSolicitante || "",
      lugarAtencion: autorizacion?.lugarAtencion || "",
      diasDeInternacion: autorizacion?.diasDeInternacion || 0,
      observaciones: autorizacion?.observaciones ?.[0]?.descripcion || "",
    },
  });

  const onSubmit = (formData) => {
    Swal.fire({
      title: "Confirmar edición",
      html: `
        <p>¿Desea guardar los cambios en la autorización?</p>
        <br/>
        <p><b>Especialidad: </b> ${formData.especialidad}</p>
        <p><b>Médico solicitante: </b> ${formData.medicoSolicitante}</p>
        <p><b>Lugar de atención: </b> ${formData.lugarAtencion}</p>
        <p><b>Días de internación: </b> ${formData.diasDeInternacion}</p>
      `,
      icon: "question",
      confirmButtonText: "Guardar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí iría la lógica para actualizar la autorización
        Swal.fire({
          title: "Autorización actualizada",
          text: "Los cambios se han guardado correctamente.",
          icon: "success",
        });
        cancelBtnOnClick();
      }
    });
  };

  const fechaActual = new Date().toISOString().split("T")[0];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Dropdown afiliado + fecha */}
      <InputContainer>
        <Select
          {...register("nroAfiliado")}
          id="nroAfiliado"
          label="Para afiliado:"
          placeholder="Seleccionar afiliado"
          options={["Carolina Benitez", "John Doe", "Jane Doe"]}
          errorMsg={errors.nroAfiliado?.message}
        />
        <Input
          {...register("fechaSolicitud")}
          type="date"
          id="fechaSolicitud"
          label="Fecha prevista"
          min={fechaActual}
          errorMsg={errors.fechaSolicitud?.message}
        />
      </InputContainer>

      {/* Especialidad + Médico */}
      <InputContainer>
        <Select
          {...register("especialidad")}
          label="Especialidad:"
          placeholder="Seleccionar especialidad"
          options={["Oftalmología", "Traumatología", "Kinesiología"]}
          errorMsg={errors.especialidad?.message}
        />
        <Select
          {...register("medicoSolicitante")}
          label="Médico:"
          placeholder="Seleccionar médico"
          options={["Carolina Benitez", "John Doe", "Jane Doe"]}
          errorMsg={errors.medicoSolicitante?.message}
        />
      </InputContainer>

      {/* Lugar de atención + Días de internación */}
      <InputContainer>
        <Input
          {...register("lugarAtencion")}
          id="lugarAtencion"
          label="Lugar de prestación"
          placeholder="Ingresar lugar de prestación"
          errorMsg={errors.lugarAtencion?.message}
        />
        <Input
          {...register("diasDeInternacion")}
          id="diasDeInternacion"
          label="Días de internación"
          type="number"
          min={1}
          placeholder="Seleccionar cantidad de días"
          errorMsg={errors.diasDeInternacion?.message}
        />
      </InputContainer>

      {/* Observaciones */}
      <Input
        {...register("observaciones")}
        label="Observaciones"
        placeholder="Ingrese observaciones (si las hay)"
        errorMsg={errors.observaciones?.message}
      />

      <InputContainer>
        <Button onClick={cancelBtnOnClick}>Salir</Button>
        <Button
          type="submit"
          state={isSubmitting ? "disabled" : "active"}
          disabled={isSubmitting}
          className="ml-auto"
        >
          Guardar cambios
        </Button>
      </InputContainer>
    </Form>
  );
}

export default EditarAutorizacion;
