import { useState } from "react";
import Swal from "sweetalert2";
import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import BotonPapelera from "./cardComponents/BotonPapelera";
import UsuarioActual from "./cardComponents/UsuarioActual";
import BotonEditar from "./cardComponents/BotonEditar";
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import MarcoCard from "./cardComponents/MarcoCard";
import TipoDeTramite from "./cardComponents/TipoDeTramite";
import BotonDescargar from "./cardComponents/BotonDescargar";
import EditarReceta from "../../../pages/Recetas/EditarReceta";
import ModalObservaciones from "../../ModalObservaciones/ModalObservaciones";
import { useDeleteReceta } from "../../../services/recetasQueries";
import {
  useCommentReceta,
  useDescargarReceta,
} from "../../../hooks/useRecetaPetitions";
import { handleDeleteReceta } from "../../../services/recetasHelpers";
import { useNavigate } from "react-router-dom";

function RecetaCard(props) {
  const dashboard = props.dashboard || false;
  const receta = props.receta;
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [isObservacionesOpen, setIsObservacionesOpen] = useState(false);
  const { onSubmit: commentReceta } = useCommentReceta();
  const { descargarReceta } = useDescargarReceta();
  const { mutateAsync } = useDeleteReceta();
  const navigate = useNavigate();

  const observacionPrestador = receta?.observaciones?.find(
    (obs) => obs.rolEmisor === "Prestador"
  );

  const fechaSolicitud = receta.createdAt
    ? new Date(receta.createdAt).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Sin fecha";

  // ===== Mostrar modal o Swal según estado =====
  const handleObservacionesClick = () => {
    const estado = receta.estado?.toLowerCase();
    if (estado === "en análisis" || estado === "observado") {
      setIsObservacionesOpen(true);
    } else {
      Swal.fire({
        title: "Sin observaciones",
        text: "Esta receta no tiene observaciones disponibles.",
        icon: "info",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <>
      {/* Modal editar */}
      {modalEditarOpen && (
        <div className="bg-negro-translucido fixed top-0 left-0 w-dvw h-dvh z-10 flex items-center justify-center">
          <EditarReceta
            className="w-full max-w-[600px]"
            receta={receta}
            cancelBtnOnClick={() => setModalEditarOpen(false)}
          />
        </div>
      )}

      {/* Modal observaciones */}
      <ModalObservaciones
        open={isObservacionesOpen}
        onClose={() => setIsObservacionesOpen(false)}
        nombreUsuario={receta.paraAfiliado}
        headerText="Volver a Recetas"
        fechaEnvio={observacionPrestador?.fecha}
        observacionesTexto={observacionPrestador?.descripcion}
        idTramite={receta.id}
        onSubmit={commentReceta}
      />

      {/* Card */}
      <MarcoCard estilo="grid-cols-2" estado={receta.estado}>
        <ColumnaPrincipal>
          Receta
          {receta.medicamento}
          {`Cantidad: ${receta.cantidad}`}
          {`Presentación: ${receta.presentacion}`}
          {`Fecha de solicitud: ${fechaSolicitud}`}
        </ColumnaPrincipal>

        <div className="grid grid-rows-4 justify-items-end">
          {dashboard ? (
            <TipoDeTramite tipo="Receta" />
          ) : (
            <>
              <UsuarioActual paciente={receta.paraAfiliado} />
              {receta.estado !== "pendiente" && (
                <div className="flex row-start-4">
                  <BotonDescargar onClick={() => descargarReceta(receta)} />
                  <BotonObservaciones onClick={handleObservacionesClick} />
                </div>
              )}
            </>
          )}

          {receta.estado === "pendiente" && !dashboard && (
            <div className="flex justify-end row-start-4">
              <BotonEditar
                onClick={() => navigate(`/recetas/editar/${receta.id}`)}
              />
              <BotonPapelera
                onClick={() => handleDeleteReceta(receta, mutateAsync)} // ✅ usa helper
              />
            </div>
          )}
        </div>
      </MarcoCard>
    </>
  );
}

export default RecetaCard;
