import { useState } from 'react'
import ListaFamiliares from './ListaFamiliares'
import clsx from 'clsx';

function AvatarAfiliado() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative flex flex-col justify-center items-start lg:items-end gap-2 w-60'>

      <div onClick={() => { setIsOpen(!isOpen) }} className='flex items-center gap-2 cursor-pointer select-none'>
        <div className='flex items-center justify-center w-9 aspect-square rounded-full bg-menta-500 text-blanco-principal text-xl font-bold uppercase text-center'>CB</div>
        <p className='uppercase text-center text-xl font-bold text-negro-principal'>Carolina</p>
        <div className={clsx('transition-all', { 'rotate-90': !isOpen, 'rotate-0': isOpen })}>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L13 1" stroke="#3F4041" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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