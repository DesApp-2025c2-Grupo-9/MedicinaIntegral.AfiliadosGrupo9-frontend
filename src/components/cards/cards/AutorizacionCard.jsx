import BotonEditar from "./cardComponents/BotonEditar";
import BotonPapelera from './cardComponents/BotonPapelera'
import BotonObservaciones from "./cardComponents/BotonObservaciones";
import ColumnaPrincipal from "./cardComponents/ColumnaPrincipal"
import EstadoVersion1 from "./cardComponents/EstadoVersion1";
import UsuarioActual from "./cardComponents/UsuarioActual";



function AutorizacionCard(props) {
  const autorizacion = props.autorizacion


let cardStyle = `grid grid-cols-2 m-3 p-3 bg-white rounded-xl shadow-md border border-gray-200 w-md`
  return (
    <div className={cardStyle}>
      <ColumnaPrincipal
      titulo = {autorizacion.especialidad}
      subtitulo = {autorizacion.medico}
      campo1 = {'Fecha prevista ' + formatFecha(autorizacion.fecha)}
      campo2 = {autorizacion.lugar}
      campo3 = {'Dias de internación: ' + autorizacion.diasInternacion + ' días'} 
      />
      <div className="grid grid-rows-4">
        <UsuarioActual/>
        <EstadoVersion1 estado = {autorizacion.estado}/>
        {
          autorizacion.estado == 'Pendiente' ? (
            <>
              <BotonEditar posicion={3}/>
              <BotonPapelera posicion = {4}/>
            </>
          ): <BotonObservaciones/>

        }

      </div>
      
    </div>
  )
}

function formatFecha(fecha) {
  //Recibe una fecha tipo Date como parámetro
  //Retorna un String para mostrar la fecha al usuario

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1)
  const anio = fecha.getFullYear();

  return `${dia}/${mes}/${anio}`
}

export default AutorizacionCard