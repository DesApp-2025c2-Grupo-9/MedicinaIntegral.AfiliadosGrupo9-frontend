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
  //let ancho = paciente ? "max-w-md min-w-sm" : "w-xs";
  let cardStyle = `relative overflow-hidden group transition-all duration-300 ${paciente? 'grid-cols-2' : ''}`;

  return (
    <MarcoCard estilo={cardStyle} >
      <div className={`transition-all duration-300 group-hover:blur-xxs group-hover:brightness-75 ${paciente || 'grid-cols-2'}`}>
        <div>

        {/*columna datos del turno*/}
        <ColumnaPrincipal >
          {paciente && turno.especialidad}
          {turno.prestador}
          {formatFecha(turno.fechaTurno)}
          {turno.lugarAtencion}
          {turno.direccion}
          {turno.telefono}
        </ColumnaPrincipal>
        </div>
        </div>
        {/*Columna derecha si tiene turno asignado*/}
        {paciente && (
          <div className="grid grid-rows-4 justify-end">
            <UsuarioActual />
            <div className="row-start-4 justify-self-end">

              <BotonPapelera
                onClick={deleteTurno}
              />
            </div>
          </div>
        )}
        {!paciente &&
        <button
        className="absolute inset-0 flex items-center justify-center text-white font-semibold bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        onClick={() => alert('Reservar turno')}
        >
        ¡Reservar turno!
      </button>
      }
      
    </MarcoCard>
  );
}

export default TurnosCard;

function formatFecha(fechaParam) {
  //Recibe una fecha tipo Date como parámetro
  //Retorna un String para mostrar la fecha al usuario
  const fecha = new Date(fechaParam)
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();

  const horas = (fecha.getHours() < 10 ? `0${fecha.getHours()}` : fecha.getHours())
  const minutos = (fecha.getMinutes() < 10 ? `0${fecha.getMinutes()}` : fecha.getMinutes())

  return `${dia}/${mes}/${anio} - ${horas}:${minutos}`;
}
