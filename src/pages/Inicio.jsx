import SectionTitle from '../components/SectionTitle';
import Carousel from '../components/CarouselInicio/Carousel';
import ReintegroCard from '../components/cards/cards/ReintegroCard';
import RecetaCard from '../components/cards/cards/RecetaCard';
import TurnosCard from '../components/cards/cards/TurnosCard';
import AutorizacionCard from '../components/cards/cards/AutorizacionCard';
import { useState, useEffect, Fragment } from 'react';

function Inicio() {
  const [turnos, setTurnos] = useState([]);
  const [variado, setVariado] = useState([]);
  let heightCarousel = turnos.length > 0 || variado.length > 0 ? 'h-56' : 'h-[550px]';

  const componentsCard = {
    receta: item => <RecetaCard receta={item} />,
    reintegro: item => <ReintegroCard reintegro={item} />,
    autorizacion: item => <AutorizacionCard autorizacion={item} />
  };

  useEffect(() => {
    const turnosFiltrados = arrayTurnos.filter(t => t.estado == 'aceptado');
    setTurnos(turnosFiltrados);
    const variadoFiltrado = arrayVariado.filter(v => v.estado == 'aceptado' || v.estado == 'rechazado');
    setVariado(variadoFiltrado);
  }, []);

  const arrayTurnos = [
    {
      id: 1,
      paciente: 'Carolina Benitez',
      especialidad: 'Oftalmología',
      profesional: 'Sol Diaz',
      fechaTurno: new Date('2025-05-03T14:00:00'),
      lugar: 'Centro Medicina Integral',
      direccion: 'Arias 2030, Castelar',
      telefono: '11-5467-8569',
      estado: 'aceptado'
    },
    {
      id: 2,
      paciente: 'Carolina Benitez',
      especialidad: 'Cardiologia',
      profesional: 'Carlos Gonzalez',
      fechaTurno: new Date('2025-05-12T17:00:00'),
      lugar: 'Centro Medicina Integral',
      direccion: 'Arias 2030, Castelar',
      telefono: '11-5467-8569',
      estado: 'aceptado'
    },
    {
      id: 3,
      paciente: 'Carolina Benitez',
      especialidad: 'Kinesiologia',
      profesional: 'Lucia Rodriguez',
      fechaTurno: new Date('2025-05-20T13:00:00'),
      lugar: 'Centro Medicina Integral',
      direccion: 'Arias 2030, Castelar',
      telefono: '11-5467-8569',
      estado: 'aceptado'
    },
    {
      id: 4,
      paciente: 'Carolina Benitez',
      especialidad: 'Medicina General',
      profesional: 'Tomas Figueroa',
      fechaTurno: new Date('2025-06-01T09:00:00'),
      lugar: 'Centro Medicina Integral',
      direccion: 'Arias 2030, Castelar',
      telefono: '11-5467-8569',
      estado: 'aceptado'
    }
  ];
  const arrayVariado = [
    {
      id: 1,
      tipo: 'receta',
      nroAfiliado: '8049649',
      medicamento: 'Loplac',
      cantidad: '30gr',
      presentacion: 'Pastillas',
      estado: 'aceptado'
    },
    {
      id: 2,
      tipo: 'receta',
      nroAfiliado: '8049632',
      medicamento: 'Loplac',
      cantidad: '30gr',
      presentacion: 'Pastillas',
      estado: 'rechazado'
    },
    {
      id: 3,
      tipo: 'reintegro',
      especialidad: 'Oftalmología',
      medico: 'Merlina Addams',
      fechaDePrestacion: new Date('1969-12-31T17:00:00'),
      factura: {
        valorTotal: 1372895
      },
      lugarDeAtencion: 'Centro Medicina Integral',
      direccion: 'Arias 2030, Castelar',
      telefono: '11-5467-8569',
      estado: 'aceptado'
    },
    {
      id: 4,
      tipo: 'autorizacion',
      especialidad: 'Kinesiologia',
      medicoSolicitante: 'Merlina Addams',
      fechaSolicitud: new Date(),
      lugar: 'Centro Medicina Integral',
      diasInternacion: 5,
      estado: 'aceptado'
    }
  ];

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-2'>
        <SectionTitle>Próximos turnos</SectionTitle>
        <div className='flex flex-wrap items-start self-stretch'>
          {turnos.length ? (
            turnos.map((t, tIndex) => (
              <TurnosCard
                turno={t}
                key={tIndex}
                paciente={true}
              />
            ))
          ) : (
            <i>Sin contenido</i>
          )}
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <SectionTitle>Mis trámites</SectionTitle>
        <div className='grid grid-cols-1 max-w-98 sm:w-full sm:max-w-4xl sm:grid-cols-2 md:grid-cols-2'>
          {variado.length ? (
            variado.map((v, vIndx) => {
              const Component = componentsCard[v.tipo];
              return <Fragment key={vIndx}>{Component(v)}</Fragment>;
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
