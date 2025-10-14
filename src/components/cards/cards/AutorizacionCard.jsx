import BotonEditar from "./cardComponents/BotonEditar";
import BotonPapelera from "./cardComponents/BotonPapelera";
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import UsuarioActual from "./cardComponents/UsuarioActual";
import MarcoCard from "./cardComponents/MarcoCard";
import TipoDeTramite from "./cardComponents/TipoDeTramite";
import Swal from "sweetalert2";

function AutorizacionCard(props) {
  const autorizacion = props.autorizacion;
  const dashboard = props.dashboard || false;
  let cardStyle = `grid-cols-2`;

    const observacionesHTML = autorizacion.observaciones.map((observacion) => {
      const fecha = new Date(observacion.fecha).toLocaleDateString("es-AR")
      return `
        <div style= 'text-align:left'>
          <p><strong>Emisor: </strong> ${observacion.emisor}</p>
          <p><strong>Descripción:</strong> ${observacion.descripcion}</p>
          <p><strong>Fecha:</strong> ${fecha}</p>
        </div>
      `
    }).join("")
    const verObservaciones = () => {
      Swal.fire({
        title: "Observaciones",
        html: observacionesHTML || '<p>No hay observaciones para esta receta</p>',
        confirmButtonText: "Cerrar"
      })
    }

  const editarAutorizacion = () => {
    alert('Editar autorizacion')
  }

  const eliminarAutorizacion = () => {
   Swal.fire({
         title: "Eliminar autorización",
         html: `
         <div style='display: flex ;justify-content-center'>
           <div style= 'text-align:left'>
             <p><strong>Datos de la autorización:</strong><p>
             <p><strong>Autorizacion para: </strong> ${autorizacion.nroAfiliado}</p>
             <p><strong>Especialidad:</strong> ${autorizacion.especialidad}<p>
             <p><strong>Fecha prevista: </strong> ${new Date(autorizacion.fechaSolicitud).toLocaleDateString()}</p>
             <p><strong>Dias de internación: </strong> ${autorizacion.diasDeInternacion}</p>
           </div>
         </div>
         `,
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#27a700ff",
         cancelButtonColor: "#d33",
         confirmButtonText: "Eliminar"
       }).then((result) => {
         if (result.isConfirmed) {
           Swal.fire({
             title: "Eliminada!",
             text: "Su autorización ha sido eliminada.",
             icon: "success"
           });
         }
       });
  }

  return (
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
              <UsuarioActual />
              {autorizacion.estado !== "pendiente" ? (
                <div className="row-start-4">
                  <BotonObservaciones onClick={verObservaciones}/>
                </div>
              ) : <>  </>}
            </>
        }
        {/*Aca si el estado es pendiente se puede modificar o elimnar la receta */}
        {autorizacion.estado == 'pendiente' && dashboard == false ? (
          <div className="flex items-baseline-last justify-end row-start-4 col-start-1">
            <BotonEditar onClick={editarAutorizacion} />
            <BotonPapelera onClick={eliminarAutorizacion} />
          </div>
        ) : <></>
        }
      </div>
    </MarcoCard>
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
