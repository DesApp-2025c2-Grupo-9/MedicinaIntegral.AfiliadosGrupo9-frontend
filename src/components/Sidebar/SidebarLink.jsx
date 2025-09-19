import { cva } from 'class-variance-authority'
import { icons } from '../../utils/icons'
import { twMerge } from 'tailwind-merge';

const variants = cva([
  'inline-flex justify-center items-center gap-2 select-none cursor-pointer'
], {
  variants: {
    state: {
      idle: ['text-negro-principal hover:text-menta-200'],
      active: ['text-menta-600']
    }
  },
  defaultVariants: {
    state: 'idle'
  }
});

function SidebarLink({ icon=icons.inicio, description='Description' }) {
  const isActive = false; // Basándonos en la URL actual, definiremos el valor de isActive
  
  return (
    <div className={twMerge(variants({ state: isActive ? 'active' : 'idle' }))}>
      <div className='w-[22px] h-5 flex flex-col justify-center items-center'>{icon}</div>
      <p>{description}</p>
    </div>
  )
}
export default SidebarLink