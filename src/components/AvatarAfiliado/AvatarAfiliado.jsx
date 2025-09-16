import { useState } from 'react'
import ListaFamiliares from './ListaFamiliares'

function AvatarAfiliado() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <div className='flex items-center gap-2'>
        <div className='flex items-center justify-center w-9 aspect-square rounded-full bg-menta-500 text-blanco-principal text-xl font-bold uppercase text-center'>CB</div>
        <p className='uppercase text-center text-xl font-bold text-negro-principal'>Carolina</p>
        <div onClick={() => { setIsOpen(!isOpen) }} className='cursor-pointer select-none'>
          Placeholder
        </div>
      </div>
      {
        isOpen && <ListaFamiliares className={'absolute'} />
      }
    </div>
  )
}
export default AvatarAfiliado