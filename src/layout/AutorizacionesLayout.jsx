import SectionTitle from '../components/SectionTitle';
import NavButton from '../components/NavButton';
import { icons } from '../utils/icons';
import SectionLayoutTemplate from './SectionLayoutTemplate';
import { useLocation } from 'react-router-dom';
import { useAutorizacionStore } from '../store/autorizacionStore';
import { useEffect } from 'react';
import { useGetAfiliado } from '../services/queries';

function AutorizacionesLayout() {
  const location = useLocation();
  const setAutorizacion = useAutorizacionStore(state => state.setAutorizacion);
  const { data: afiliadoRes } = useGetAfiliado();
  const paraAfiliado = afiliadoRes?.data?.grupoFamiliar.length === 1 ? `${afiliadoRes?.data.nombre} ${afiliadoRes?.data.apellido}` : undefined;

  const pathDest = location.pathname === '/autorizaciones/ver-autorizaciones';

  useEffect(() => {
    if (pathDest) {
      setAutorizacion({ paraAfiliado });
    }
  }, [location, setAutorizacion, pathDest]);

  return (
    <SectionLayoutTemplate
      sectionTitle={<SectionTitle>Autorizaciones</SectionTitle>}
      navButtonA={
        <NavButton
          path='ver-autorizaciones'
          icon={icons.autorizaciones}
          description='Ver autorizaciones'
        />
      }
      navButtonB={
        <NavButton
          path='solicitar-autorizacion'
          icon={icons.agregar}
          description='Solicitar nueva autorización'
        />
      }
    />
  );
}
export default AutorizacionesLayout;
