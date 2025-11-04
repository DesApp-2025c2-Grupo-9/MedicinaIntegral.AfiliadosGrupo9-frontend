import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import InputContainer from "../../components/InputContainer";
import Select from "../../components/Select";
import {
  useGetRecetaById,
  useUpdateReceta,
} from "../../services/recetasQueries";
import { useNewRecetaSchema } from "../../hooks/useNewRecetaSchema";
import { useGetAfiliado } from "../../services/queries";
import { useNavigate, useParams } from "react-router-dom";

function EditarReceta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: recetasResponse, isLoading, error } = useGetRecetaById(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: afiliadoRes } = useGetAfiliado();
  const listaAfiliados = afiliadoRes?.data?.grupoFamiliar.map(
    (familiar) => `${familiar.nombre} ${familiar.apellido}`
  );
  const recetaActual = recetasResponse?.data?.find(
    (receta) => receta.id === id
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
    defaultValues: {},
  });

  useEffect(() => {
    if (recetaActual) {
      reset({
        paraAfiliado: recetaActual.paraAfiliado || "",
        medicamento: recetaActual.medicamento || "",
        cantidad: recetaActual.cantidad || 1,
        presentacion: recetaActual.presentacion || "",
        observaciones: recetaActual.observaciones?.[0]?.descripcion || "",
      });
    }
  }, [recetaActual, reset]);

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
      await mutateAsync({
        id: recetaActual.id,
        data: formData,
      });
      Swal.fire({ title: "Receta actualizada", icon: "success" });
      volverPantallaRecetas();
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

  if (isLoading) return <p>Cargando...</p>;
  if (error) {
    if (error?.response?.status === 401) {
      navigate("/login", { state: { from: location }, replace: true });
      return null;
    }
    return <p>Error: {JSON.stringify(error)}</p>;
  }

  const volverPantallaRecetas = () => navigate("/recetas/ver-recetas");

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
          onClick={volverPantallaRecetas}
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
