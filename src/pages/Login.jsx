import { useEffect, useRef, useState } from 'react';
import './login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { validacionLogin } from '../utils/validacionLogin';
import OcultarClave from '../components/OcultarClave/ocultarClave';
import { useLogin } from '../services/queries';
import { useUserStore } from '../store/userStore';
import Swal from 'sweetalert2';
import { useResetErrorBoundaryStore } from '../store/resetErrorBoundaryStore';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const setUser = useUserStore(state => state.setUser);
  const navigate = useNavigate();
  const { mutateAsync } = useLogin();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const handleClaveChange = e => {
    setClave(e.target.value);
    if (error) setError('');
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const resetErrorBoundary = useResetErrorBoundaryStore(state => state.resetErrorBoundary);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      /*aca hay validaciones*/
      const mensajeError = validacionLogin(usuario, clave);
      if (mensajeError) {
        setError(mensajeError);
        return;
      }
      const loginRes = await mutateAsync({
        nroDocumento: usuario,
        password: clave
      });
      setError('');
      if (resetErrorBoundary) resetErrorBoundary();
      setUser({ accessToken: loginRes?.accessToken, idAfiliado: loginRes?.data?.idAfiliado, rolSesion: loginRes?.data?.rolSesion });
      navigate(from, { replace: true });
    } catch (error) {
      const mensaje = error.response?.data?.message || 'Ha ocurrido un problema inesperado. Por favor, intente más tarde.';
      Swal.fire({
        icon: 'warning',
        iconColor: '#dc143c',
        titleText: 'Error al iniciar sesión',
        text: mensaje,
        confirmButtonText: 'Continuar',
        customClass: {
          title: 'swal-title',
          htmlContainer: 'swal-html',
          confirmButton: 'swal-confirm-button'
        }
      });
    }
  };

  return (
    <div className='login-container'>
      <div className='login'>
        <h1 className='bienvenida'>Bienvenido</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor='documento-login'>Ingrese su número de documento:</label>
          <input
            ref={inputRef}
            id='documento-login'
            type='text'
            placeholder='ej: 12345678'
            maxLength={8}
            value={usuario}
            onChange={e => {
              const valor = e.target.value;
              if (/^\d*$/.test(valor)) {
                setUsuario(valor);
                if (error) setError('');
              }
            }}
          />
          <label htmlFor='contraseña-login'>Ingrese su contraseña:</label>

          <OcultarClave
            id='contraseña-login'
            type='password'
            placeholder='ej: ******'
            value={clave}
            onChange={handleClaveChange}
          />

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
