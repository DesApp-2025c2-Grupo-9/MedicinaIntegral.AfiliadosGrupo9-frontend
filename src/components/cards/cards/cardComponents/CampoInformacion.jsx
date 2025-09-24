function CampoInformacion({ children, campo }) {
  //El número de campo es el que va a determinar en que posición se ubica en la tarjeta
  //Se suma 2 ya que las primeras 2 row son para Título y Subtiulo de la card
  const numeroDeCampo = campo + 2;
  //Children es el texto que va a contener
  return <p className={`text-xs`}>{children}</p>;
}

export default CampoInformacion;
