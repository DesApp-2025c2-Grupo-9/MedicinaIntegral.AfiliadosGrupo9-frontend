import { icons } from '../../utils/icons'
import LogoutButton from './LogoutButton'
import SidebarLink from './SidebarLink'

function Sidebar() {
  return (
    <div className='flex w-59 h-dvh p-10 pr-0 flex-col justify-between items-start rounded-lg border border-gris-border bg-blanco-principal shadow-custom-shadow'>
      <div className='flex flex-col items-start gap-5'>
        <SidebarLink description='Inicio' />
        <SidebarLink icon={icons.usuario} description='Mi cuenta' />
        <SidebarLink icon={icons.turnos} description='Turnos' />
        <SidebarLink icon={icons.reintegros} description='Reintegros' />
        <SidebarLink icon={icons.recetas} description='Recetas' />
        <SidebarLink icon={icons.autorizaciones} description='Autorizaciones' />
        <SidebarLink icon={icons.cartillaMedica} description='Cartilla médica' />
      </div>
      <LogoutButton />
    </div>
  )
}
export default Sidebar