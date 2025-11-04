import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import InputContainer from "../../components/InputContainer";
import Select from "../../components/Select";
import { useUpdateReceta } from "../../services/recetasQueries";
import { useNewRecetaSchema } from "../../hooks/useNewRecetaSchema";
import { useGetAfiliado } from "../../services/queries";

function EditarReceta({ receta, cancelBtnOnClick }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: afiliadoRes } = useGetAfiliado();
  const listaAfiliados = afiliadoRes?.data?.grupoFamiliar.map(
    (familiar) => `${familiar.nombre} ${familiar.apellido}`
  );

  const { recetaSchema } = useNewRecetaSchema({ listaAfiliados });
  const { mutateAsync } = useUpdateReceta();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(recetaSchema),
    defaultValues: {
      paraAfiliado: receta?.paraAfiliado,
      medicamento: receta?.medicamento,
      cantidad: receta?.cantidad,
      presentacion: receta?.presentacion,
      observaciones: receta?.observaciones?.[0]?.descripcion || "",
    },
  });

  //Resetear formulario cuando llegue la receta completa
  /*useEffect(() => {
    if (receta) {
      reset({
        paraAfiliado: receta.paraAfiliado || "",
        medicamento: receta.medicamento || "",
        cantidad: receta.cantidad || 1,
        presentacion: receta.presentacion || "",
        observaciones: receta.observaciones?.[0]?.descripcion || "",
      });
    }
  }, [receta, reset]);
*/
  const onSubmit = async (formData) => {
    const result = await Swal.fire({
      title: "Confirmar edición",
      html: `
        <p>¿Desea guardar los cambios en la receta?</p>
        <p><b>Medicamento: </b> ${formData.medicamento}</p>
        <p><b>Presentación: </b> ${formData.presentacion}</p>
        <p><b>Cantidad: </b> ${formData.cantidad}</p>
      `,
      icon: "question",
      confirmButtonText: "Guardar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      setIsSubmitting(true);
      await mutateAsync({ id: receta.id, data: formData });
      Swal.fire({ title: "Receta actualizada", icon: "success" });
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
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Select
        {...register("paraAfiliado")}
        id="paraAfiliado"
        label="Para afiliado:"
        placeholder="Seleccionar afiliado"
        options={listaAfiliados}
        errorMsg={errors.nroAfiliado?.message}
      />

      <InputContainer>
        <Input
          {...register("medicamento")}
          label="Medicamento:"
          errorMsg={errors.medicamento?.message}
        />
        <Input
          {...register("cantidad", { valueAsNumber: true })}
          type="number"
          min={1}
          label="Cantidad:"
          errorMsg={errors.cantidad?.message}
        />
      </InputContainer>

      <Input
        {...register("presentacion")}
        label="Presentación:"
        errorMsg={errors.presentacion?.message}
      />

      <Input
        {...register("observaciones")}
        label="Observaciones:"
        maxLength={100}
        errorMsg={errors.observaciones?.message}
      />

      <InputContainer>
        <Button
          type="button"
          className="ml-auto"
          style="outln"
          onClick={cancelBtnOnClick}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          state={isSubmitting ? "disabled" : "active"}
          disabled={isSubmitting}
        >
          Confirmar
        </Button>
      </InputContainer>
    </Form>
  );
}

export default EditarReceta;
