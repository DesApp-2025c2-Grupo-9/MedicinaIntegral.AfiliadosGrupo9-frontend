import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import BotonPapelera from "./cardComponents/BotonPapelera";
import UsuarioActual from "./cardComponents/UsuarioActual";
import MarcoCard from "./cardComponents/MarcoCard";
function TurnosCard(props) {
  //Recibe en sus props un turno
  //Opcionalmente, si el turno le pertenece al afiliado, se manda el afiliado o una flag
  //  que indique que el turno pertenece al paciente

  let turno = props.turno; //El turno con el que se va a cargar la primera columna
  let paciente = props.paciente; //Flag  paciente
  const deleteTurno = () => {
    //Lógica a aplicar al apretar la papelera
    alert("deleteTurno");
  };

  const campos = 4; //4 campos sin contar titulo y subtitulo

  //Estilo de la card
  let columns = paciente ? 2 : 1;
  //let ancho = paciente ? "max-w-md min-w-sm" : "w-xs";
  let cardStyle = ` grid-cols-${columns} 
    `;

  return (
    <MarcoCard estilo={cardStyle} >
      {/*columna datos del turno*/}
      <ColumnaPrincipal >
        {turno.especialidad}
        {`Dr. ${turno.profesional}`}
        {formatFecha(turno.fecha)}
        {turno.lugar}
        {turno.direccion}
        {turno.telefono}
      </ColumnaPrincipal>
      {/*Columna derecha si tiene turno asignado*/}
      {paciente ? (
        <div className="grid grid-rows-4 justify-end">
          <UsuarioActual />
          <div className="row-start-4 justify-self-end">

          <BotonPapelera
            onClick={deleteTurno}
            />
            </div>
        </div>
      ) : (
        <></>
      )}
    </MarcoCard>
  );
}

export default TurnosCard;

function formatFecha(fecha) {
  //Recibe una fecha tipo Date como parámetro
  //Retorna un String para mostrar la fecha al usuario

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1);
  const anio = fecha.getFullYear();

  const horas = String(fecha.getHours()).padStart(2, "0");
  const minutos = String(fecha.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${anio} - ${horas}:${minutos}`;
}
