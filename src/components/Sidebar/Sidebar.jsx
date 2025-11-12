import clsx from 'clsx';
import LogoutButton from './LogoutButton';
import NavLinks from './NavLinks';
import { twMerge } from 'tailwind-merge';

function Sidebar({ className }) {
  return (
    <div
      className={twMerge(
        clsx('flex min-w-59 p-10 flex-col justify-between border-t border-r border-gris-border rounded-tr-lg shadow-custom-shadow bg-blanco-principal', className, {
          'h-dvh': !className
        })
      )}
    >
      <div className='min-h-[calc(100dvh-162px)] flex flex-col justify-between sticky top-10'>
        <NavLinks />
      </div>
      <LogoutButton className='sticky bottom-10' />
    </div>
  );
}
export default Sidebar;
