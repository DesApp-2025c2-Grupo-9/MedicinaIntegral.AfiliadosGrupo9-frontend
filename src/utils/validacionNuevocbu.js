
export function validarRegistroCBU(registro) {
  const errores = {};
  const { nombre, apellido, nroCBU, tipoDeCuenta, cuilOCuit } = registro;

  if (!nroCBU || nroCBU.length !== 22 || !/^\d+$/.test(nroCBU)) {
    errores.nroCBU = "El CBU debe tener exactamente 22 dígitos numéricos.";
  }

  if (!nombre || nombre.trim().length < 2) {
    errores.nombre = "El nombre es obligatorio y debe tener al menos 2 caracteres.";
  }

  if (!apellido || apellido.trim().length < 2) {
    errores.apellido = "El apellido es obligatorio y debe tener al menos 2 caracteres.";
  }

  if (!cuilOCuit || !/^\d{11}$/.test(cuilOCuit)) {
    errores.cuilOCuit = "CUIL/CUIT debe tener exactamente 11 dígitos numéricos.";
  }

  if (!tipoDeCuenta) {
    errores.tipoDeCuenta = "Seleccioná un tipo de cuenta.";
  }

  return errores;
}