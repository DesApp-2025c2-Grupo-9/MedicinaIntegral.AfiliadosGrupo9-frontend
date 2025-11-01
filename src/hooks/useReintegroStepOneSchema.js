import { z } from 'zod';

export const ERROR_MESSAGES = {
  PARA_AFILIADO: {
    REQUIRED: 'Debe seleccionar un afiliado.'
  },
  FECHA_DE_PRESTACION: {
    REQUIRED: 'Debe ingresar la fecha de la prestación.',
    INVALID_FORMAT: 'La fecha ingresada no es válida.',
    FUTURE_DATE: 'La fecha de la prestación no puede ser posterior a hoy.',
    TOO_OLD: 'La fecha de la prestación no puede ser anterior al 01/01/2024.'
  },
  ESPECIALIDAD: {
    REQUIRED: 'Debe seleccionar una especialidad.'
  },
  MEDICO: {
    REQUIRED: 'Debe ingresar el nombre del médico.',
    INVALID_FORMAT: 'El nombre del médico solo puede contener letras.',
    TOO_SHORT: 'El nombre del médico debe tener al menos 3 caracteres.'
  },
  LUGAR_DE_ATENCION: {
    REQUIRED: 'Debe ingresar el lugar donde fue atendido.',
    TOO_SHORT: 'El lugar ingresado es demasiado corto.'
  },
  FECHA_FACTURA: {
    REQUIRED: 'Debe ingresar la fecha de la factura.',
    INVALID_FORMAT: 'La fecha ingresada no es válida.',
    FUTURE_DATE: 'La fecha de la factura no puede ser posterior a hoy.'
  },
  CUIT: {
    REQUIRED: 'Debe ingresar el CUIT.',
    INVALID_FORMAT: 'El CUIT debe contener solo números.',
    INVALID_LENGTH: 'El CUIT debe tener 11 dígitos.'
  },
  VALOR_TOTAL: {
    REQUIRED: 'Debe ingresar el valor total de la factura.',
    INVALID_FORMAT: 'El valor total debe ser un número válido.',
    NEGATIVE: 'El valor total debe ser mayor que cero.'
  },
  PERSONA_FACTURADA: {
    REQUIRED: 'Debe ingresar el nombre de la persona a la que se factura.',
    INVALID_FORMAT: 'El nombre solo puede contener letras.',
    TOO_SHORT: 'El nombre debe tener al menos 3 caracteres.'
  },
  FORMA_DE_PAGO: {
    REQUIRED: 'Debe seleccionar una forma de pago.'
  },
  CBU: {
    REQUIRED: 'Debe ingresar un CBU para pagos por transferencia.',
    LENGTH: 'El CBU debe tener 22 dígitos.',
    NUMERIC: 'El CBU solo puede contener números.'
  }
};

export const useReintegroStepOneSchema = data => {
  const reintegroStepOneSchema = z.object({
    paraAfiliado: z.literal(data.listaAfiliados, ERROR_MESSAGES.PARA_AFILIADO.REQUIRED),
    fechaDePrestacion: z.iso.date({ error: iss => (!iss.input ? ERROR_MESSAGES.FECHA_DE_PRESTACION.REQUIRED : ERROR_MESSAGES.FECHA_DE_PRESTACION.INVALID_FORMAT) }).refine(
      val => {
        const fechaIngresada = new Date(val);
        const hoy = new Date();
        return fechaIngresada <= hoy; // Si es false, el valor ingresado no es válido.
      },
      { error: ERROR_MESSAGES.FECHA_DE_PRESTACION.FUTURE_DATE }
    ),
    especialidad: z.literal(data.listaEspecialidades, ERROR_MESSAGES.ESPECIALIDAD.REQUIRED),
    medico: z
      .string()
      .trim()
      .min(1, ERROR_MESSAGES.MEDICO.REQUIRED)
      .regex(/^[^0-9]*$/, ERROR_MESSAGES.MEDICO.INVALID_FORMAT),
    lugarDeAtencion: z.string().trim().min(1, ERROR_MESSAGES.LUGAR_DE_ATENCION.REQUIRED)
  });

  return { reintegroStepOneSchema };
};
