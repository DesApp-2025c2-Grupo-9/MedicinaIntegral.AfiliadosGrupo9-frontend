export const validacionRegistro  = (usuario, clave, confirmarClave) => {
    const formatoClave = /^[A-Z]\d{5}$/;
    
    if (!usuario || !clave || !confirmarClave) {
        return 'Por favor, complete todos los campos.';
    }
    
    if (usuario.length < 7 || usuario.length > 8) {
    return 'El número de documento no es válido.';
    }

    if (clave.length !== 6) {
        return 'La contraseña debe tener 6 caracteres.';
    }

    
    if (!formatoClave.test(clave)) {
        return 'La contraseña debe tener una letra mayúscula seguida de cinco números.';
    }

    if (clave !== confirmarClave) {
        return 'Las contraseñas no coinciden';
    } 
    return '';
};

