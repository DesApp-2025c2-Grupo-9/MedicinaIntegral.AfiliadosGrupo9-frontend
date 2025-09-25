import SectionTitle from '../components/SectionTitle'
import NavButton from '../components/NavButton'
import { icons } from '../utils/icons'
import { Outlet } from 'react-router-dom'

function ReintegrosLayout() {
  return (
    <div className='flex flex-col items-start gap-5'>
      <div className='flex flex-col items-start gap-2'>
        <SectionTitle>Reintegros</SectionTitle>
        <div className='flex items-center gap-2'>
          <NavButton path='historial-reintegros' icon={icons.reintegros} description='Historial de reintegros' />
          <NavButton path='solicitar-reintegro' icon={icons.agregar} description='Solicitar nuevo reintegro' />
        </div>
      </div>
      <div className='w-full lg:max-w-211.5'>
        <Outlet />
      </div>
    </div>
  )
}
export default ReintegrosLayout