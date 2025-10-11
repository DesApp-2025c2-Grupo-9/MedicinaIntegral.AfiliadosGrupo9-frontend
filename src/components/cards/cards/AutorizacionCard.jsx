import BotonEditar from "./cardComponents/BotonEditar";
import BotonPapelera from "./cardComponents/BotonPapelera";
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import UsuarioActual from "./cardComponents/UsuarioActual";
import MarcoCard from "./cardComponents/MarcoCard";
import TipoDeTramite from "./cardComponents/TipoDeTramite";
import {format} from 'date-fns'

function AutorizacionCard(props) {
  const autorizacion = props.autorizacion;
  const dashboard = props.dashboard || false;
  let cardStyle = `grid-cols-2`;

  const editarAutorizacion = () => {
    alert('Editar autorizacion')
  }

  const eliminarAutorizacion = () => {
    alert('EliminarAutorizacion')
  }

  return (
    <MarcoCard estilo={cardStyle} estado={autorizacion.estado}>
      <ColumnaPrincipal>
        {autorizacion.especialidad}
        {`Dr. ${autorizacion.medicoSolicitante}`}
        {`Fecha prevista ${formatFecha(autorizacion.fechaSolicitud)}`}
        {autorizacion.lugar}
        {`Dias de internación: ${autorizacion.diasInternacion} días`}
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
                  <BotonObservaciones />
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
