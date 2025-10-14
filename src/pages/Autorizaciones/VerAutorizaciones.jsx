import AutorizacionCard from '../../components/cards/cards/AutorizacionCard'
import { useStateFilter } from "../../store/stateFilter"
import FiltroEstados from "../../components/FiltroEstados"
import { useGetAllAutorizaciones } from '../../services/autorizacionesQueries';

function VerAutorizaciones() {
    const {state} = useStateFilter();

    const {data, error, isLoading} = useGetAllAutorizaciones();
    const autorizaciones = data?.data

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>

    const autorizacionesHard = [
        {   idAutorizacion : 1,
            nroAfiliado : 123123123,
            fechaSolicitud : new Date("1969-12-31T17:00:00"),
            practica : 'Of',
            especialidad: 'Oftalmologia',
            medicoSolicitante: 'Tita Merello',
            lugarAtencion : 'Clinica Alcorta',
            diagnostico : 'lorem',
            observaciones : '',
            diasDeInternacion : 10,
            estado : 'aceptado'
        },
        {   idAutorizacion : 2,
            nroAfiliado : 123123123,
            fechaSolicitud : new Date("1969-12-31T17:00:00"),
            practica : 'Of',
            especialidad: 'Oftalmologia',
            medicoSolicitante: 'Tita Merello',
            lugarAtencion : 'Clinica Alcorta',
            diagnostico : 'lorem',
            observaciones : '',
            diasDeInternacion : 10,
            estado : 'rechazado'
        },
        {   idAutorizacion : 3,
            nroAfiliado : 123123123,
            fechaSolicitud : new Date("1969-12-31T17:00:00"),
            practica : 'Of',
            especialidad: 'Oftalmologia',
            medicoSolicitante: 'Tita Merello',
            lugarAtencion : 'Clinica Alcorta',
            diagnostico : 'lorem',
            observaciones : '',
            diasDeInternacion : 10,
            estado : 'pendiente'
        }


    ]

    const autorizacionesFiltradass = autorizaciones?.filter(
        autorizacion => state.includes(autorizacion.estado) || state == 'Todos'
    )
  return (
    <div className="flex flex-col items-end gap-3 relative">
      <FiltroEstados className='sm:absolute -top-11 mr-auto'/>
    <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-2 w-full">
      {autorizacionesFiltradass.map(
        (autorizacion, idAutorizacion) => (
          <AutorizacionCard autorizacion={autorizacion} key={idAutorizacion} />
        )
      )}
    </div>
      </div>
  )
}

export default VerAutorizaciones