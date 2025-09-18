import { icons } from '../../../utils/icons'
import ColumnaPrincipal from './cardComponents/ColumnaPrincipal'
import BotonPapelera from './cardComponents/BotonPapelera'
import UsuarioActual from './cardComponents/UsuarioActual'
function TurnosCard(props) {
  let turno = props.turno
  let paciente = 'Victor'
  const papeleraOnClick = () => {
    alert('Boton apretado')
  }
  let columns = paciente ? 2 : 1
  let ancho = paciente ? 'max-w-md min-w-sm' : 'w-xs'
  let cardStyle = `grid grid-cols-${columns} m-3 p-3 bg-white rounded-xl shadow-md border border-gray-200 ${ancho}`


  return (
    //Card
    <div className={cardStyle}>
      {/*columna datos del turno*/}
      <ColumnaPrincipal
        titulo={turno.especialidad}
        subtitulo={turno.profesional}
        campo1={formatFecha(turno.fecha)}
        campo2={turno.lugar}
        campo3={turno.direccion}
        campo4={turno.telefono}
        campos = {4}
      />
      {/*Columna derecha si tiene turno asignado*/}
      {
        paciente ? (
          <div className='grid grid-rows-6'>
            <UsuarioActual />
            <BotonPapelera onClick={papeleraOnClick} posicion={6}/>
          </div>
        ) : <></>
      }
    </div>

  )
}

export default TurnosCard


function formatFecha(fecha) {
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1)
  const anio = fecha.getFullYear();

  const horas = String(fecha.getHours()).padStart(2, "0")
  const minutos = String(fecha.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${anio} - ${horas}:${minutos}`
}
