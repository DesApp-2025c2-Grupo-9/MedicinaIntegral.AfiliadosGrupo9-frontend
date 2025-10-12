import { icons } from '../../../../utils/icons'


function BotonPapelera(props) {
  //Se debe cargar la posición para que quede al final de la card
  return (
    <div >
      <button
        type='button'
       className="flex flex-row
        text-gray-600
        hover:bg-red-100
        hover:text-red-800
        p-1
        px-3 justify-end cursor-pointer text-sm transition-colors
        rounded-full
         bg-red-50  border-s-gray-900 shadow-2xs 
         " 
        onClick={props.onClick}
        title='Eliminar'
      >
        <span className='text-sm'></span>
        <span className='w-5 h-4'>{icons.papelera}</span>
      </button>
    </div>
  )
}

export default BotonPapelera