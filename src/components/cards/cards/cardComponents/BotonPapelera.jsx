import { icons } from '../../../../utils/icons'

function Papelera(props) {
  //Se debe cargar la posición para que quede al final de la card
  let posicion = `col-start-2 row-start-${props.posicion} justify-items-end`
  return (
    <div className={posicion}>
                <button 
                className='flex flex-row text-red-500 hover:text-red-600 p-1 justify-end'
                onClick={props.onClick}
                >
                  <span className='text-xs mr-1'>Cancelar</span>
                  <span className='w-5 h-4'>{icons.papelera}</span>
                </button>
              </div>
  )
}

export default Papelera