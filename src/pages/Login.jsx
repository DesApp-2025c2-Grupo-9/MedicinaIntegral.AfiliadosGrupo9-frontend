import { useState, useContext } from 'react';
import './login.css';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import clinica_img from '../assets/img/clinica.webp';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!usuario || !clave) {
      setError('Por favor completá todos los campos');
      return;
    }

    setError('');
    console.log('Usuario:', usuario);
    console.log('Contraseña:', clave);

    setUser({ documento: usuario });

    Swal.fire({
      title: 'Login exitoso',
      text: `Bienvenido `,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      draggable: true,
      width: '400px',
      customClass: {
        popup: 'swal-popup-small',
        title: 'swal-title-small',
        confirmButton: 'swal-button-small',
      },
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="image-section">
          <img src={clinica_img} alt="clinica" />
        </div>

        <div className="login-container">
          <div className="login">
          <h1 className="bienvenida">Bienvenido</h1>
          <form onSubmit={handleSubmit}>
            <h2>Ingrese su número de documento:</h2>
            <input
              type="text"
              placeholder="ej: 12345678"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <h2>Ingrese su contraseña:</h2>
            <input
              type="password"
              placeholder="ej:******"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Ingresar</button>
          </form>
          <div className="footer">
            ¿No tenés cuenta? <span><Link to="/register">Registrate aquí</Link></span>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

