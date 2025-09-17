import { icons } from '../../../utils/icons'
function TurnosCard(props) {
  let turno = props.turno
  let paciente = props.paciente



  return (
    //Card
    <div className='grid grid-cols-2grid-rows-6 m-3 p-4 bg-white rounded-xl shadow-md border border-gray-200 max-h-min max-w-[470px]'>
      {/*columna datos del turno*/}
      <h3 className='col-start-1 row-start-1 font-bold text-m text-gray-700 '>{turno.especialidad}</h3>
      <p className='col-start-1 row-start-2'>{turno.profesional}</p>
      <p className='col-start-1 row-start-3'>{formatFecha(turno.fecha)}</p>
      <p className='col-start-1 row-start-4'>{turno.lugar}</p>
      <p className='col-start-1 row-start-5'>{turno.direccion}</p>
      <p className='col-start-1 row-start-6'>{turno.telefono}</p>
      

      {/*Columna derecha si tiene turno asignado*/}
      {
        paciente ? <>
          {/*usuario */}
          <div className='col-start-2 row-start-1 row-end-3 flex text-sm text-gray-600 justify-end'>
            <span className='w-4 h-4 mr-1'>
              {icons.usuario}
            </span>
            <span>Para {paciente}</span>
          </div>
          {/*Icono eliminar*/}
          <div className='col-sart-2 row-start-6 justify-items-end'>
            <button className='flex flex-row text-red-500 hover:text-red-600 p-1 justify-end'>
              <span className='w-5 h-4'>{icons.papelera}</span>
              <span className='text-sm'>Cancelar turno</span>
            </button>
          </div>
        </>
          : <>
          </>
      }
    </div>

  )
}

export default TurnosCard


function formatFecha(fecha) {
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1)
    const anio = fecha.getFullYear();

    const horas = String(fecha.getHours()).padStart(2,"0")
    const minutos = String(fecha.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${anio} - ${horas}:${minutos}`
}
