import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import InputContainer from "../../components/InputContainer";
import Select from "../../components/Select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useNewRecetaSchema } from "../../hooks/useNewRecetaSchema";
import { useCreateReceta } from "../../services/recetasQueries";
import { axiosPrivate } from "../../api/axios";
import { useGetAfiliado } from "../../services/queries";
import { useUserStore } from "../../store/userStore";

function SolicitarReceta() {
  const { data: afiliadoRes } = useGetAfiliado();
  const user = useUserStore((state) => state.user);
  const rolSesion = user?.rolSesion;
  const listaAfiliadosFiltrados =
    rolSesion === "Titular"
      ? afiliadoRes?.data?.grupoFamiliar.filter(
          (familiar) => familiar.rol !== "Cónyuge"
        )
      : afiliadoRes?.data?.grupoFamiliar;
  const listaAfiliados = listaAfiliadosFiltrados.map(
    (familiar) => `${familiar.nombre} ${familiar.apellido}`
  );
  const { recetaSchema } = useNewRecetaSchema({ listaAfiliados });
  const { mutateAsync } = useCreateReceta(axiosPrivate);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(recetaSchema),
  });

  const onSubmit = async (formData) => {
    try {
      await mutateAsync(formData);

      await Swal.fire({
        icon: "success",
        iconColor: "#00ab01",
        html: `
          <p>La solicitud fue enviada correctamente.</p>
          <p>Puede verla en "Ver recetas".</p>
        `,
        confirmButtonText: "Continuar",
        customClass: {
          htmlContainer: "swal-html",
          confirmButton: "swal-confirm-button",
        },
      });
      navigate("/recetas/ver-recetas");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un problema al enviar la solicitud.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };
  const volverPantallaRecetas = () => navigate("/recetas/ver-recetas");
  return (
    <Form className="max-w-211.5" onSubmit={handleSubmit(onSubmit)}>
      <Select
        {...register("paraAfiliado")}
        id="paraAfiliado"
        label="Para afiliado:"
        placeholder="Seleccionar afiliado"
        options={listaAfiliados}
        errorMsg={errors.paraAfiliado?.message}
      />

      <InputContainer>
        <Input
          {...register("medicamento")}
          label={"Medicamento"}
          placeholder={"Ingresar Medicamento"}
          errorMsg={errors.medicamento?.message}
        />
        <Input
          {...register("cantidad", { valueAsNumber: true })}
          type="number"
          min={1}
          maxLength={2}
          label={"Cantidad"}
          placeholder={"Ingrese cantidad"}
          errorMsg={errors.cantidad?.message}
        />
      </InputContainer>

      <Input
        {...register("presentacion")}
        label={"Presentación"}
        placeholder={"Ingrese la presentación"}
        errorMsg={errors.presentacion?.message}
      />

      <Input
        {...register("observaciones")}
        label={"Observaciones"}
        errorMsg={errors.observaciones?.message}
        maxLength={100}
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

export default SolicitarReceta;
