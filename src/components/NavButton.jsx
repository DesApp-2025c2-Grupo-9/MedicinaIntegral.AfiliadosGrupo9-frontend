import { icons } from '../utils/icons';
import { cva } from 'class-variance-authority';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { usePathPartials } from '../hooks/usePathPartials';
import clsx from 'clsx';

const variants = cva(['p-3 inline-flex min-w-28 h-[41px] justify-center items-center gap-3 shadow-custom-shadow rounded-lg border'], {
  variants: {
    state: {
      idle: ['border-gris-border bg-blanco-principal hover:text-menta-200 cursor-pointer hover:border-menta-200'],
      active: ['bg-menta-600 text-blanco-principal border-menta-600']
    }
  },
  defaultVariants: {
    state: 'idle'
  }
});

function NavButton({ icon = icons.inicio, description = 'Description', path = '/', pathPartials }) {
  const auxArr = pathPartials ? pathPartials : [path];
  const isActive = usePathPartials(auxArr);

  return (
    <NavLink
      to={path}
      className={twMerge(clsx(variants({ state: isActive ? 'active' : 'idle' }), { 'pointer-events-none': isActive }))}
    >
      <div className='flex w-4 aspect-square flex-col justify-center items-center'>{icon}</div>
      <p className='text-center text-sm'>{description}</p>
    </NavLink>
  );
}
export default NavButton;
