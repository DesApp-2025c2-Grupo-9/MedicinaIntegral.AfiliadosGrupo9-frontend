function EstadoCard(props) {
  return (
    <div className="col-start-2 row-start-2 justify-items-end text-xs">
      {props.estado == "Aceptado" ? (
        <>
          <p className="text-green-600">Aceptado</p>
        </>
      ) : props.estado == "Pendiente" ? (
        <>
          <p className="text-yellow-600">Pendiente</p>
        </>
      ) : (
        <>
          <p className="text-red-600">Rechazado/Observación</p>
        </>
      )}
    </div>
  );
}

export default EstadoCard;
