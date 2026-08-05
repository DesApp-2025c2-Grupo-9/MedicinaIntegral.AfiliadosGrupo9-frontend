import { Outlet } from 'react-router-dom';
import clinica_img from '../assets/img/clinica.webp';
import med_integral_logo from '../assets/img/med_integral_logo.png';
import { ToastContainer } from 'react-toastify';
import DemoBadge from '../components/DemoBadge';

function PreLayout() {
  return (
    <div className='pre-layout'>
      <div className='image-section'>
        <img
          className='bg-image'
          src={clinica_img}
          alt='clinica_img'
        />

        <div className='logo-section'>
          <DemoBadge />
          <div className='logo-stack'>
            <img
              className='logo'
              src={med_integral_logo}
              alt='logo'
            />
          </div>
          <p className='title'>
            Medicina
            <br />
            <span>Integral</span>
          </p>
        </div>
      </div>

      <ToastContainer limit={1} />

      <Outlet />
    </div>
  );
}
export default PreLayout;
