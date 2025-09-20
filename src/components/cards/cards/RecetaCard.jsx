import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import BotonPapelera from "./cardComponents/BotonPapelera";
import UsuarioActual from "./cardComponents/UsuarioActual";
import BotonEditar from "./cardComponents/BotonEditar";
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import TituloCard from "./cardComponents/TituloCard";
import SubTituloCard from "./cardComponents/SubTituloCard";
import CampoInformacion from "./cardComponents/CampoInformacion";
import MarcoCard from "./cardComponents/MarcoCard";
import EstadoVersion1 from "./cardComponents/EstadoVersion1";

function RecetaCard(props) {
  let receta = props.receta;
  //Los campos que se van a cargar del medicamento
  const campos = [receta.presentacion, receta.detalleMedicamento];
  const cardStyle = "grid-cols-2 max-w-md min-w-sm";

  return (
    //Card
    <MarcoCard estilo={cardStyle}>
      {/*Datos de la receta*/}
      <ColumnaPrincipal campos={campos.length}>
        <TituloCard>{receta.medicamento}</TituloCard>
        <SubTituloCard>{receta.cantidad}</SubTituloCard>
        {campos.map((texto, index) => (
          <CampoInformacion key={index}>{texto}</CampoInformacion>
        ))}
      </ColumnaPrincipal>
      <div className="grid grid-rows-4">
        <UsuarioActual />
        <EstadoVersion1 estado={receta.estado} />
        {/*Según es estado de la receta, varía la sección derecha de la card receta */}
        {receta.estado == "Pendiente" ? (
          <>
            <BotonEditar posicion={campos.length + 1} />
            <BotonPapelera posicion={campos.length + 2} />
          </>
        ) : (
          <BotonObservaciones />
        )}
      </div>
    </MarcoCard>
  );
}

export default RecetaCard;
