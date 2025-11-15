import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import InputContainer from "../../components/InputContainer";
import {
  useGetRecetaById,
  useUpdateReceta,
} from "../../services/recetasQueries";
import { useNewRecetaSchema } from "../../hooks/useNewRecetaSchema";
import { useEditRecetaSchema } from "../../hooks/useEditRecetaSchema";
import { useGetAfiliado } from "../../services/queries";
import { useNavigate, useParams } from "react-router-dom";
import  soloLetrasYEspaciosConLimite  from '../../utils/validacion.caracteresYLimite';

function EditarReceta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: recetasResponse, isLoading, error } = useGetRecetaById(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: afiliadoRes } = useGetAfiliado();
  const listaAfiliados = afiliadoRes?.data?.grupoFamiliar.map(
    (familiar) => `${familiar.nombre} ${familiar.apellido}`
  );
  const recetaActual = recetasResponse?.data;

  const { recetaSchema } = useEditRecetaSchema();
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
  const volverPantallaRecetas = () => navigate("/recetas/ver-recetas");
  const onSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      await mutateAsync({
        id: recetaActual.id,
        data: formData,
      });
      await Swal.fire({
        icon: "success",
        iconColor: "#00ab01",
        text: "La solicitud fue actualizada correctamente.",
        confirmButtonText: "Continuar",
        customClass: {
          htmlContainer: "swal-html",
          confirmButton: "swal-confirm-button",
        },
      });
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

  return (
    <Form className="max-w-211.5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-1 w-fit text-blue-400 h-fit">
        <h2 className="text-xl font-bold text-right">Editar receta</h2>
      </div>
      <InputContainer>
        <Input
          {...register("medicamento")}
          label="Medicamento:"
          onKeyDown= {soloLetrasYEspaciosConLimite(50)}
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
        onKeyDown= {soloLetrasYEspaciosConLimite(50)}
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
