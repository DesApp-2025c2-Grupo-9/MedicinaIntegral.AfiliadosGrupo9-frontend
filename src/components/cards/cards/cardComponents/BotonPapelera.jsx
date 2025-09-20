import { icons } from '../../../../utils/icons'

const rowClasses = {
  1: 'row-start-1',
  2: 'row-start-2',
  3: 'row-start-3',
  4: 'row-start-4',
  5: 'row-start-5',
  6: 'row-start-6',
};

function BotonPapelera(props) {
  //Se debe cargar la posición para que quede al final de la card
  let row = rowClasses[props.posicion]
  let posicion = `col-start-2 ${row} justify-items-end`
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

export default BotonPapelera