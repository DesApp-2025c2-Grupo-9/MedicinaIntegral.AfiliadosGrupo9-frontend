import { icons } from '../../../../utils/icons'


function BotonPapelera(props) {
  //Se debe cargar la posición para que quede al final de la card
  return (
    <div >
      <button
        type='button'
        className='flex flex-row
                text-gray-600
                hover:bg-red-100
                hover:text-red-800
                rounded-tr-xl
                p-1 justify-end cursor-pointer
                transition-colors
                '
        onClick={props.onClick}
      >
        <span className='text-sm'>Eliminar</span>
        <span className='w-5 h-4'>{icons.papelera}</span>
      </button>
    </div>
  )
}

export default BotonPapelera