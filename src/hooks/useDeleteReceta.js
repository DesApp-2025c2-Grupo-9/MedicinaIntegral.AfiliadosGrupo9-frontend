import Swal from "sweetalert2";
import { useDeleteReceta } from "../services/recetasQueries";
import "../styles/recetas.css";

export const useDelReceta = () => {
  const { mutateAsync } = useDeleteReceta();

  const deleteRecetaHandler = async (receta) => {
    const result = await Swal.fire({
      html: `
        <p>Está a punto de eliminar la receta:</p>
        <p><b>Medicamento:</b> ${receta.medicamento}</p>
        <p><b>Cantidad:</b> ${receta.cantidad}</p>
        <p><b>Presentación:</b> ${receta.presentacion}</p>
        <br>
        <p>¿Desea continuar?</p>
      `,
      icon: "warning",
      iconColor: "#00ab01",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      customClass: {
        popup: "swal-popup-custom",
        confirmButton: "modal-tramites-confirm-button",
        cancelButton: "modal-tramites-cancel-button",
        htmlContainer: "modal-tramites-html",
      },
    });
    if (result.isConfirmed) {
      try {
        const res = await mutateAsync(receta.id);
        Swal.fire({
          html: res.message || "Receta eliminada exitosamente",
          title: "Eliminada!",
          icon: "success",
          confirmButtonText: "Aceptar",
          customClass: {
            confirmButton: "modal-tramites-confirm-button",
            htmlContainer: "modal-tramites-html",
          },
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
  };

  return { deleteRecetaHandler };
};
