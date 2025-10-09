import BotonEditar from "./BotonEditar";
import BotonPapelera from "./BotonPapelera";

function MarcoCard(props) {
  //Marco con el estilo por defecto de las cards

  let { children,
    estilo = '',
    estado = null,
    setdetalleOn,//useState para mostrar/ocultar detalle
    detalleOn,//detalle oculto/visible
    mostrarDetalle = false, //Por defecto no se muestra una pestaña para detalle
    deleteAction,
    editAction
  } = props

  const estilos = {
    /*
      Si el estado es:
        pendiente:  Se carga fondo y pestaña en amarillo
        aceptado:   Se carga fondo y pestaña en verde
        rechazado:  Se carga fondo y pestaña en azul
        observado:  Se carga fondo y pestaña en azul
    */
    pendiente: 'pt-1 bg-amber-300 shadow-amber-300 shadow rounded-xl m-3',
    aceptado: 'pt-1 bg-green-300 shadow-green-300 shadow rounded-xl m-3',
    rechazado: 'pt-1 bg-red-300 shadow-red-300 shadow rounded-xl m-3',
    observado: 'pt-1 bg-blue-300 shadow-blue-300 shadow rounded-xl m-3'
  };

  const estiloEstado = estilos[estado] || '';

  // const invertirDetalle = () => { setdetalleOn(!detalleOn); console.log(detalleOn) }//Utilizado si se usa una pestaña para mostrar detalle
  return (

    <div className={`m-1 ${estiloEstado}`}>
      {
      //Marco de estado de la card opcional 
      estado ? (
        <div className="flex text-black items-center justify-between px-1">{/*Si se manda un estado se carga esta parte */}
          <p className="px-2">{estado.charAt(0).toUpperCase() + estado.slice(1)}</p>
          {/*Aca si el estado es pendiente se puede modificar o elimnar la receta */}
          {estado == 'pendiente'? (
            <div className="flex items-center justify-between bg-amber-100  border-s-gray-900 shadow-2xs border-t-1 border-x-1 rounded-t-xl">
              <BotonEditar onClick={editAction}/>
              <BotonPapelera onClick = {deleteAction}/>
            </div>
          ): <></> 
          }



          {mostrarDetalle ? (//Si se quiere mostrar una pestaña para mostrar el detalle
            <button className="text-black bg-blue-300 rounded-t-2xl px-2" onClick={invertirDetalle}>Detalle</button>
          ) : <></>}
        </div>
      ) : <></>//Sino no se muestra el marco y solo la card
      }

      <div className={`grid p-3 bg-blanco-principal rounded-b-xl  border border-gris-border ${estilo}`}>
        {/*Aca dentro va la card */}
        {children}
      </div>
    </div>
  );
}

export default MarcoCard;
