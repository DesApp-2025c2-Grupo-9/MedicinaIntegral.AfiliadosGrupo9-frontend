import { useState, useContext } from 'react';
import './login.css';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [mostrarClave, setMostrarClave] = useState(false);


  const handleSubmit = e => {
    e.preventDefault();

    /*aca hay validaciones*/ 
      if (!usuario || !clave) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    if (usuario.length < 7 || usuario.length > 8) { 
      setError('El número de documento no es válido.');
      return;
    }

    if (clave.length !== 6) { 
      setError('La contraseña no es válida.');
      return;
    }

    

    setError('');
    console.log('Usuario:', usuario);
    console.log('Contraseña:', clave);

    setUser({ documento: usuario });

    navigate('/');
    
  }; 

  return (
    <div className='login-container'>
      <div className='login'>
        <h1 className='bienvenida'>Bienvenido</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor='documento-login'>Ingrese su número de documento:</label>
          <input
            id='documento-login'
            type='text'
            placeholder='ej: 12345678'
            maxLength={8}
            value={usuario}
            onChange={e => {
              const valor = e.target.value; 
              if (/^\d*$/.test(valor)) {
              setUsuario(valor);
            }
          }
            }
          />
          <label htmlFor='contraseña-login'>Ingrese su contraseña:</label>
          <div className='input-eye'>
            <input
              id='contraseña-login'
              type={mostrarClave ? 'text' : 'password'}
              placeholder='ej:******'
              maxLength={6}
              value={clave}
              onChange={e => setClave(e.target.value)}
            />
            <span className='icon-eye' onClick={() => setMostrarClave(prev => !prev)}>
            {mostrarClave ? < FaEye  /> : < FaEyeSlash />}
            </span>


          </div>

          {error && <p className='error'>{error}</p>}
          <button type='submit'>Ingresar</button>
        </form>

        <p className='footer'>
          ¿No tenés cuenta?{' '}
          <span>
            <Link to='/register'>Registrate aquí</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
