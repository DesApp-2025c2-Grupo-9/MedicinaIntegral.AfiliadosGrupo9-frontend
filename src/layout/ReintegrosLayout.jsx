import SectionTitle from '../components/SectionTitle';
import NavButton from '../components/NavButton';
import { icons } from '../utils/icons';
import SectionLayoutTemplate from './SectionLayoutTemplate';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useReintegroStore } from '../store/reintegroStore';
import { useGetAfiliado } from '../services/queries';

function ReintegrosLayout() {
  const location = useLocation();
  const setReintegro = useReintegroStore(state => state.setReintegro);
  const { data } = useGetAfiliado();
  const paraAfiliado = data?.data?.grupoFamiliar?.length === 1 ? `${data?.data?.nombre} ${data?.data?.apellido}` : undefined;

  const pathDest =
    location.pathname !== '/reintegros/solicitar-reintegro' &&
    location.pathname !== '/reintegros/datos-factura' &&
    location.pathname !== '/reintegros/editar-reintegro' &&
    location.pathname !== '/reintegros/editar-reintegro/datos-factura';

  useEffect(() => {
    if (pathDest) {
      console.log('Para afiliado:', paraAfiliado);
      setReintegro({ paraAfiliado });
    }
  }, [location, setReintegro, pathDest]);

  return (
    <SectionLayoutTemplate
      sectionTitle={<SectionTitle>Reintegros</SectionTitle>}
      navButtonA={
        <NavButton
          path='historial-reintegros'
          icon={icons.reintegros}
          description='Historial de reintegros'
          pathPartials={['historial-reintegros']}
        />
      }
      navButtonB={
        <NavButton
          path='solicitar-reintegro'
          icon={icons.agregar}
          description='Solicitar nuevo reintegro'
          pathPartials={['reintegros/solicitar-reintegro', 'reintegros/datos-factura']}
        />
      }
    />
  );
}
export default ReintegrosLayout;
