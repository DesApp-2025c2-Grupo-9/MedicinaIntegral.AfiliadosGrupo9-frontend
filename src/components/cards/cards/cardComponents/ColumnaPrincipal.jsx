import React from 'react'
import Titulo from './Titulo'
import SubTitulo from './SubTitulo'
function ColumnaPrincipal(props) {
    return (
        <div className='grid grid-cols-1 grid-rows-6'>
            <Titulo titulo={props.titulo} />
            <SubTitulo subtitulo={props.subtitulo} />
            <p className='text-xs row-start-3'>{props.campo1}</p>
            <p className='text-xs row-start-4'>{props.campo2}</p>
            <p className='text-xs row-start-5'>{props.campo3}</p>
            <p className='text-xs row-start-6'>{props.campo4}</p>
        </div>
    )
}

export default ColumnaPrincipal