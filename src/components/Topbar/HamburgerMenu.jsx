import { useState } from 'react';
import { icons } from '../../utils/icons';
import MenuButton from './MenuButton';
import clsx from 'clsx';
import AvatarAfiliado from '../AvatarAfiliado/AvatarAfiliado';
import LogoutButton from '../Sidebar/LogoutButton';
import NavLinks from '../Sidebar/NavLinks';
import Separador from '../Separador';

function HamburgerMenu() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
    <div className='flex flex-col items-center z-10 lg:hidden'>
      <MenuButton onClick={() => setIsHamburgerOpen(true)}>{icons.hamburgerMenu}</MenuButton>

      <div
        className={clsx('bg-fondo-documento flex w-dvw h-dvh p-8 flex-col justify-between items-start fixed top-0 transition-all', {
          'left-0 overflow-y-scroll': isHamburgerOpen,
          'left-[100dvw] opacity-0': !isHamburgerOpen
        })}
      >
        <div className='flex flex-col self-stretch h-full gap-8 overflow-y-scroll no-scrollbar'>
          <div className='ml-auto border border-negro-principal rounded-full p-3 mb-8'>
            <MenuButton onClick={() => setIsHamburgerOpen(false)}>{icons.cerrar}</MenuButton>
          </div>
          <div className='mx-auto w-full max-w-[84%] p-2 bg-menta-100 rounded-4xl'>
            <AvatarAfiliado setIsHamburgerOpen={setIsHamburgerOpen} />
          </div>
          <Separador className='w-full max-w-[84%] mx-auto' />
          <NavLinks onClick={() => setIsHamburgerOpen(false)} />
          <LogoutButton className='w-fit aspect-auto uppercase font-bold underline text-menta-600 mt-auto mx-auto'>Cerrar sesión</LogoutButton>
        </div>
      </div>
    </div>
  );
}
export default HamburgerMenu;
