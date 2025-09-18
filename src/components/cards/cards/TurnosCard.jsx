import { icons } from '../../../utils/icons'
import ColumnaPrincipal from './cardComponents/ColumnaPrincipal'
import Papelera from './cardComponents/Papelera'
import UsuarioActual from './cardComponents/UsuarioActual'
function TurnosCard(props) {
  let turno = props.turno
  let paciente = 'Jane Doe'
  const papeleraOnClick = () => {
    alert('Boton apretado')
  }


  return (
    //Card
    <div className='grid grid-cols-2 grid-rows-1 m-3 p-4 bg-white rounded-xl shadow-md border border-gray-200 max-w-md min-w-sm'>
      {/*columna datos del turno*/}
      <ColumnaPrincipal
        titulo={turno.especialidad}
        subtitulo={turno.profesional}
        campo1={formatFecha(turno.fecha)}
        campo2={turno.lugar}
        campo3={turno.direccion}
        campo4={turno.telefono}
      />
      {/*Columna derecha si tiene turno asignado*/}
      {
        paciente ? (
          <div className='grid grid-rows-6'>
          <UsuarioActual/>
          <Papelera onClick={papeleraOnClick}/>
          </div>
        ): <></>
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
