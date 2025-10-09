function MarcoCard(props) {
  //Marco con el estilo por defecto de las cards

  let {children,
     estilo = '',
      estado = null,
      setdetalleOn,
      detalleOn,
      mostrarDetalle = false
    } = props

  const estiloEstado = (
    estado == 'pendiente' ?(
      `pt-1 bg-amber-300 shadow-amber-300 shadow rounded-xl m-3`
    ):(
      estado == 'aceptado' ?(
        `pt-1 bg-green-300 shadow-green-300 shadow rounded-xl m-3`
      ):(
        estado == 'rechazado' ?(
          `pt-1 bg-red-300 shadow-red-300 shadow rounded-xl m-3`
        ):(
          estado == 'observado'?(
            `pt-1 bg-blue-300 shadow-blue-300 shadow rounded-xl m-3`
          ): ''
        )
      )
    )
  )
  const invertirDetalle = () => {setdetalleOn(!detalleOn); console.log(detalleOn)}
  return (
    <div className={`m-1 ${estiloEstado}`}>
      {estado ? (<div className="flex text-black">
        <p className="px-2">{estado.charAt(0).toUpperCase() + estado.slice(1)}</p>
        {mostrarDetalle?(
          <button className="text-black bg-blue-300 rounded-t-2xl px-2" onClick={invertirDetalle}>Detalle</button>

        ): <></>}
      </div>
    ): <></>
    }

    <div
      className={`grid p-3 bg-blanco-principal rounded-b-xl  border border-gris-border ${estilo}`}
    >
        {children}
      </div>
    </div>
  );
}

export default MarcoCard;
