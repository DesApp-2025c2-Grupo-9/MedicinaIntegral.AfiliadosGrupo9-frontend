import { cva } from 'class-variance-authority';
import { icons } from '../../utils/icons';
import { twMerge } from 'tailwind-merge';
import { Link, useLocation } from 'react-router-dom';
import { usePathPartials } from '../../hooks/usePathPartials';
import clsx from 'clsx';

const variants = cva(['inline-flex lg:justify-center items-center gap-2 select-none cursor-pointer p-2 pr-8 lg:p-0 rounded-full lg:rounded-none w-full max-w-[84%] min-w-fit'], {
  variants: {
    state: {
      idle: ['text-negro-principal hover:text-menta-200 transition-all bg-menta-100 lg:bg-inherit'],
      active: ['text-blanco-principal bg-menta-600 lg:text-menta-600 lg:bg-inherit cursor-default']
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
      <div
        className={clsx('flex items-center justify-center p-3 lg:p-0 rounded-full bg-blanco-principal lg:bg-inherit', {
          'text-menta-600': isActive
        })}
      >
        <div className='w-[22px] h-5 flex flex-col justify-center items-center'>{icon}</div>
      </div>
      <p className='mx-auto w-full text-center lg:text-left uppercase lg:normal-case font-bold lg:font-semibold'>{description}</p>
    </Link>
  );
}
export default SidebarLink;
