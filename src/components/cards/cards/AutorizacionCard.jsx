import BotonEditar from "./cardComponents/BotonEditar";
import BotonPapelera from "./cardComponents/BotonPapelera";
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import UsuarioActual from "./cardComponents/UsuarioActual";
import MarcoCard from "./cardComponents/MarcoCard";
import TipoDeTramite from "./cardComponents/TipoDeTramite";
import { useState } from "react";
import EditarAutorizacion from "../../../pages/Autorizaciones/EditarAutorizacion";
import ModalObservaciones from "../../ModalObservaciones/ModalObservaciones";
import { useEliminarAutorizacion, useCommentAutorizacion } from "../../../hooks/useAutorizacionPetitions";

function AutorizacionCard(props) {
  const [modalEditarOpen, setModalEditarOpen] = useState(false)
  const autorizacion = props.autorizacion;
  const dashboard = props.dashboard || false;
  let cardStyle = `grid-cols-2`;
  const { onSubmit:commentAutorizacion } = useCommentAutorizacion();
  const { eliminarAutorizacion } = useEliminarAutorizacion();
  const [isObservacionesOpen, setIsObservacionesOpen] = useState(false);
  const observacionPrestador = autorizacion?.observaciones?.find(observacion => observacion.rolEmisor === 'Prestador');

  return (
    <>
      {/*Modal Editar */}
      {
        modalEditarOpen && (
          <div className="bg-negro-translucido fixed top-0 left-0 w-dvw h-dvh z-10 flex items-center justify-center">
            <EditarAutorizacion
              className='w-full max-w-[600px]'
              autorizacion={autorizacion}
              cancelBtnOnClick={() => setModalEditarOpen(false)}
            />
          </div>
        )
      }
       <ModalObservaciones
        open={isObservacionesOpen}
        onClose={() => setIsObservacionesOpen(false)}
        nombreUsuario={autorizacion.paraAfiliado}
        headerText='Volver a Autorizaciones'
        fechaEnvio={observacionPrestador?.fecha}
        observacionesTexto={observacionPrestador?.descripcion}
        idTramite={autorizacion.id}
        onSubmit={commentAutorizacion}
      />
      <MarcoCard estilo={cardStyle} estado={autorizacion.estado}>
        <ColumnaPrincipal>
          {autorizacion.especialidad}
          {`${autorizacion.medicoSolicitante}`}
          {`Fecha prevista ${new Date(autorizacion.fechaSolicitud).toLocaleDateString()}`}
          {autorizacion.lugar}
          {`Dias de internación: ${autorizacion.diasDeInternacion} días`}
        </ColumnaPrincipal>
        <div className="grid grid-rows-4 justify-items-end col-start-2">
          {//Si es card de dashboard
            props.dashboard ? (

              <TipoDeTramite tipo={'Autorización'} />

            ) ://Si no es de dashboard
              < >
                <UsuarioActual paciente={autorizacion.paraAfiliado}/>
                {autorizacion.estado !== "pendiente" ? (
                  <div className="row-start-4">
                    <BotonObservaciones onClick={() => setIsObservacionesOpen(true)} />
                  </div>
                ) : <>  </>}
              </>
          }
          {/*Aca si el estado es pendiente se puede modificar o elimnar la receta */}
          {autorizacion.estado == 'pendiente' && dashboard == false ? (
            <div className="flex items-baseline-last justify-end row-start-4 col-start-1">
              <BotonEditar onClick={() => setModalEditarOpen(true)} />
              <BotonPapelera onClick={eliminarAutorizacion} />
            </div>
          ) : <></>
          }
        </div>
      </MarcoCard>
    </>
  );
}

export default AutorizacionCard;
