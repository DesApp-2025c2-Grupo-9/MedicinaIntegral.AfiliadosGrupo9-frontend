import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import BotonPapelera from "./cardComponents/BotonPapelera";
import UsuarioActual from "./cardComponents/UsuarioActual";
import MarcoCard from "./cardComponents/MarcoCard";
import CampoInformacion from "./cardComponents/CampoInformacion";
import TituloCard from "./cardComponents/TituloCard";
import SubTituloCard from "./cardComponents/SubTituloCard";
function TurnosCard(props) {
  //Recibe en sus props un turno
  //Opcionalmente, si el turno le pertenece al afiliado, se manda el afiliado o una flag
  //  que indique que el turno pertenece al paciente

  let turno = props.turno; //El turno con el que se va a cargar la primera columna
  let paciente = props.paciente; //Flag  paciente
  const papeleraOnClick = () => {
    //Lógica a aplicar al apretar la papelera
    alert("Boton apretado");
  };

  const campos = [
    formatFecha(turno.fecha),
    turno.lugar,
    turno.direccion,
    turno.telefono,
  ];

  //Estilo de la card
  let columns = paciente ? 2 : 1;
  //let ancho = paciente ? "max-w-md min-w-sm" : "w-xs";
  let cardStyle = ` grid-cols-${columns} 
    `;

  return (
    <MarcoCard estilo={cardStyle}>
      {/*columna datos del turno*/}
      <ColumnaPrincipal>
        <TituloCard>{turno.especialidad}</TituloCard>
        <SubTituloCard>{`Dr. ${turno.profesional}`}</SubTituloCard>
        {/* Cargar los campos de la card*/}
        {campos.map((texto, index) => (
          <CampoInformacion key={index}>{texto}</CampoInformacion>
        ))}
      </ColumnaPrincipal>
      {/*Columna derecha si tiene turno asignado*/}
      {paciente ? (
        <div className="grid grid-rows-4">
          <UsuarioActual />
          <BotonPapelera
            onClick={papeleraOnClick}
            posicion={campos.length + 2}
          />
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
