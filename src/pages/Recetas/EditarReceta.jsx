import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { recetaSchema } from "../../schema/recetaSchema";
import Swal from "sweetalert2";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import InputContainer from "../../components/InputContainer";
import Select from "../../components/Select";
import { useState } from "react";
import useEditReceta from "../../hooks/useEditReceta";

function EditarReceta({ receta, cancelBtnOnClick }) {
  const navigate = useNavigate();
  const { editReceta } = useEditReceta();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recetaSchema),
    defaultValues: {
      nroAfiliado: receta?.nroAfiliado || "",
      medicamento: receta?.medicamento || "",
      cantidad: receta?.cantidad || 0,
      presentacion: receta?.presentacion || "",
      observaciones: receta?.observaciones?.[0]?.descripcion || "",
    },
  });

  const onSubmit = async (formData) => {
    Swal.fire({
      title: "Confirmar edición",
      html: `
        <p>¿Desea guardar los cambios en la receta?</p>
        <br />
        <p><b>Medicamento: </b> ${formData.medicamento}</p>
        <p><b>Presentación: </b> ${formData.presentacion}</p>
        <p><b>Cantidad: </b> ${formData.cantidad}</p>
      `,
      icon: "question",
      confirmButtonText: "Guardar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsSubmitting(true);
          await editReceta(receta.id, formData);

          Swal.fire({
            title: "Receta actualizada",
            text: "Los cambios en la receta se guardaron correctamente.",
            icon: "success",
          });

          cancelBtnOnClick();
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudo actualizar la receta.",
            icon: "error",
          });
        } finally {
          setIsSubmitting(false);
        }
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Select
        {...register("nroAfiliado")}
        id="nroAfiliado"
        label="Para afiliado:"
        placeholder="Seleccionar afiliado"
        options={["Carolina Benitez", "John Doe", "Jane Doe"]}
        errorMsg={errors.nroAfiliado?.message}
      />

      <InputContainer>
        <Input
          {...register("medicamento")}
          label="Medicamento"
          placeholder="Ingresar medicamento"
          maxLength={50}
          errorMsg={errors.medicamento?.message}
        />

        <Input
          {...register("cantidad", { valueAsNumber: true })}
          type="number"
          min={1}
          max={10}
          label="Cantidad"
          placeholder="Ingrese cantidad"
          errorMsg={errors.cantidad?.message}
        />
      </InputContainer>

      <Input
        {...register("presentacion")}
        label="Presentación"
        placeholder="Ingrese la presentación"
        maxLength={50}
        errorMsg={errors.presentacion?.message}
      />

      <Input
        {...register("observaciones")}
        label="Observaciones"
        placeholder="Ingrese observaciones (si las hay)"
        maxLength={100}
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

export default EditarReceta;
