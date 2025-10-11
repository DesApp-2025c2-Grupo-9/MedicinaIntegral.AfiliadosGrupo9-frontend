import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal";
import BotonPapelera from "./cardComponents/BotonPapelera";
import UsuarioActual from "./cardComponents/UsuarioActual";
import BotonEditar from "./cardComponents/BotonEditar";
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import MarcoCard from "./cardComponents/MarcoCard";
import TipoDeTramite from "./cardComponents/TipoDeTramite";
import BotonDescargar from './cardComponents/BotonDescargar'
import capitalize from '../../../utils/capitalize'
import logo from '../../../assets/img/med_integral_logo.png'
import {jsPDF} from 'jspdf'
function RecetaCard(props) {
  let receta = props.receta;
  //Los campos que se van a cargar del medicamento
  const cardStyle = "grid-cols-2";

  const descargarReceta = () => {
    let y = 10
    //Generar el pdf
    const doc = new jsPDF({format: 'a5'});

    //Marca de agua
    doc.addImage(logo, "PNG", 100,10,40,40);
    //Titulo principal
    doc.setFontSize(20)
    doc.text("Medicina Integral", 10, y)
    //Titulo
    doc.setFontSize(16);
    doc.text("Receta médica", 10, y+=10)
    //Datos
    doc.setFontSize(12)
    doc.text(`Nro de afiliado: ${receta.nroAfiliado}`, 10, y+=10)
    doc.text(`Medicamento: ${receta.medicamento}`,10, y+=10)
    doc.text(`Cantidad: ${receta.cantidad}`,10, y+=10)
    doc.text(`Presentación: ${receta.presentacion}`,10, y+=10)
    doc.text(`Estado: ${capitalize(receta.estado)}`,10, y+=10)
    //Si la receta tiene observaciones agregarlas
    if (receta.observaciones && receta.observaciones.length > 0){
      doc.text("Observaciones:",10, y+=10);
      receta.observaciones.forEach((observacion, index) => {
        const y = 100 + index*10;
        doc.text(
          `- Emisor: ${observacion.emisor} | ${observacion.descripcion} | ${new Date(observacion.fecha).toLocaleDateString()}`, 10, y
        )
      })
    }else(
      doc.text("Observaciones: Sin observaciones", 10, y+=10)
    )
    doc.save(`Receta.pdf`)
    console.log('Boton para descargar apretado')
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
