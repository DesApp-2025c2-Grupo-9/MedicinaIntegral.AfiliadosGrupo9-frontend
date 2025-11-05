import { cva } from 'class-variance-authority';
import { icons } from '../../utils/icons';
import { twMerge } from 'tailwind-merge';
import { Link, useLocation } from 'react-router-dom';
import { usePathPartials } from '../../hooks/usePathPartials';

const variants = cva(['inline-flex justify-center items-center gap-2 select-none cursor-pointer'], {
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

function SidebarLink({ path, icon = icons.inicio, description = 'Description', onClick, pathPartials = [] }) {
  const location = useLocation();
  const isActive = usePathPartials(pathPartials) || (location.pathname === '/' && path === '/');

  return (
    <Link
      to={path}
      onClick={onClick}
      className={twMerge(variants({ state: isActive ? 'active' : 'idle' }))}
    >
      <div className='w-[22px] h-5 flex flex-col justify-center items-center'>{icon}</div>
      <p>{description}</p>
    </Link>
  );
}
export default SidebarLink;
