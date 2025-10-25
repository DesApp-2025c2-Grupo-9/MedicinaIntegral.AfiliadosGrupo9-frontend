import BotonEditar from "./cardComponents/BotonEditar";
import BotonPapelera from "./cardComponents/BotonPapelera";
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import UsuarioActual from "./cardComponents/UsuarioActual";
import MarcoCard from "./cardComponents/MarcoCard";
import TipoDeTramite from "./cardComponents/TipoDeTramite";
import Swal from "sweetalert2";
import { useState } from "react";
import EditarAutorizacion from "../../../pages/Autorizaciones/EditarAutorizacion";
import { useDeleteAutorizacion } from '../../../services/autorizacionesQueries';

function AutorizacionCard(props) {
  const [modalEditarOpen, setModalEditarOpen] = useState(false)
  const autorizacion = props.autorizacion;
  const dashboard = props.dashboard || false;
  let cardStyle = `grid-cols-2`;
  const { mutateAsync } = useDeleteAutorizacion();

  const observacionesHTML = Array.isArray(autorizacion.observaciones) ?
    autorizacion.observaciones.map((observacion) => {
      const fecha = new Date(observacion.fecha).toLocaleDateString("es-AR")
      return `
        <div style= 'text-align:left'>
          <p><strong>Emisor: </strong> ${observacion.emisor}</p>
          <p><strong>Descripción:</strong> ${observacion.descripcion}</p>
          <p><strong>Fecha:</strong> ${fecha}</p>
        </div>
      `
    }).join("") : '';
  const verObservaciones = () => {
    Swal.fire({
      title: "Observaciones",
      html: observacionesHTML || '<p>No hay observaciones para esta autorización</p>',
      confirmButtonText: "Cerrar"
    })
  }

  const eliminarAutorizacion = () => {
    
    Swal.fire({
      html: `
            <p>Está a punto de cancelar la solicitud de autorización:</p><br>
             <p>Autorizacion para: <b>${autorizacion.paraAfiliado}</b> </p>
             <p>Especialidad: <b>${autorizacion.especialidad}</b> <p>
             <p>Practica: <b>${autorizacion.practica}</b><p>
             <p>Fecha prevista:  <b>${new Date(autorizacion.fechaSolicitud).toLocaleDateString()}</b></p>
             <p>Dias de internación:  <b>${autorizacion.diasDeInternacion}</b></p><br>
            <p>¿Desea continuar?</p>
         `,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#00ab01',
      cancelButtonColor: '#dc143c',
      confirmButtonText: 'Confirmar',
      customClass: {
          cancelButton: 'modal-cancel-button',
          confirmButton: 'modal-confirm-button'
      }
    }).then(async (result) => {
      if(result.isConfirmed) {
        try {
          const res = await mutateAsync(autorizacion.id);
          if (result.isConfirmed) {
            Swal.fire({
              html: res.message,
              title: "Eliminada!",
              text: "Su autorización ha sido eliminada.",
              icon: "success"
            });
          }
        } catch(err){
          console.log(err)
        }
      }
    });
  }

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
                    <BotonObservaciones onClick={verObservaciones} />
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

function formatFecha(fecha) {
  //Recibe una fecha tipo Date como parámetro
  //Retorna un String para mostrar la fecha al usuario

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1);
  const anio = fecha.getFullYear();

  return `${dia}/${mes}/${anio}`;
}

export default AutorizacionCard;
