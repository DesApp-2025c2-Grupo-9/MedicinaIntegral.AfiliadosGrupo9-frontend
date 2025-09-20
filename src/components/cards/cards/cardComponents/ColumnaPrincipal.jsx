function ColumnaPrincipal({children, campos}) {
  //Las rows son los campos adicionales, se suman 2 por el título y el subtitulo
  let gridStyle = `grid grid-cls-1 grid-rows-${campos + 2}`;
  return (
    <div className={gridStyle}>
      {children}
    </div>
  );
}

export default ColumnaPrincipal;
