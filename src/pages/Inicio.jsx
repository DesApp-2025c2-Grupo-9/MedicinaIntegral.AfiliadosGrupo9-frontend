import SectionTitle from '../components/SectionTitle';

function Inicio() {
  return (
    <div className='flex flex-col gap-5'>

      <div className='flex flex-col gap-2'>
        <SectionTitle>Próximos turnos</SectionTitle>
        <div className='flex flex-wrap items-start self-stretch'>
          <i>Acá van los turnos</i>
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <SectionTitle>Mis trámites</SectionTitle>
        <div className='flex flex-wrap items-start self-stretch'>
          <i>Acá van los trámites</i>
        </div>
      </div>

    </div>
  )
}
export default Inicio