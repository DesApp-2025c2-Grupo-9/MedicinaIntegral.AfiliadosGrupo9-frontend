import SectionTitle from '../components/SectionTitle';
import NavButton from '../components/NavButton';
import { icons } from '../utils/icons';
import SectionLayoutTemplate from './SectionLayoutTemplate';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNuevoReintegroStore } from '../store/nuevoReintegroStore';

function ReintegrosLayout() {
  const location = useLocation();
  const setData = useNuevoReintegroStore(state => state.setData);

  useEffect(() => {
    if (location.pathname !== '/reintegros/solicitar-reintegro' && location.pathname !== '/reintegros/datos-factura') {
      setData({});
    }
  }, [setData, location]);

  return (
    <SectionLayoutTemplate
      sectionTitle={<SectionTitle>Reintegros</SectionTitle>}
      navButtonA={
        <NavButton
          path='historial-reintegros'
          icon={icons.reintegros}
          description='Historial de reintegros'
        />
      }
      navButtonB={
        <NavButton
          path='solicitar-reintegro'
          icon={icons.agregar}
          description='Solicitar nuevo reintegro'
        />
      }
    />
  );
}
export default ReintegrosLayout;
