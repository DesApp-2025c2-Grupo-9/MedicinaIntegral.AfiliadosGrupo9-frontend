import clsx from 'clsx';
import LogoutButton from './LogoutButton';
import NavLinks from './NavLinks';
import { twMerge } from 'tailwind-merge';

function Sidebar({ className }) {
  return (
    <div
      className={twMerge(
        clsx('flex min-w-59 p-10 pr-0 flex-col justify-between items-start border border-gris-border bg-blanco-principal rounded-tr-lg shadow-custom-shadow', className, {
          'h-dvh': !className
        })
      )}
    >
      <NavLinks />
      <LogoutButton />
    </div>
  );
}
export default Sidebar;
