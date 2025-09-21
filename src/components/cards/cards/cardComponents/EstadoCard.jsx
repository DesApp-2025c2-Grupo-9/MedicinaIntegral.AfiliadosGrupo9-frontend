function EstadoCard(props) {
  const estiloExtra = props.dashboard ?
    'bg-white rounded-md p-0.5 shadow-md border border-gray-200' : ''

  return (
    <div className="col-start-2 row-start-2 justify-items-end text-sm ">
      {props.estado == "Aceptado" ? (
        <>
          <p className={`text-green-600 ${estiloExtra}`}>Aceptado</p>
        </>
      ) : props.estado == "Pendiente" ? (
        <>
          <p className={`text-yellow-600 ${estiloExtra}`}>Pendiente</p>
        </>
      ) : props.estado == 'Rechazado' ? (
        <>
          <p className={`text-red-600 ${estiloExtra}`}>Rechazado</p>
        </>
      ) : (
        <>
          <p className={`text-blue-600 ${estiloExtra}`}>Observación</p>
        </>
      )}
    </div>
  );
}

export default EstadoCard;
