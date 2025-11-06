function MarcoCard(props) {
  //Marco con el estilo por defecto de las cards

  let { children,
    estilo = '',
    estado = null,
    setdetalleOn,//useState para mostrar/ocultar detalle
    detalleOn,//detalle oculto/visible
    mostrarDetalle = false, //Por defecto no se muestra una pestaña para detalle
  } = props

  const estilos = {
    /*
      Si el estado es:
        pendiente:  Se carga fondo y pestaña en amarillo
        aceptado:   Se carga fondo y pestaña en verde
        rechazado:  Se carga fondo y pestaña en rojo
        observado:  Se carga fondo y pestaña en azul
        analisis: Se carga fondo y pestaña en celeste
    */
    pendiente: 'pt-1 bg-amber-300 shadow-amber-300 shadow rounded-xl', /* se quitó margin m-3 */
    aceptado: 'pt-1 bg-green-300 shadow-green-300 shadow rounded-xl',
    rechazado: 'pt-1 bg-red-300 shadow-red-300 shadow rounded-xl',
    observado: 'pt-1 bg-blue-300 shadow-blue-300 shadow rounded-xl',
    analisis: 'pt-1 bg-blue-200 shadow-blue-300 shadow rounded-xl',
  };
    const mostrarEstado = () => {
      
      if(estado == 'analisis'){
        return 'En analisis'  
      }else{
        return estado.charAt(0).toUpperCase() + estado.slice(1)
      }

    }
    const estiloAnalisis = estado =='en análisis' ? estilos['analisis'] : ''
    const estiloEstado = estilos[estado] || estiloAnalisis;

  // const invertirDetalle = () => { setdetalleOn(!detalleOn); console.log(detalleOn) }//Utilizado si se usa una pestaña para mostrar detalle
  return (

    // <div className={`m-1 ${estiloEstado}`}>
    <div className={`${estiloEstado}`}>
      {
      //Marco de estado de la card opcional 
      estado ? (
        <div className="flex text-black items-center justify-between px-1">{/*Si se manda un estado se carga esta parte */}
          <p className="px-2">{mostrarEstado()}</p>
          



          {mostrarDetalle ? (//Si se quiere mostrar una pestaña para mostrar el detalle
            <button className="text-black bg-blue-300 rounded-t-2xl px-2" onClick={invertirDetalle}>Detalle</button>
          ) : <></>}
        </div>
      ) : <></>//Sino no se muestra el marco y solo la card
      }

      <div className={`grid p-3 bg-blanco-principal rounded-b-xl ${!estado && 'h-full'} border border-gris-border ${estilo}`}>
        {/*Aca dentro va la card */}
        {children}
      
      </div>
    </div>
  );
}

export default MarcoCard;
