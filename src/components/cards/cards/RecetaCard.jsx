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
import { useDelReceta } from "../../../hooks/useDeleteReceta";
import {
  useCommentReceta,
  useDescargarReceta,
} from "../../../hooks/useRecetaPetitions";
import { useUserStore } from "../../../store/userStore";
import { useNavigate } from "react-router-dom";
import "../../../styles/modalesSwal.css";

function RecetaCard(props) {
  const dashboard = props.dashboard || false;
  const receta = props.receta;
  const estado = receta.estado?.toLowerCase();
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [isObservacionesOpen, setIsObservacionesOpen] = useState(false);
  const { onSubmit: commentReceta } = useCommentReceta();
  const { descargarReceta } = useDescargarReceta();
  const navigate = useNavigate();
  const { deleteRecetaHandler } = useDelReceta();
  const user = useUserStore((state) => state.user);
  const rolSesion = user?.rolSesion;
  const showButtons = rolSesion === receta?.rolAfiliado || receta?.rolAfiliado === 'Hijo Menor';
  const showUsuarioCard = (rolSesion === 'Titular' && user.grupoFamiliar?.length > 1) || rolSesion === 'Cónyuge';

  const observacionPrestador = receta?.observaciones?.find(
    (obs) => obs.rolEmisor === "Prestador"
  );

  const ultimaObservacionPrestador = receta?.observaciones
    ?.filter((obs) => obs.rolEmisor === "Prestador")
    ?.slice(-1)[0];

  const fechaFormateada = receta?.fechaActualizacion
    ? new Date(receta.fechaActualizacion).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Sin fecha";

  const handleObservacionesClick = () => {
    if (estado === "observado") {
      setIsObservacionesOpen(true);
    } else if (receta.estado === "rechazado") {
      Swal.fire({
        title: "Motivo de rechazo:",
        text: ultimaObservacionPrestador?.descripcion?.trim()
          ? ultimaObservacionPrestador.descripcion
          : "No hay observaciones para esta receta.",
        icon: "error",
        iconColor: "#dc143c",
        confirmButtonText: "Continuar",
        customClass: {
          popup: "p-6",

          htmlContainer: "swal-html",
          confirmButton: "swal-confirm-button",
          title: "swal-title",
        },
      });
    } else {
      return;
    }
  };

  console.log(receta);

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
        observacionesTexto={
          observacionPrestador?.descripcion || "No hay observaciones"
        }
        idTramite={receta.id}
        onSubmit={commentReceta}
      />

      {/* Card */}
      <MarcoCard estilo="grid-cols-3 min-h-[121px]" estado={receta.estado} fechaSolicitud={fechaFormateada}>
        <ColumnaPrincipal>
          Receta
          {receta.medicamento}
          {`Cantidad: ${receta.cantidad}`}
          {`Presentación: ${receta.presentacion}`}
        </ColumnaPrincipal>

        <div className="grid grid-rows-4 justify-items-end">
          {dashboard ? (
            <>
              <>
                {showUsuarioCard && <UsuarioActual paciente={receta.paraAfiliado}/>}
              </>
              <div>
                <TipoDeTramite tipo={"Receta"} colorEstado={receta.estado}/>
              </div>
            </>
          ) : (
            <>
             {showUsuarioCard && <UsuarioActual paciente={receta.paraAfiliado}/>}
              {receta.estado !== "pendiente" && showButtons && (
                <div className="flex row-start-4">
                  {receta.estado === "aceptado" && (
                    <BotonDescargar onClick={() => descargarReceta(receta)} />
                  )}

                  {(estado === "observado" || estado === "rechazado") && (
                    <BotonObservaciones onClick={handleObservacionesClick} />
                  )}
                </div>
              )}
            </>
          )}

          {receta.estado === "pendiente" && !dashboard && showButtons && (
            <div className="flex justify-end row-start-4">
              <BotonEditar
                onClick={() => navigate(`/recetas/editar/${receta.id}`)}
              />
              <BotonPapelera onClick={() => deleteRecetaHandler(receta)} />
            </div>
          )}
        </div>
      </MarcoCard>
    </>
  );
}

export default RecetaCard;
