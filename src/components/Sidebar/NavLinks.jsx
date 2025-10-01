import { icons } from '../../utils/icons';
import SidebarLink from './SidebarLink';

const navLinks = [
  { icon: icons.inicio, description: 'Inicio', path: '/' },
  { icon: icons.usuario, description: 'Mi cuenta', path: '/mi-cuenta' },
  { icon: icons.turnos, description: 'Turnos', path: '/turnos/turnos-reservados' },
  { icon: icons.reintegros, description: 'Reintegros', path: '/reintegros/historial-reintegros' },
  { icon: icons.recetas, description: 'Recetas', path: '/recetas/ver-recetas' },
  { icon: icons.autorizaciones, description: 'Autorizaciones', path: '/autorizaciones/ver-autorizaciones' },
  { icon: icons.cartillaMedica, description: 'Cartilla Médica', path: '/cartilla-medica' },
];

function NavLinks({ onClick }) {
  return (
    <div className='flex flex-col items-start gap-5'>
      {
        navLinks.map((link, index) =>
          <SidebarLink
            key={index}
            path={link.path}
            icon={link.icon}
            description={link.description}
            onClick={onClick}
          />
        )
      }
    </div>
  )
}
export default NavLinks