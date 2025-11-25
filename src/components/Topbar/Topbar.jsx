import AvatarAfiliado from '../AvatarAfiliado/AvatarAfiliado';
import HamburgerMenu from './HamburgerMenu';
import MainLogo from './MainLogo';
import { twMerge } from 'tailwind-merge';
import GenErrorBoundary from '../ErrorBoundaries/GenErrorBoundary';
import AvatarAfiliadoFallback from '../ErrorFallbacks/AvatarAfiliadoFallback';

function Topbar({ className }) {
  return (
    <div
      className={twMerge('flex justify-between items-center px-4 lg:px-10 py-3 w-full lg:w-dvw border-b border-gris-border bg-blanco-principal shadow-custom-shadow', className)}
    >
      <MainLogo />
      <GenErrorBoundary FallbackComponent={AvatarAfiliadoFallback}>
        <AvatarAfiliado className='hidden lg:flex z-10' />
      </GenErrorBoundary>
      <HamburgerMenu />
    </div>
  );
}
export default Topbar;
