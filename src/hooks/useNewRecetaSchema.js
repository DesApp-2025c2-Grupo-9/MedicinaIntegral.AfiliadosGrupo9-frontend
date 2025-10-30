import { z } from 'zod';

const ERROR_MESSAGES = {
  AFILIADO: {
    REQUIRED: 'Debe seleccionar un afiliado.'
  },
  MEDICAMENTO: {
    REQUIRED: 'Debe ingresar un medicamento.',
    TOO_SHORT: 'El nombre del medicamento debe tener al menos 4 caracteres.'
  },
  CANTIDAD: {
    REQUIRED: 'Debe ingresar una cantidad.',
    NEGATIVE: 'La cantidad debe ser positiva.',
    INTEGER: 'La cantidad debe ser un número entero.'
  },
  PRESENTACION: {
    REQUIRED: 'Debe ingresar la presentación del medicamento.',
    TOO_SHORT: 'La presentación debe tener al menos 3 caracteres.',
    INVALID_FORMAT: 'La presentación no puede contener números.'
  },
  OBSERVACIONES: {
    TOO_LONG: 'Las observaciones no pueden superar los 100 caracteres.'
  }
};

export const useNewRecetaSchema = data => {
  const recetaSchema = z.object({
    paraAfiliado: z.literal(data.listaAfiliados, ERROR_MESSAGES.AFILIADO.REQUIRED),
    medicamento: z.string().trim().min(1, ERROR_MESSAGES.MEDICAMENTO.REQUIRED).min(4, ERROR_MESSAGES.MEDICAMENTO.TOO_SHORT),
    cantidad: z.number({ invalid_type_error: ERROR_MESSAGES.CANTIDAD.REQUIRED }).int(ERROR_MESSAGES.CANTIDAD.INTEGER).positive(ERROR_MESSAGES.CANTIDAD.NEGATIVE),
    presentacion: z
      .string()
      .trim()
      .min(1, ERROR_MESSAGES.PRESENTACION.REQUIRED)
      .min(3, ERROR_MESSAGES.PRESENTACION.TOO_SHORT)
      .regex(/^[^0-9]*$/, ERROR_MESSAGES.PRESENTACION.INVALID_FORMAT),
    observaciones: z.string().trim().max(100, ERROR_MESSAGES.OBSERVACIONES.TOO_LONG).optional()
  });

  return { recetaSchema };
};
