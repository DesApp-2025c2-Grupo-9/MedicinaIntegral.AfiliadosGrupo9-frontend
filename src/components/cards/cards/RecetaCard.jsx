import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import BotonPapelera from "./cardComponents/BotonPapelera";
import UsuarioActual from "./cardComponents/UsuarioActual";
import BotonEditar from "./cardComponents/BotonEditar";
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import TituloCard from "./cardComponents/TituloCard";
import SubTituloCard from "./cardComponents/SubTituloCard";
import CampoInformacion from "./cardComponents/CampoInformacion";
import MarcoCard from "./cardComponents/MarcoCard";
import EstadoCard from "./cardComponents/EstadoCard";
import TipoDeTramite from "./cardComponents/TipoDeTramite";

function RecetaCard(props) {
  let receta = props.receta;
  //Los campos que se van a cargar del medicamento
  const campos = [`Presentación: ${receta.presentacion}`, receta.detalleMedicamento];
  const cardStyle = "grid-cols-2";

  return (
    //Card
    <MarcoCard estilo={cardStyle}>
      {/*Datos de la receta*/}
      <ColumnaPrincipal>
        <TituloCard>{receta.medicamento}</TituloCard>
        <SubTituloCard>{receta.cantidad}</SubTituloCard>
        {campos.map((texto, index) => (
          <CampoInformacion key={index}>{texto}</CampoInformacion>
        ))}
      </ColumnaPrincipal>
      <div className="grid grid-rows-4 justify-items-end">
        <EstadoCard estado={receta.estado} dashboard={props.dashboard} />
        {/*Según es estado de la receta, varía la sección derecha de la card receta */}
        {
          props.dashboard ? (//Si es card de dashboard
            //Mostrar tipo de tramite
            <TipoDeTramite tipo={'Receta'} />
          ) : <>
            {/**Si no es card de dashboard */}
            <UsuarioActual />
            {receta.estado == "Pendiente" ? (
              <>
                <BotonEditar posicion={campos.length + 1} />
                <BotonPapelera posicion={campos.length + 2} />
              </>
            ) : (
              <BotonObservaciones />
            )}
            {receta.estado !== 'Pendiente' ? (
              <BotonObservaciones/>
            ): (<></>)
            }
          </>
        }
      </div>
    </MarcoCard>
  );
}

export default RecetaCard;
