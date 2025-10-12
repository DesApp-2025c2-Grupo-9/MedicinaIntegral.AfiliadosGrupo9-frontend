import { z } from 'zod'

const ERROR_MESSAGES = {
  NRO_AFILIADO: {
    REQUIRED: 'Debe seleccionar un afiliado'
  },
  MEDICAMENTO: {
    REQUIRED: 'Debe ingresar el nombre de un medicamento.',
    TOO_SHORT: 'El nombre del medicamento debe tener al menos 4 caracteres.'
  },
  CANTIDAD: {
    REQUIRED: 'Debe ingresar una cantidad.',
    INVALID_FORMAT: 'La cantidad debe expresarse don dígitos.',
    NEGATIVE: 'La cantidad debe ser positiva.'
  },
  PRESENTACION: {
    REQUIRED: 'Debe ingresar la presentación del medicamento.',
    INVALID_FORMAT: 'El valor del campo deben ser letras.',
    TOO_SHORT: 'El campo debe tener al menos 3 caracteres.'
  }
}

//Esquema de solicitud utilizando zod
export const recetaSchema = z.object({
  nroAfiliado: z.string(),
  medicamento: z.string().trim()
    .min(1, ERROR_MESSAGES.MEDICAMENTO.REQUIRED)
    .min(4, ERROR_MESSAGES.MEDICAMENTO.TOO_SHORT),
  cantidad: z.coerce.number().positive(ERROR_MESSAGES.CANTIDAD.NEGATIVE),
  presentacion: z.string()
  .trim()
  .min(1, ERROR_MESSAGES.PRESENTACION.REQUIRED)
  .min(3, ERROR_MESSAGES.PRESENTACION.TOO_SHORT)
  .regex(/^[^0-9]*$/, ERROR_MESSAGES.PRESENTACION.INVALID_FORMAT),
  observaciones: z.string().optional()
})