function TipoDeTramite(props) {
  const coloresTexto = {
    pendiente: 'text-naranja-pendiente',
    aceptado: 'text-verde-aceptado', 
    rechazado: 'text-rojo-rechazado',
    observado: 'text-azul-observado',
    analisis: 'text-violeta-analisis' 
  };

  const coloresBg = {
    pendiente: 'bg-orange-100',
    aceptado: 'bg-green-100',
    rechazado: 'bg-red-100',
    observado: 'bg-blue-100',
    analisis: 'bg-indigo-100'
  };

  return (
    <>
      <p className={`col-start-2 row-start-1 ${coloresBg[props.colorEstado]} ${props.colorEstado ? coloresTexto[props.colorEstado] : ''} p-0.5 w-fit text-sm px-1`}>{props.tipo}</p>

    </>
  )
}

export default TipoDeTramite