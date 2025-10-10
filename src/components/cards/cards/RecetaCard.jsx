import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import BotonPapelera from "./cardComponents/BotonPapelera";
import UsuarioActual from "./cardComponents/UsuarioActual";
import BotonEditar from "./cardComponents/BotonEditar";
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import MarcoCard from "./cardComponents/MarcoCard";
import TipoDeTramite from "./cardComponents/TipoDeTramite";
import BotonDescargar from './cardComponents/BotonDescargar'
function RecetaCard(props) {
  let receta = props.receta;
  //Los campos que se van a cargar del medicamento
  const cardStyle = "grid-cols-2";

  const descargarReceta = () => {
    alert('DescargarReceta')
  }

  const observaciones = () => {
    alert('Observaciones')
  }

  const editarReceta = () => {
    alert('EditarReceta')
  }

  const eliminarReceta = () => {
    alert('eliminarReceta')
  }


  return (
    //Card
    <MarcoCard estilo={cardStyle} estado = {receta.estado} >
      {/*Datos de la receta*/}
      <ColumnaPrincipal >
        Receta
        {receta.medicamento}
        {receta.cantidad}
        {`Presentación: ${receta.presentacion}`}
        {receta.detalleMedicamento}
      </ColumnaPrincipal>
      <div className="grid grid-rows-4 justify-items-end">
        
        {/*Según es estado de la receta, varía la sección derecha de la card receta */}
        {
          props.dashboard ? (//Si es card de dashboard
            //Mostrar tipo de tramite
            <TipoDeTramite tipo={'Receta'} />
          ) : <>
            {/**Si no es card de dashboard */}
            <UsuarioActual />
            
            {receta.estado !== 'pendiente' ? (
              <div className="flex row-start-4">
              
              <BotonDescargar onClick={descargarReceta}/>
              <BotonObservaciones onClick={observaciones}/>
            
            </div>
            ): (<></>)
            }
          </>
        }
        {/*Aca si el estado es pendiente se puede modificar o elimnar la receta */}
          {receta.estado == 'pendiente'? (
            <div className="flex items-baseline-last justify-end row-start-4">
              <BotonDescargar onClick={descargarReceta}/>
              <BotonEditar onClick={editarReceta}/>
              <BotonPapelera onClick={eliminarReceta} />
            </div>
          ): <></> 
          }
      </div>
    </MarcoCard>
  );
}

export default RecetaCard;
