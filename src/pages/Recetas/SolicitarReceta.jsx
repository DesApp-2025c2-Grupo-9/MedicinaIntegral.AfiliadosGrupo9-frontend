import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import InputContainer from "../../components/InputContainer";
import Select from "../../components/Select";
import { useForm } from "react-hook-form";
import { recetaSchema } from "../../schema/recetaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { result } from "lodash";
import { formToJSON } from "axios";
import { useCreateReceta } from "../../services/recetasQueries";
import { useGetAfiliado } from "../../services/queries";

function SolicitarReceta() {
  const { data: afiliadosData, isLoading: loadingAfiliados } = useGetAfiliado();

  console.log("Afiliados raw del backend:", afiliadosData);
  const afiliados = Array.isArray(afiliadosData?.data)
    ? afiliadosData.data
    : [];

  const createRecetaMutation = useCreateReceta();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(recetaSchema),
    defaultValues: {
      nroAfiliado: "",
      medicamento: "",
      cantidad: 1,
      presentacion: "",
      observaciones: "",
    },
  });

  const onSubmit = (formData) => {
    const selectedAfiliado = afiliados.find(
      (a) => a._id === formData.nroAfiliado
    );

    if (!selectedAfiliado) {
      Swal.fire({
        title: "Error",
        text: "Seleccione un afiliado válido",
        icon: "error",
      });
      return;
    }

    const body = {
      nroAfiliado: formData.nroAfiliado, // ID real
      paraAfiliado: `${selectedAfiliado.nombre} ${selectedAfiliado.apellido}`, // nombre completo
      medicamento: formData.medicamento,
      cantidad: formData.cantidad,
      presentacion: formData.presentacion,
      observaciones: [
        {
          emisor: "ID_EMISOR", // reemplazar con el ID del usuario logueado si hace falta
          descripcion: formData.observaciones,
          fecha: new Date(),
        },
      ],
      estado: "pendiente",
      activo: true,
    };

    Swal.fire({
      title: "Confirmación de solicitud",
      html: `
        <p>Está a punto de solicitar una receta con los siguientes datos:</p>
        <br/>
        <p>Medicamento: ${formData.medicamento}</p>
        <p>Presentación: ${formData.presentacion}</p>
        <p>Cantidad: ${formData.cantidad}</p>
      `,
      icon: "question",
      confirmButtonText: "Aceptar",
      showCancelButton: true,
      width: "400px",
    }).then((result) => {
      if (result.isConfirmed) {
        createRecetaMutation.mutate(body, {
          onSuccess: () => {
            Swal.fire({
              title: "Enviado",
              text: 'Su receta se ha enviado correctamente, puede encontrarla en "Ver Recetas"',
              icon: "success",
            });
            navigate("/recetas/ver-recetas");
          },
          onError: (error) => {
            console.error(
              "Error al crear receta:",
              error.response?.data || error
            );
            Swal.fire({
              title: "Error",
              text: "No se pudo enviar la receta. Intente nuevamente.",
              icon: "error",
            });
            console.error(error);
          },
        });
      }
    });
  };

  const opcionesAfiliados = afiliados.map((a) => ({
    label: `${a.nombre} ${a.apellido}`,
    value: a._id,
  }));

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {loadingAfiliados ? (
        <p>Cargando afiliados...</p>
      ) : (
        <Select
          {...register("nroAfiliado")}
          id="nroAfiliado"
          label="Para afiliado:"
          placeholder="Seleccionar afiliado"
          options={opcionesAfiliados}
          errorMsg={errors.nroAfiliado?.message}
        />
      )}

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
        maxLength={50}
        placeholder="Ingrese la presentación"
        errorMsg={errors.presentacion?.message}
      />

      <Input
        {...register("observaciones")}
        label="Observaciones"
        maxLength={100}
        errorMsg={errors.observaciones?.message}
      />

      <Button
        type="submit"
        state={isSubmitting ? "disabled" : "active"}
        disabled={isSubmitting}
        className="ml-auto"
      >
        Confirmar
      </Button>
    </Form>
  );
}

export default SolicitarReceta;
