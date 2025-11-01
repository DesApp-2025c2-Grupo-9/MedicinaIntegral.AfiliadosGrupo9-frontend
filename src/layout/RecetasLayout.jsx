import SectionTitle from '../components/SectionTitle';
import NavButton from '../components/NavButton';
import { icons } from '../utils/icons';
import SectionLayoutTemplate from './SectionLayoutTemplate';

function RecetasLayout() {
  return (
    <SectionLayoutTemplate
      sectionTitle={<SectionTitle>Recetas</SectionTitle>}
      navButtonA={
        <NavButton
          path='ver-recetas'
          icon={icons.recetas}
          description='Ver recetas'
        />
      }
      navButtonB={
        <NavButton
          path='solicitar-receta'
          icon={icons.agregar}
          description='Solicitar nueva receta'
        />
      }
    />
  );
}
export default RecetasLayout;
