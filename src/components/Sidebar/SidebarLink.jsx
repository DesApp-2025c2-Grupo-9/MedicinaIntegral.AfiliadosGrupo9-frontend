import { cva } from 'class-variance-authority'
import { icons } from '../../utils/icons'
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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

function SidebarLink({ path, icon=icons.inicio, description='Description' }) {
  const location = useLocation();
  const isActive = location.pathname === path; // Basándonos en la URL actual, definiremos el valor de isActive
  
  return (
    <Link to={path} className={twMerge(variants({ state: isActive ? 'active' : 'idle' }))}>
      <div className='w-[22px] h-5 flex flex-col justify-center items-center'>{icon}</div>
      <p>{description}</p>
    </Link>
  )
}
export default SidebarLink