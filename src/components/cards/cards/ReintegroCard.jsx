import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import UsuarioActual from "./cardComponents/UsuarioActual";
import BotonEditar from "./cardComponents/BotonEditar";
import BotonPapelera from "./cardComponents/BotonPapelera";
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import EstadoCard from "./cardComponents/EstadoCard";
import MarcoCard from "./cardComponents/MarcoCard";
import TituloCard from "./cardComponents/TituloCard";
import SubTituloCard from "./cardComponents/SubTituloCard";
import CampoInformacion from "./cardComponents/CampoInformacion";
import TipoDeTramite from "./cardComponents/TipoDeTramite";
function ReintegroCard(props) {
  //Estilo de la card

  let cardStyle = ` grid-cols-2 max-w-md mx-auto`;

  let reintegro = props.reintegro;

  const campos = [
    `Fecha de la prestación ${formatFecha(reintegro.fecha)}`,
    reintegro.lugar,
    reintegro.valor,
  ];

  console.log(props.dashboard);
  return (
    <MarcoCard estilo={cardStyle}>
      <ColumnaPrincipal campos={campos.length}>
        <TituloCard>{reintegro.especialidad}</TituloCard>
        <SubTituloCard>Dr. {reintegro.medico}</SubTituloCard>
        {campos.map((texto, index) => (
          <CampoInformacion key={index}>{texto}</CampoInformacion>
        ))}
      </ColumnaPrincipal>
      {/**Columna dinámica con opciones o información del trámite */}
      <div className="grid grid-rows-4 justify-items-end">
        <EstadoCard estado={reintegro.estado} dashboard={props.dashboard} />
        {/*El estilo del estado es dinámico si está o no en el dashboard*/}
        {props.dashboard ? ( //Si es card de dashboard mostrar el tipo de tramite
          <TipoDeTramite tipo={"Reintegro"} />
        ) : (
          <>
            <UsuarioActual />
            {reintegro.estado == "Pendiente" ? (
              <>
                <BotonEditar posicion={3} />
                <BotonPapelera posicion={4} />
              </>
            ) : (
              <BotonObservaciones />
            )}
          </>
        )}
      </div>
    </MarcoCard>
  );
}

export default ReintegroCard;

function formatFecha(fecha) {
  //Recibe una fecha tipo Date como parámetro
  //Retorna un String para mostrar la fecha al usuario

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1);
  const anio = fecha.getFullYear();

  return `${dia}/${mes}/${anio}`;
}
