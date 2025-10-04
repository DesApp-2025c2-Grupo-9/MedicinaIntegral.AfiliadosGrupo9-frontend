import { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { validacionRegistro } from '../utils/validacionRegistro'; 

const Register = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [confirmarClave, setConfirmarClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    /*aca hay validaciones*/ 
      const mensajeError = validacionRegistro(usuario, clave, confirmarClave);
      if (mensajeError) {
        setError(mensajeError);
        return;
      }
    
      setError('');
      console.log('Usuario:', usuario);
      console.log('Contraseña:', clave);

      Swal.fire({
        title: 'Registro exitoso',
        text: 'Su cuenta fue creada correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        draggable: true,
        width: '400px',
        customClass: {
          popup: 'swal-popup-small',
          title: 'swal-title-small',
          confirmButton: 'swal-button-small'
        }
      }).then(() => {
      navigate('/login');
    });
    
  };

  return (
    <div className='login-container'>
      <div className='login'>
        <h1 className='bienvenida'>Registrate</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor='documento-register'>Ingrese su número de documento:</label>
          <input
            id='documento-register'
            type="text"
            placeholder="ej: 12345678"
            value={usuario}
            maxLength={8}
            onChange={e => {
              const valor = e.target.value; 
              if (/^\d*$/.test(valor)) {
              setUsuario(valor);
              }
              
          }
        }
          />
          <label htmlFor='contraseña-register'>Elija una contraseña:</label>
          <input
            id='contraseña-register'
            type='password'
            placeholder='ej: ******'
            maxLength={6}
            value={clave}
            onChange={e => setClave(e.target.value)}
          />
          <label className='contraseña-confirm'>Confirme su contraseña:</label>
          <input
            id='contraseña-confirm'
            type='password'
            placeholder='ej: ******'
            maxLength={6}
            value={confirmarClave}
            onChange={e => setConfirmarClave(e.target.value)}
            
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
