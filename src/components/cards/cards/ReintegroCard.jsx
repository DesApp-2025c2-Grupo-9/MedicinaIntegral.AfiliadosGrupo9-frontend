import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import UsuarioActual from "./cardComponents/UsuarioActual";
import BotonEditar from "./cardComponents/BotonEditar";
import BotonPapelera from "./cardComponents/BotonPapelera";
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import EstadoVersion1 from "./cardComponents/EstadoVersion1";
import MarcoCard from "./cardComponents/MarcoCard";
import TituloCard from "./cardComponents/TituloCard";
import SubTituloCard from "./cardComponents/SubTituloCard";
import CampoInformacion from "./cardComponents/CampoInformacion";
function ReintegroCard(props) {
  //Estilo de la card

  let cardStyle = ` grid-cols-2 w-md`;

  let reintegro = props.reintegro;

  const campos = [
    `Fecha de la prestación ${formatFecha(reintegro.fecha)}`,
    reintegro.lugar,
    reintegro.valor,
  ];

  return (
    <MarcoCard estilo={cardStyle}>
      <ColumnaPrincipal campos={campos.length}>
        <TituloCard>{reintegro.especialidad}</TituloCard>
        <SubTituloCard>{reintegro.medico}</SubTituloCard>
        {campos.map((texto, index) => (
          <CampoInformacion key={index}>{texto}</CampoInformacion>
        ))}
      </ColumnaPrincipal>
      <div className="grid grid-rows-4">
        <UsuarioActual />
        <EstadoVersion1 estado={reintegro.estado} />
        {reintegro.estado == "Pendiente" ? (
          <>
            <BotonEditar posicion={3} />
            <BotonPapelera posicion={4} />
          </>
        ) : (
          <BotonObservaciones />
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
