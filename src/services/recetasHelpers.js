import Swal from "sweetalert2";

export const handleDeleteReceta = async (receta, mutateAsync) => {
  Swal.fire({
    title: "Eliminar receta",
    html: `
      <div style='display: flex ;justify-content-center'>
        <div style='text-align:left'>
          <p><strong>Datos de la receta:</strong><p>
          <p><strong>Receta para:</strong> ${receta.nroAfiliado}</p>
          <p><strong>Medicamento:</strong> ${receta.medicamento}</p>
          <p><strong>Cantidad:</strong> ${receta.cantidad}</p>
        </div>
      </div>
    `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#27a700ff",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await mutateAsync(receta.id);
        Swal.fire({
          html: res.message || "Receta eliminada exitosamente",
          title: "Eliminada!",
          icon: "success",
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar la receta.",
          icon: "error",
        });
      }
    }
  });
};
