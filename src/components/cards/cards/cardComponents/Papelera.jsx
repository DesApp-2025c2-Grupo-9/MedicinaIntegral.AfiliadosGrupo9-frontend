import React from 'react'
import { icons } from '../../../../utils/icons'

function Papelera(props) {
  return (
    <div className='col-start-2 row-start-6 justify-items-end'>
                <button 
                className='flex flex-row text-red-500 hover:text-red-600 p-1 justify-end'
                onClick={props.onClick}
                >
                  <span className='w-5 h-4'>{icons.papelera}</span>
                </button>
              </div>
  )
}

export default Papelera