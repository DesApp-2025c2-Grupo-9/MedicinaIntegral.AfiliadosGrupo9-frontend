import { useState } from 'react'
import { icons } from '../../utils/icons'
import MenuButton from './MenuButton'
import clsx from 'clsx';
import AvatarAfiliado from '../AvatarAfiliado/AvatarAfiliado';
import LogoutButton from '../Sidebar/LogoutButton';
import NavLinks from '../Sidebar/NavLinks';

function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='flex flex-col items-center z-10 lg:hidden'>
      <MenuButton onClick={() => setMenuOpen(true)}>{icons.hamburgerMenu}</MenuButton>

      <div
        className={clsx('bg-blanco-principal flex w-dvw h-dvh py-5 pr-4 pl-10 flex-col justify-between items-start fixed top-0 transition-all', {
          'left-0': menuOpen,
          'left-[100dvw] opacity-0': !menuOpen
        })}
      >
        <div className='flex flex-col gap-5 self-stretch'>
          <MenuButton className='ml-auto' onClick={() => setMenuOpen(false)}>{icons.cerrar}</MenuButton>
          <AvatarAfiliado />
          <NavLinks onClick={() => setMenuOpen(false)} />
        </div>
        <LogoutButton />
      </div>
    </div>
  )
}
export default HamburgerMenu