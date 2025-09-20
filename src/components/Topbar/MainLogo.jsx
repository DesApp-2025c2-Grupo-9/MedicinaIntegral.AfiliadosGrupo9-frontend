import { Link } from 'react-router-dom';
import medLogo from '../../assets/img/med_integral_logo.png';

function MainLogo() {
  return (
    <Link to='/' className='flex items-center gap-1.5 w-fit h-9'>
      <img className='w-9 aspect-square' src={medLogo} alt='medicina-integral-logo' />

      <div className='flex flex-col items-start text-[15px] font-bold leading-tight'>
        <p>Medicina</p>
        <p className='text-center uppercase'>Integral</p>
      </div>
    </Link>
  )
}
export default MainLogo