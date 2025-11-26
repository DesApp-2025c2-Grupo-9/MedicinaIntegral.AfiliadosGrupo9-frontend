import { icons } from '../../../../utils/icons';

function MarcoCard(props) {
  //Marco con el estilo por defecto de las cards

  let { children,
    estilo = '',
    estado = null,
    setdetalleOn,//useState para mostrar/ocultar detalle
    detalleOn,//detalle oculto/visible
    mostrarDetalle = false, //Por defecto no se muestra una pestaña para detalle
    fechaSolicitud
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
    pendiente: 'bg-[#FD7400]',
    aceptado: 'bg-[#00AB01]',
    rechazado: 'bg-[#FF1D23]',
    observado: 'bg-[#1B76FF]',
    analisis: 'bg-[#9C27B0]',
  };

    const innerBorderColor = estado === 'pendiente' 
      ? 'border-[#FD7400]'
      : estado === 'observado'
      ? 'border-[#1B76FF]'
      : estado === 'aceptado'
      ? 'border-[#00AB01]'
      : estado === 'rechazado'
      ? 'border-[#FF1D23]'
      : 'border-[#9C27B0]';

    const stateIcon = estado === 'pendiente' 
      ? icons.pendiente
      : estado === 'observado'
      ? icons.observado
      : estado === 'aceptado'
      ? icons.aceptado
      : estado === 'rechazado'
      ? icons.rechazado
      : icons.enAnalisis;  

    const mostrarEstado = () => {
      
      if(estado == 'analisis'){
        return 'En analisis'  
      }else{
        return estado.charAt(0).toUpperCase() + estado.slice(1)
      }

    }
    const estiloAnalisis = estado ==='en análisis' ? estilos['analisis'] : ''
    const estiloEstado = estilos[estado] || estiloAnalisis;

  // const invertirDetalle = () => { setdetalleOn(!detalleOn); console.log(detalleOn) }//Utilizado si se usa una pestaña para mostrar detalle
  return (
    <div className={`rounded-lg shadow-custom-shadow ${estiloEstado}`}>
      {
      //Marco de estado de la card opcional 
      estado ? (
        <div className="px-3 py-1 flex justify-between">{/*Si se manda un estado se carga esta parte */}
          <div className='flex items-center text-blanco-principal py-1'>
            {/* <div className='w-4 aspect-square flex justify-center items-center'>{stateIcon}</div> */}
            <p className='font-semibold uppercase tracking-wider leading-3'>{mostrarEstado()}</p>
          </div>
        
          {mostrarDetalle ? (//Si se quiere mostrar una pestaña para mostrar el detalle
            <button className="text-black bg-blue-300 rounded-t-2xl px-2" onClick={invertirDetalle}>Detalle</button>
          ) : <></>}
          {<p className='text-white text-sm'>{fechaSolicitud}</p>}
        </div>
      ) : <></>//Sino no se muestra el marco y solo la card
      }

      <div className={`grid p-3 bg-blanco-principal rounded-lg ${estado ? `border-1 border-t-0 ${innerBorderColor}` : 'h-full border border-gris-border'} ${estilo}`}>
        {/*Aca dentro va la card */}
        {children}
      
      </div>
    </div>
  );
}

export default MarcoCard;