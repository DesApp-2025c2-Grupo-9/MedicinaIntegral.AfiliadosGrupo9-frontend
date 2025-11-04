import Swal from "sweetalert2";
import { useDeleteReceta } from "../services/recetasQueries";

export const useDelReceta = () => {
  const { mutateAsync } = useDeleteReceta();

  const deleteRecetaHandler = async (receta) => {
    Swal.fire({
      html: `
        <p>Está a punto de eliminar la receta:</p>
        <p><b>Medicamento:</b> ${receta.medicamento}</p>
        <p><b>Cantidad:</b> ${receta.cantidad}</p>
        <p><b>Presentación:</b> ${receta.presentacion}</p>
        <br>
        <p>¿Desea continuar?</p>
      `,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#00ab01",
      cancelButtonColor: "#dc143c",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mutateAsync(receta.id);
          Swal.fire({
            html: res.message || "Receta eliminada exitosamente",
            icon: "success",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#00ab01",
          });
        } catch (err) {
          console.log(err);
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar la receta.",
            icon: "error",
          });
        }
      }
    });
  };

  return { deleteRecetaHandler };
};
