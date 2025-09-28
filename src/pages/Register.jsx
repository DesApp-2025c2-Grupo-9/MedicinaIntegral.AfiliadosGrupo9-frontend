import { useState } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import clinica_img from '../assets/img/clinica.webp';

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
                <img src={clinica_img} alt="clinica" />
            </div>

            <div className='login-container'>
                <div className="login">
                        <h1 className="bienvenida">Registrate</h1>
                        <form onSubmit={handleSubmit}>
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
                        ¿Ya tenés cuenta? <span><Link to="/login">Ingresá aquí</Link></span>
                        </div>
                    </div>
            </div>
        </div>
    </div>
);
};

export default Register;
