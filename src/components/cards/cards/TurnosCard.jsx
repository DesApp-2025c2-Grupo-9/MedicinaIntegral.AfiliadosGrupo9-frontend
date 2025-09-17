import { icons } from '../../../utils/icons'
function TurnosCard() {
  let turno = {
    especialidad: 'Oftalmologia',
    profesional: 'Tita Merello',
    fecha: '12/12/2025 - 17:00 hs',
    lugar: 'Centro Medicina Integral',
    dirreccion: 'Av. Santa Rosa 300, Castelar',
    telefono: '1134759678'

  }
  let paciente = {
    nombre: "Victor Ricardo Gonzalvez Chara"
  }

  return (
    //Card
    <div className='grid grid-cols-2 grid-rows-6 m-3 p-4 bg-white rounded-xl shadow-md border border-gray-200  max-h-min min-w-min'>
      {/*columna datos del turno*/}
      
        <h3 className='col-start-1 row-start-1 font-bold text-m text-gray-700'>{turno.especialidad}</h3>
        <p className='col-start-1 row-start-2'>{turno.profesional}</p>
        <p className='col-start-1 row-start-3'>{turno.fecha}</p>
        <p className='col-start-1 row-start-4'>{turno.lugar}</p>
        <p className='col-start-1 row-start-5'>{turno.dirreccion}</p>
        <p className='col-start-1 row-start-6'>{turno.telefono}</p>
      
      {/*Columna derecha */}
      
        {/*usuario */}
        <div className='col-start-2 row-start-1 row-end-3 flex text-sm text-gray-600'>
          <span className='w-4 h-4 mr-1'>
            {icons.usuario}
          </span>
          <span>Para {paciente.nombre}</span>
        </div>
        {/*Icono eliminar*/}
        <div className='col-sart-2 row-start-6 items-end'>
          <button className='flex flex-row text-red-500 hover:text-red-600 p-1'>
            <span className='w-5 h-4'>{icons.papelera}</span>
            <span className='text-sm'>Cancelar turno</span>
          </button>
        </div>
        
      
    </div>

  )
}

export default TurnosCard