import AvatarAfiliado from '../AvatarAfiliado/AvatarAfiliado'
import HamburgerMenu from './HamburgerMenu'
import MainLogo from './MainLogo'

function Topbar({ className }) {
  return (
    <div className={`flex justify-between items-center px-4 lg:px-10 py-3 w-dvw border-b border-gris-border bg-blanco-principal shadow-custom-shadow ${className}`}>
      <MainLogo />
      <AvatarAfiliado className='hidden lg:flex z-10' />
      <HamburgerMenu />
    </div>
  )
}
export default Topbar