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
    <div className='register-page'>
      <h1 className='heading'>Regístrese</h1>

      <form
        onSubmit={handleSubmit}
        className='register-form'
      >
        <div className='documento-field'>
          <label htmlFor='documento-input'>Ingrese su número de documento:</label>
          <input
            ref={inputRef}
            id='documento-input'
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
        </div>

        <div className='contraseña-field'>
          <label htmlFor='contraseña-input'>Elija una contraseña:</label>
          <OcultarClave
            id='contraseña-input'
            type='password'
            placeholder='ej: ******'
            value={clave}
            onChange={handleClaveChange}
          />
        </div>

        <div className='contraseña-field'>
          <label htmlFor='contraseña-confirm-input'>Confirme su contraseña:</label>
          <OcultarClave
            id='contraseña-confirm-input'
            type='password'
            placeholder='ej: ******'
            value={confirmarClave}
            onChange={handleConfirmarClaveChange}
          />
        </div>

        {error && <p className='error-message'>{error}</p>}

        <button
          type='submit'
          className='form-button'
        >
          Registrarse
        </button>
      </form>

      <p className='form-footer'>
        ¿Ya está registrado?{' '}
        <span>
          <Link to='/login'>Ingrese aquí.</Link>
        </span>
      </p>
    </div>
  );
};

export default Register;
