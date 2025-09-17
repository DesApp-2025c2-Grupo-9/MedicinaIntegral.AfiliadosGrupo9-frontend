import clsx from 'clsx';
import { icons } from '../../utils/icons';

function AfiliadoOption({ afiliado={ nombre: 'John', apellido: 'Doe' } }) {
  const isActive = false; // Basándonos en la URL actual, definiremos el valor de isActive

  return (
    <div className={clsx('flex gap-2 items-center hover:text-menta-200 cursor-pointer w-fit', {
      'text-negro-principal': !isActive,
      'text-menta-600': isActive
    })}>
      <div className='h-4 aspect-square flex items-center justify-center'>{icons.usuario}</div>
      <p className='text-sm'>{afiliado.nombre} {afiliado.apellido}</p>
    </div>
  )
}
export default AfiliadoOption