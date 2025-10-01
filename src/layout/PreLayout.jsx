import { Outlet } from 'react-router-dom'
import clinica_img from '../assets/img/clinica.webp';
import medIntegralLogo from '../assets/img/med_integral_logo.png';

function PreLayout() {
  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="image-section">
          <img src={clinica_img} alt="clinica" />
        
          <div className="medicina-integral-section">
            <div className="medicina-integral-logo">
              <img src={medIntegralLogo} alt="medicina-integral-logo" />
            </div>
            
            <div className="medicina-integral-title">
              <p>Medicina</p>
              <p>Integral</p>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  )
}
export default PreLayout