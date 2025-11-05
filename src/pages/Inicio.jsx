import SectionTitle from '../components/SectionTitle';
import Carousel from '../components/CarouselInicio/Carousel';
import ReintegroCard from '../components/cards/cards/ReintegroCard';
import RecetaCard from '../components/cards/cards/RecetaCard';
import TurnosCard from '../components/cards/cards/TurnosCard';
import AutorizacionCard from '../components/cards/cards/AutorizacionCard';
import { Fragment } from 'react';
import { useGetUltimosTramites, useGetUltimosTurnos } from '../services/inicioQueries';
import { useUserStore } from '../store/userStore';
import { useNavigate } from 'react-router-dom';

function Inicio() {
  const navigate = useNavigate();
  const { user } = useUserStore(state => state);
  const { data: dataTurnos, error: errorTurnos, isLoading: isLoadingTurnos } = useGetUltimosTurnos(user.idAfiliado);
  const { data: dataTramites, error: errorTramites, isLoading: isLoadingTramites } = useGetUltimosTramites(user.idAfiliado);
  const turnos = dataTurnos?.dataTurnos || [];
  const tramites = dataTramites?.dataTramites || [];

  if (isLoadingTurnos || isLoadingTramites) return <p>Cargando...</p>;

  if (errorTurnos) {
    if (errorTurnos?.response?.status === 401) {
      navigate('/login', { state: { from: location }, replace: true });
      return null;
    }
    return <p>Error: {JSON.stringify(errorTurnos)}</p>;
  }

  if (errorTramites) {
    if (errorTramites?.response?.status === 401) {
      navigate('/login', { state: { from: location }, replace: true });
      return null;
    }
    return <p>Error: {JSON.stringify(errorTramites)}</p>;
  }

  const componentsCard = {
    receta: item => <RecetaCard receta={item} dashboard/>,
    reintegro: item => <ReintegroCard reintegro={item} dashboard/>,
    autorizacion: item => <AutorizacionCard autorizacion={item} dashboard/>
  };  

  let heightCarousel = turnos.length > 0 || tramites.length > 0 ? 'h-56' : 'h-[550px]';
  let tramitesStyles = tramites.filter(t => t != null).length % 2 != 0 ? "2xl:w-full" : "2xl:w-2/3";

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-2'>
        <SectionTitle>Próximos turnos</SectionTitle>
        <div className='w-full px-2 grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6'>
          {turnos.length ? (
            turnos.map((t, tIndex) => (
              <TurnosCard
                turno={t}
                key={tIndex}
                paciente={true}
                nombrePaciente={t.afiliado}
                idAfiliadoParaEliminar={t.idAfiliado}
                isPast={false}
              />
            ))
          ) : (
            <i>Sin contenido</i>
          )}
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <SectionTitle>Mis trámites</SectionTitle>
        <div className={`grid w-full ${tramitesStyles} grid-cols-[repeat(auto-fill,minmax(450px,1fr))]`}>
          {tramites ? (
            tramites?.map((t, indx) => {
              if(t) {
                const Component = componentsCard[t.tipo];
                return <Fragment key={indx}>{Component(t)}</Fragment>;
              }
              
            })
          ) : (
            <i>Sin contenido</i>
          )}
        </div>
      </div>

      <Carousel height={heightCarousel} />
    </div>
  );
}
export default Inicio;