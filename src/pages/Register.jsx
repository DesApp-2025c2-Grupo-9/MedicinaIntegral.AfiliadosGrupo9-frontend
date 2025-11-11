import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { validacionRegistro } from '../utils/validacionRegistro';
import OcultarClave from '../components/OcultarClave/ocultarClave';
import { useRegister } from '../services/queries';

const Register = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { mutateAsync } = useRegister();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleClaveChange = e => {
    setClave(e.target.value);
    if (error) setError('');
  };

  const handleConfirmarClaveChange = e => {
    setConfirmarClave(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      /*aca hay validaciones*/
      const mensajeError = validacionRegistro(usuario, clave, confirmarClave);
      if (mensajeError) {
        setError(mensajeError);
        return;
      }
      await mutateAsync({
        nroDocumento: usuario,
        password: clave,
        confirmPassword: confirmarClave
      });
      setError('');
      Swal.fire({
        icon: 'success',
        iconColor: '#00ab01',
        titleText: 'Registro exitoso',
        text: 'El usuario ha sido registrado exitosamente.',
        confirmButtonText: 'Continuar',
        customClass: {
          title: 'swal-title',
          htmlContainer: 'swal-html',
          confirmButton: 'swal-confirm-button'
        }
      }).then(() => {
        navigate('/login');
      });
    } catch (error) {
      // este es el alerta para usuario ya registrado
      if (error?.response?.status === 409) {
        Swal.fire({
          icon: 'warning',
          iconColor: '#dc143c',
          titleText: 'Usuario ya registrado',
          text: 'El número de documento ingresado ya se encuentra registrado.',
          confirmButtonText: 'Continuar',
          customClass: {
            title: 'swal-title',
            htmlContainer: 'swal-html',
            confirmButton: 'swal-confirm-button'
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          iconColor: '#dc143c',
          titleText: 'Error inesperado',
          text: 'Ha ocurrido un problema inesperado. Por favor, intente más tarde.',
          confirmButtonText: 'Continuar',
          customClass: {
            title: 'swal-title',
            htmlContainer: 'swal-html',
            confirmButton: 'swal-confirm-button'
          }
        });
      }
    }
  };

  return (
    <div className='login-container'>
      <div className='login'>
        <h1 className='bienvenida'>Registrate</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor='documento-register'>Ingrese su número de documento:</label>

          <input
            ref={inputRef}
            id='documento-register'
            type='text'
            placeholder='ej: 12345678'
            value={usuario}
            maxLength={8}
            onChange={e => {
              const valor = e.target.value;
              if (/^\d*$/.test(valor)) {
                setUsuario(valor);
                if (error) setError('');
              }
            }}
          />
          <label htmlFor='contraseña-register'>Elija una contraseña:</label>

          <OcultarClave
            id='contraseña-register'
            type='password'
            placeholder='ej: ******'
            value={clave}
            onChange={handleClaveChange}
          />
          <label
            htmlFor='contraseña-confirm'
            className='contraseña-confirm'
          >
            Confirme su contraseña:
          </label>
          <OcultarClave
            id='contraseña-confirm'
            type='password'
            placeholder='ej: ******'
            value={confirmarClave}
            onChange={handleConfirmarClaveChange}
          />

          {error && <p className='error'>{error}</p>}
          <button type='submit'>Registrarse</button>
        </form>

        <p className='footer'>
          ¿Ya tenés cuenta?{' '}
          <span>
            <Link to='/login'>Ingresá aquí</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
