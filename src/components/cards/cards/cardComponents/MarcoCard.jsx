function MarcoCard(props) {
  //Marco con el estilo por defecto de las cards

  let {children, estilo = '', estado = null} = props

  const estiloEstado = (
    estado == 'Pendiente' ?(
      `pt-1 bg-amber-300 shadow-amber-300 shadow rounded-xl m-3`
    ):(
      estado == 'Aceptado' ?(
        `pt-1 bg-green-300 shadow-green-300 shadow rounded-xl m-3`
      ):(
        estado == 'Rechazado' ?(
          `pt-1 bg-red-300 shadow-red-300 shadow rounded-xl m-3`
        ): ''
      )
    )
  )

  return (
    <div className={estiloEstado}>
      {estado ? <p className="text-center text-black">{estado}</p> : <></>}
    <div
      className={`grid p-3 bg-blanco-principal rounded-xl  border border-gris-border ${estilo}`}
    >
        {children}

      </div>
    </div>
  );
}

export default MarcoCard;
