import BotonEditar from "./cardComponents/BotonEditar";
import BotonPapelera from "./cardComponents/BotonPapelera";
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import UsuarioActual from "./cardComponents/UsuarioActual";
import MarcoCard from "./cardComponents/MarcoCard";
import TipoDeTramite from "./cardComponents/TipoDeTramite";
import { useState } from "react";
import ModalObservaciones from "../../ModalObservaciones/ModalObservaciones";
import { useEliminarAutorizacion, useCommentAutorizacion } from "../../../hooks/useAutorizacionPetitions";
import { useNavigate } from "react-router-dom";
import { useAutorizacionStore } from "../../../store/autorizacionStore";
import Swal from "sweetalert2";
import { format, addDays } from "date-fns";
import { useUserStore } from "../../../store/userStore";

function AutorizacionCard(props) {
  const setAutorizacion = useAutorizacionStore(state => state.setAutorizacion)
  const autorizacion = props.autorizacion;
  const dashboard = props.dashboard || false;
  let cardStyle = `grid-cols-2`;
  const { onSubmit:commentAutorizacion } = useCommentAutorizacion();
  const { eliminarAutorizacion } = useEliminarAutorizacion();
  const [isObservacionesOpen, setIsObservacionesOpen] = useState(false);
  const observacionPrestador = autorizacion?.observaciones?.find(observacion => observacion.rolEmisor === 'Prestador');
  const navigate = useNavigate()
  const fechaSolicitud = format(addDays(autorizacion.fechaSolicitud, 1), 'dd/MM/yyyy');

  const user = useUserStore(state => state.user);
  const rolSesion = user?.rolSesion;
  const showButtons = rolSesion === 'Titular' && autorizacion?.rolAfiliado === 'Cónyuge';

  const handleObservacionesRechazadas = () => {
      //obtener la última observación del prestador
      const ultimaObsPrestador = autorizacion?.observaciones?.filter(obs => obs.rolEmisor === 'Prestador').slice(-1)[0];

        Swal.fire({
          title: 'Motivo de rechazo:',
          text: ultimaObsPrestador?.descripcion?.trim(),
          icon: 'error',
          iconColor: '#dc143c',
          confirmButtonText: 'Continuar',
          customClass: {
            popup: 'p-6',
            htmlContainer: 'swal-html',
            confirmButton: 'swal-confirm-button',
            title: 'swal-title'
          }
        });

        return;
};

  return (
    <>
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
          {`Dr. ${autorizacion.medicoSolicitante}`}
          {`Fecha prevista ${fechaSolicitud}`}
          {autorizacion.lugar}
          {`Dias de internación: ${autorizacion.diasDeInternacion} días`}
        </ColumnaPrincipal>
        <div className="grid grid-rows-4 min-h-[96px] items-center justify-items-end col-start-2">
          {//Si es card de dashboard
            props.dashboard ? (
              <>
                <div>
                  <UsuarioActual paciente={autorizacion.paraAfiliado}/>
                </div>
                <div>
                  <TipoDeTramite tipo={'Autorización'} />
                </div>
              </>
            ) ://Si no es de dashboard
              < >
                <UsuarioActual paciente={autorizacion.paraAfiliado}/>
                {autorizacion.estado === "observado" || autorizacion.estado == "rechazado" ? (
                  !showButtons && (
                    <div className="row-start-4">
                      <BotonObservaciones onClick={() => autorizacion.estado == "observado" ? setIsObservacionesOpen(true) : handleObservacionesRechazadas()} />
                  </div>)
                  ) : <>  </>
                }
              </>
          }
          {/*Aca si el estado es pendiente se puede modificar o eliminar la autorizacion*/}
          {autorizacion.estado == 'pendiente' && dashboard == false ? (
            !showButtons && (
              <div className="flex items-baseline-last justify-end row-start-4 col-start-1">
                <BotonEditar onClick={() => {
                    setAutorizacion(autorizacion);
                    navigate('/autorizaciones/editar-autorizacion');
                  }} />
                <BotonPapelera onClick={() => eliminarAutorizacion(autorizacion)} />
              </div>
            )) : <></>
          }
        </div>
      </MarcoCard>
    </>
  );
}

export default AutorizacionCard;
