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
  let cardStyle = `grid-cols-3`;
  const { onSubmit:commentAutorizacion } = useCommentAutorizacion();
  const { eliminarAutorizacion } = useEliminarAutorizacion();
  const [isObservacionesOpen, setIsObservacionesOpen] = useState(false);
  const ultimaObsPrestador = autorizacion?.observaciones?.filter(obs => obs.rolEmisor === 'Prestador').slice(-1)[0];
  const ultimaObsAfiliado = autorizacion?.observaciones?.filter((obs) => obs.rolEmisor === "Afiliado")?.slice(-1)[0];
  const navigate = useNavigate()
  const fechaSolicitud = format(addDays(autorizacion.fechaSolicitud, 1), 'dd/MM/yyyy');

  const user = useUserStore(state => state.user);
  const rolSesion = user?.rolSesion;
  const showButtons = rolSesion === 'Titular' && (autorizacion?.rolAfiliado === 'Cónyuge' || autorizacion?.rolAfiliado === 'Hijo Mayor');
  const showUsuarioCard = (rolSesion === 'Titular' && user.grupoFamiliar?.length > 1) || rolSesion === 'Cónyuge';

  let fechaAMostrar = null;

  if (autorizacion.estado === "rechazado" || autorizacion.estado === "observado") {
    fechaAMostrar = ultimaObsPrestador?.fecha;
  } else if (autorizacion.estado === "aceptado") {
    fechaAMostrar = autorizacion?.fechaAprobacion;
  } else if (autorizacion.estado === "en análisis") {
    fechaAMostrar = ultimaObsAfiliado.fecha;
  } else {
    fechaAMostrar = autorizacion?.createdAt;
  }

  const fechaFormateada = fechaAMostrar
    ? new Date(fechaAMostrar).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Sin fecha";

  const fechaActualizacion = {
    rechazado: `Rechazada: ${fechaFormateada}`,
    aceptado: `Aceptada: ${fechaFormateada}`,
    pendiente: `Solicitud: ${fechaFormateada}`,
    observado: `Observada: ${fechaFormateada}`,
    analisis: `Análisis: ${fechaFormateada}`,
  }

  const fechaActualizacionFn = () => {
    if(autorizacion.estado == 'en análisis'){
        return fechaActualizacion.analisis
    }
    return fechaActualizacion[autorizacion.estado]
  }

  const handleObservacionesRechazadas = () => {
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
        fechaEnvio={ultimaObsPrestador?.fecha}
        observacionesTexto={ultimaObsPrestador?.descripcion}
        idTramite={autorizacion.id}
        onSubmit={commentAutorizacion}
      />
      <MarcoCard estilo={cardStyle} estado={autorizacion.estado} fechaSolicitud={fechaFormateada}>
        <ColumnaPrincipal>
          {autorizacion.especialidad}
          {`${autorizacion.practica}`}
          {`Médico: ${autorizacion.medicoSolicitante}`}
          {`Fecha prevista: ${fechaSolicitud}`}
          {`Lugar: ${autorizacion.lugarAtencion} (${autorizacion.diasDeInternacion == 1 ? autorizacion.diasDeInternacion + " dia": autorizacion.diasDeInternacion + " dias"})`}
        </ColumnaPrincipal>
        <div className="grid grid-rows-4 justify-items-end col-start-3">
          {//Si es card de dashboard
            props.dashboard ? (
              <>
                <>
                  {showUsuarioCard && <UsuarioActual paciente={autorizacion.paraAfiliado}/>}
                </>
                <div>
                  <TipoDeTramite tipo={'Autorización'} colorEstado={autorizacion.estado}/>
                </div>
              </>
            ) ://Si no es de dashboard
              < >
                {showUsuarioCard && <UsuarioActual paciente={autorizacion.paraAfiliado}/>}
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
