import { Outlet } from 'react-router-dom'
import medLogo from '../assets/img/med_integral_logo.png';

function PreLayout() {
  return (
    <div>
      {/* <div className='w-[64dvw] h-dvh bg-[linear-gradient(rgba(0,0,0,0.56),rgba(0,0,0,0.56)),linear-gradient(rgba(0,171,1,0.24),rgba(0,171,1,0.24)),url(./assets/img/clinica.webp)] bg-cover bg-no-repeat bg-center relative'>
        <div className='h-full flex items-center justify-center gap-4'>
          <img className='w-29.5 h-29.5 aspect-square' src={medLogo} alt='medicina-integral-logo' />
          <div className='text-blanco-principal text-[48.83px]'>
            <p className='-mb-3'>Medicina</p>
            <p className='uppercase'>Integral</p>
          </div>
        </div>
      </div> */}
      <Outlet />
    </div>
  )
}
export default PreLayout