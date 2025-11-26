export function validarRegistroCBU(registro) {
  const errores = {};
  const { nombre, apellido, nroCBU, tipoDeCuenta, cuilOCuit } = registro;

  const nroCBULimpio = typeof nroCBU === 'string' ? nroCBU.replace(/-/g, '') : '';
  const cuilLimpio = typeof cuilOCuit === 'string' ? cuilOCuit.replace(/-/g, '') : '';

  if (!nroCBULimpio || nroCBULimpio.length !== 22 || !/^\d+$/.test(nroCBULimpio)) {
    errores.nroCBU = 'El CBU debe tener 22 dígitos numéricos.';
  }

  if (!nombre || nombre.trim().length < 2) {
    errores.nombre = 'El nombre es obligatorio.';
  }

  if (!apellido || apellido.trim().length < 2) {
    errores.apellido = 'El apellido es obligatorio.';
  }

  if (!cuilLimpio || !/^\d{11}$/.test(cuilLimpio)) {
    errores.cuilOCuit = 'El CUIL/CUIT debe tener 11 dígitos numéricos.';
  }

  if (!tipoDeCuenta) {
    errores.tipoDeCuenta = 'Debe seleccionar un tipo de cuenta.';
  }

  return errores;
}
