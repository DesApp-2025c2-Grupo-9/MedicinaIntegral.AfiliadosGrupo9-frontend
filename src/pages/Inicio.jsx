import SectionTitle from '../components/SectionTitle';
import Carousel from '../components/CarouselInicio/Carousel';
import ReintegroCard from '../components/cards/cards/ReintegroCard';
import RecetaCard from '../components/cards/cards/RecetaCard';
import TurnosCard from '../components/cards/cards/TurnosCard';
import AutorizacionCard from '../components/cards/cards/AutorizacionCard';
import { Fragment } from 'react';
import { useGetUltimosTramites, useGetUltimosTurnos } from '../services/inicioQueries';
import { useUserStore } from '../store/userStore';
import InicioSkeleton from '../components/Skeletons/InicioSkeleton';
import NoTurnosAvailable from '../components/NoTurnosAvailable';
import { icons } from '../utils/icons';
import { Link } from 'react-router-dom';

function Inicio() {
  const { user } = useUserStore(state => state);
  const { data: dataTurnos, isLoading: isLoadingTurnos } = useGetUltimosTurnos(user.idAfiliado);
  const { data: dataTramites, isLoading: isLoadingTramites } = useGetUltimosTramites(user.idAfiliado);
  const turnos = dataTurnos?.dataTurnos || [];
  const tramites = dataTramites?.dataTramites || [];

  if (isLoadingTurnos || isLoadingTramites) return <InicioSkeleton />;

  const componentsCard = {
    receta: item => <RecetaCard receta={item} dashboard/>,
    reintegro: item => <ReintegroCard reintegro={item} dashboard/>,
    autorizacion: item => <AutorizacionCard autorizacion={item} dashboard/>
  };  

  let heightCarousel = turnos.length > 0 || tramites.length > 0 ? 'h-56' : 'h-[550px]';
  let tramitesStyles = tramites.filter(t => t != null).length % 2 != 0 ? "2xl:w-full" : "2xl:w-2/3";

  return (
    <div className='flex flex-col gap-5 lg:max-w-[calc(100dvw-296px)] mb-4'>
      <div className='flex flex-col gap-2'>
        <SectionTitle>Próximos Turnos</SectionTitle>
        <div className={`w-full grid ${turnos.length ? 'grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-3' : ''} `}>
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
            <NoTurnosAvailable path='turnos/solicitar-turno'/>
          )}
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <SectionTitle>Trámites</SectionTitle>
        <div className={`w-full ${tramitesStyles} ${tramites.length ? 'grid grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-3' : ''} `}>
          {tramites.length ? (
            tramites?.map((t, indx) => {
              if(t) {
                const Component = componentsCard[t.tipo];
                return <Fragment key={indx}>{Component(t)}</Fragment>;
              }
            })
          ) : (
              <div className='flex gap-4 text-gris-placeholder'>
                <div className='w-full max-w-20'>{icons.noTramites}</div>
                <div className='font-bold flex flex-col gap-1'>
                  <p>No tiene ninguna solicitud de trámite.</p>
                  <div className='flex flex-col lg:flex-row gap-2'>
                    <Link
                      to='/reintegros/solicitar-reintegro'
                      className='cursor-pointer border border-blue-500 text-blue-500 p-2 rounded-lg lg:w-fit lg:hover:bg-blue-200 text-center max-w-52'
                    >
                      Solicitar Reintegro
                    </Link>
                    <Link
                      to='/recetas/solicitar-receta'
                      className='cursor-pointer border border-menta-600 text-menta-600 p-2 rounded-lg lg:w-fit lg:hover:bg-menta-100 text-center max-w-52'
                    >
                      Solicitar Receta
                    </Link>
                    <Link
                      to='/autorizaciones/solicitar-autorizacion'
                      className='cursor-pointer border border-[#FD7400] text-[#FD7400] p-2 rounded-lg lg:w-fit lg:hover:bg-orange-100 text-center max-w-52'
                    >
                      Solicitar Autorización
                    </Link>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
      <Carousel height={heightCarousel} />
    </div>
  );
}
export default Inicio;