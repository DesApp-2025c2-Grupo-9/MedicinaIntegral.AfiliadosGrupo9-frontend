import { useState } from 'react'
import ListaFamiliares from './ListaFamiliares'
import clsx from 'clsx';
import { icons } from '../../utils/icons';

function AvatarAfiliado() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative flex flex-col justify-center items-start lg:items-end gap-2 w-60'>

      <div onClick={() => { setIsOpen(!isOpen) }} className='flex items-center gap-2 cursor-pointer select-none'>
        <div className='flex items-center justify-center w-9 aspect-square rounded-full bg-menta-600 text-blanco-principal text-xl font-bold uppercase text-center'>CB</div>
        <p className='uppercase text-center text-xl font-bold text-negro-principal'>Carolina</p>
        <div className={clsx('w-[14px] transition-all text-negro-principal', { 'rotate-90': !isOpen, 'rotate-0': isOpen })}>
          {icons.chevronDown}
        </div>
      </div>

      <ListaFamiliares className={clsx('lg:absolute transition-all', {
        'absolute -top-45 opacity-0': !isOpen,
        'top-11 opacity-100': isOpen
      })} />
      
    </div>
  )
}
export default AvatarAfiliado