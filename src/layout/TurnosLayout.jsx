import SectionTitle from '../components/SectionTitle';
import NavButton from '../components/NavButton';
import { icons } from '../utils/icons';
import SectionLayoutTemplate from './SectionLayoutTemplate';

function TurnosLayout() {
  return (
    <SectionLayoutTemplate
      sectionTitle={<SectionTitle>Turnos</SectionTitle>}
      navButtonA={
        <NavButton
          path='turnos-reservados'
          icon={icons.turnos}
          description='Ver turnos reservados'
        />
      }
      navButtonB={
        <NavButton
          path='solicitar-turno'
          icon={icons.agregar}
          description='Solicitar nuevo turno'
        />
      }
    />
  );
}
export default TurnosLayout;
