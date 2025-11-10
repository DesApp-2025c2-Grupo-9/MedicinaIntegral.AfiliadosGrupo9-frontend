import { twMerge } from 'tailwind-merge';
import { icons } from '../../utils/icons';
import SidebarLink from './SidebarLink';

const navLinks = [
  { icon: icons.inicio, description: 'Inicio', path: '/' },
  { icon: icons.usuario, description: 'Mi cuenta', path: '/mi-cuenta', pathPartials: ['mi-cuenta'] },
  { icon: icons.turnos, description: 'Turnos', path: '/turnos/turnos-reservados', pathPartials: ['turnos'] },
  { icon: icons.reintegros, description: 'Reintegros', path: '/reintegros/historial-reintegros', pathPartials: ['reintegros'] },
  { icon: icons.recetas, description: 'Recetas', path: '/recetas/ver-recetas', pathPartials: ['recetas'] },
  { icon: icons.autorizaciones, description: 'Autorizaciones', path: '/autorizaciones/ver-autorizaciones', pathPartials: ['autorizaciones'] },
  { icon: icons.cartillaMedica, description: 'Cartilla Médica', path: '/cartilla-medica', pathPartials: ['cartilla-medica'] }
];

function NavLinks({ className, onClick }) {
  return (
    <div className={twMerge('flex flex-col items-center lg:items-start gap-5', className)}>
      {navLinks.map((link, index) => (
        <SidebarLink
          key={index}
          path={link.path}
          icon={link.icon}
          description={link.description}
          onClick={onClick}
          pathPartials={link.pathPartials}
        />
      ))}
    </div>
  );
}
export default NavLinks;
