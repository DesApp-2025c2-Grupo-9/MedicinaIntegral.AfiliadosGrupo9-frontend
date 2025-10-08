import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import BotonPapelera from "./cardComponents/BotonPapelera";
import UsuarioActual from "./cardComponents/UsuarioActual";
import BotonEditar from "./cardComponents/BotonEditar";
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import MarcoCard from "./cardComponents/MarcoCard";
import TipoDeTramite from "./cardComponents/TipoDeTramite";
import { useState } from "react";

function RecetaCard(props) {
  let receta = props.receta;
  //Los campos que se van a cargar del medicamento
  const campos = 2;//Dos campos ademas de titulo y subitulo
  const cardStyle = "grid-cols-2";

  const [detalleOn, setdetalleOn] = useState(false)

  return (
    //Card
    <MarcoCard estilo={cardStyle} estado = {receta.estado} setdetalleOn = {setdetalleOn} detalleOn = {detalleOn} mostrarDetalle = {true}>
      {/*Datos de la receta*/}
      <ColumnaPrincipal detalleOn={detalleOn}>
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
