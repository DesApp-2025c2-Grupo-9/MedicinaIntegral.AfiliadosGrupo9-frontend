
import Titulo from './Titulo'
import SubTitulo from './SubTitulo'
function ColumnaPrincipal(props) {
    //Las rows son los campos adicionales, se suman 2 por el título y el subtitulo
    let rows = props.campos + 2
    let gridStyle = `grid grid-cls-1 grid-rows-${rows}`
    return (
        <div className= {gridStyle}>
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