import SectionTitle from "../components/SectionTitle";
import NavButton from "../components/NavButton";
import { icons } from "../utils/icons";
import SectionLayoutTemplate from './SectionLayoutTemplate';

function ReintegrosLayout() {
  return (
    <SectionLayoutTemplate
      sectionTitle={<SectionTitle>Reintegros</SectionTitle>}
      navButtonA={<NavButton path='historial-reintegros' icon={icons.reintegros} description='Historial de reintegros' />}
      navButtonB={<NavButton path='solicitar-reintegro' icon={icons.agregar} description='Solicitar nuevo reintegro' />}
    />
  );
}
export default ReintegrosLayout;