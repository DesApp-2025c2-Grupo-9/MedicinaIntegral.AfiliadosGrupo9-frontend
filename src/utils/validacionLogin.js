export const validacionLogin = (usuario, clave) => {
  if (!usuario || !clave) {
    return 'Por favor, complete todos los campos.';
  }

  if (usuario.length < 7 || usuario.length > 8) {
    return 'El número de documento no es válido.';
  }

  return '';
};
