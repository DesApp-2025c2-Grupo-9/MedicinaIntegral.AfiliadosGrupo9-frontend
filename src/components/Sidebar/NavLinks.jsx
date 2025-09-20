import { icons } from '../../utils/icons';
import SidebarLink from './SidebarLink';

const navLinks = [
  { icon: icons.inicio, description: 'Inicio' },
  { icon: icons.usuario, description: 'Mi cuenta' },
  { icon: icons.turnos, description: 'Turnos' },
  { icon: icons.reintegros, description: 'Reintegros' },
  { icon: icons.recetas, description: 'Recetas' },
  { icon: icons.autorizaciones, description: 'Autorizaciones' },
  { icon: icons.cartillaMedica, description: 'Cartilla Médica' },
];

function NavLinks() {
  return (
    <div className='flex flex-col items-start gap-5'>
      {
        navLinks.map((link, index) =>
          <SidebarLink
            key={index}
            icon={link.icon}
            description={link.description}
          />
        )
      }
    </div>
  )
}
export default NavLinks