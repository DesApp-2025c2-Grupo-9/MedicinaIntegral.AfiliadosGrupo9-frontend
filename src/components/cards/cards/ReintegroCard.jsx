
import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal"
import UsuarioActual from "./cardComponents/UsuarioActual"
import BotonEditar from "./cardComponents/BotonEditar"
import BotonPapelera from './cardComponents/BotonPapelera'
import BotonObservaciones from "./cardComponents/BotonObservaciones"
import EstadoVersion1 from "./cardComponents/EstadoVersion1"
function ReintegroCard(props) {
  //Estilo de la card
  
  let cardStyle = `grid grid-cols-2 m-3 p-3 bg-white rounded-xl shadow-md border border-gray-200 w-md`
  
  
  let reintegro = props.reintegro
  
  return (<div className={cardStyle}>
    <ColumnaPrincipal
      titulo = {reintegro.especialidad}
      subtitulo = {reintegro.medico}
      campo1 = {'Fecha de la prestación ' + formatFecha(reintegro.fecha)}
      campo2 = {reintegro.lugar}
      campo3 = {reintegro.valor}
    />
    <div className="grid grid-rows-4">

        <UsuarioActual />
        <EstadoVersion1 estado = {reintegro.estado}/>
        {reintegro.estado == 'Pendiente' ? (
          <>
            <BotonEditar posicion={3} />
            <BotonPapelera posicion={4} />
          </>
        ) : <BotonObservaciones/>
        }
      </div>
  </div>
  )
}

export default ReintegroCard

function formatFecha(fecha) {
  //Recibe una fecha tipo Date como parámetro
  //Retorna un String para mostrar la fecha al usuario

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1)
  const anio = fecha.getFullYear();

  const horas = String(fecha.getHours()).padStart(2, "0")
  const minutos = String(fecha.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${anio}`
}