import { useState } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../context/UserContext';

const Register = () => {
const [usuario, setUsuario] = useState('');
const [clave, setClave] = useState('');
const [confirmarClave, setConfirmarClave] = useState('');
const [error, setError] = useState('');

const handleSubmit = (e) => {
e.preventDefault();

if (!usuario || !clave || !confirmarClave) {
setError('Por favor completá todos los campos');
} else if (clave !== confirmarClave) {
    setError('Las contraseñas no coinciden');
    } else {
    setError('');
    console.log('Usuario:', usuario);
    console.log('Contraseña:', clave);

    Swal.fire({
        title: 'Registro exitoso',
        text: `Tu cuenta fue creada correctamente`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        draggable: true,
        width: '400px',
        customClass: {
        popup: 'swal-popup-small',
        title: 'swal-title-small',
        confirmButton: 'swal-button-small'
        }
    });
    }
};

return (
    <div className="login-page">
    <div className="login-wrapper">
    <div className="image-section">
        <img src="/clinica.jpg" alt="clinica" />
    </div>

    <div className="login-container">
        <h1 className="bienvenida">Registrate</h1>
        <form onSubmit={handleSubmit}>
        <h2>Ingrese su número de documento:</h2>
        <input
            type="text"
            placeholder="ej: 12345678"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
        />
        <h2>Elija una contraseña:</h2>
        <input
            type="password"
            placeholder="ej: ******"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
        />
        <h2>Confirme su contraseña:</h2>
        <input
            type="password"
            placeholder="ej: ******"
            value={confirmarClave}
            onChange={(e) => setConfirmarClave(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Registrarse</button>
        </form>
        <div className="footer">
        ¿Ya tenés cuenta? <a href="/login">Ingresá aquí</a>
        </div>
    </div>
    </div>
    </div>
);
};

export default Register;
