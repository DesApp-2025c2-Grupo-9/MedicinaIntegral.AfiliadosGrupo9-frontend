import LogoutButton from './LogoutButton'
import NavLinks from './NavLinks'

function Sidebar() {
  return (
    <div className='flex w-59 h-dvh p-10 pr-0 flex-col justify-between items-start border border-gris-border bg-blanco-principal rounded-lg shadow-custom-shadow'>
      <NavLinks />
      <LogoutButton />
    </div>
  )
}
export default Sidebar