export const validacionRegistro  = (usuario, clave, confirmarClave) => {

    if (!usuario || !clave || !confirmarClave) {
        setError('Por favor, complete todos los campos.');
    }
    
    if (usuario.length < 7 || usuario.length > 8) {
    return 'El número de documento no es válido.';
    }

    if (clave.length !== 6) {
        return 'La contraseña debe tener 6 caracteres.';
    }

    if (clave !== confirmarClave) {
        setError('Las contraseñas no coinciden');
    } 
    return '';
};

