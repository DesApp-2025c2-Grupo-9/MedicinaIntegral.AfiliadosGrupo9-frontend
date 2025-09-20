import BotonEditar from "./cardComponents/BotonEditar";
import BotonPapelera from "./cardComponents/BotonPapelera";
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import EstadoVersion1 from "./cardComponents/EstadoCard";
import UsuarioActual from "./cardComponents/UsuarioActual";
import MarcoCard from "./cardComponents/MarcoCard";
import TituloCard from "./cardComponents/TituloCard";
import SubTituloCard from "./cardComponents/SubTituloCard";
import CampoInformacion from "./cardComponents/CampoInformacion";

function AutorizacionCard(props) {
  const autorizacion = props.autorizacion;
  const campos = [
    `Fecha prevista ${formatFecha(autorizacion.fecha)}`,
    autorizacion.lugar,
    `Dias de internación: ${autorizacion.diasInternacion} días`,
  ];

  let cardStyle = `grid-cols-2 w-md`;
  return (
    <MarcoCard estilo={cardStyle}>
      <ColumnaPrincipal campos={campos.length}>
        <TituloCard>{autorizacion.especialidad}</TituloCard>
        <SubTituloCard>Dr. {autorizacion.medico}</SubTituloCard>
        {campos.map((texto, index) => (
          <CampoInformacion key={index}>{texto}</CampoInformacion>
        ))}
      </ColumnaPrincipal>
      <div className="grid grid-rows-4">
        <UsuarioActual />
        <EstadoVersion1 estado={autorizacion.estado} />
        {autorizacion.estado == "Pendiente" ? (
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

function formatFecha(fecha) {
  //Recibe una fecha tipo Date como parámetro
  //Retorna un String para mostrar la fecha al usuario

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1);
  const anio = fecha.getFullYear();

  return `${dia}/${mes}/${anio}`;
}

export default AutorizacionCard;
