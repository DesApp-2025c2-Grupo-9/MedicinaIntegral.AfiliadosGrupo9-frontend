import SectionTitle from "../components/SectionTitle";
import NavButton from "../components/NavButton";
import { icons } from "../utils/icons";
import SectionLayoutTemplate from './SectionLayoutTemplate';

function AutorizacionesLayout() {
  return (
    <SectionLayoutTemplate
      sectionTitle={<SectionTitle>Autorizaciones</SectionTitle>}
      navButtonA={<NavButton path='ver-autorizaciones' icon={icons.autorizaciones} description='Ver autorizaciones' />}
      navButtonB={<NavButton path='solicitar-autorizacion' icon={icons.agregar} description='Solicitar nueva autorización' />}
    />
  );
}
export default AutorizacionesLayout;