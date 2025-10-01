function MarcoCard({ children, estilo = "" }) {
  //Marco con el estilo por defecto de las cards

  return (
    <div
      className={`grid m-3 p-3 bg-blanco-principal rounded-xl shadow-custom-shadow border border-gris-border ${estilo}`}
    >
      {children}
    </div>
  );
}

export default MarcoCard;
