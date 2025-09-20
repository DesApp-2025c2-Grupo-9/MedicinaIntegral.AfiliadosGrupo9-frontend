import Topbar from '../components/Topbar/Topbar'
import Sidebar from '../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
      <Topbar className='mb-5' />

      <div className='flex gap-5 w-dvw'>
        <Sidebar className='h-[calc(100dvh-81px)]' />
        <Outlet />
      </div>
    </>
  )
}
export default MainLayout