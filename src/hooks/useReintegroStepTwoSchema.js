import { z } from 'zod';
import { ERROR_MESSAGES } from './useReintegroStepOneSchema';

export const useReintegroStepTwoSchema = () => {
  const reintegroStepTwoSchema = z
    .object({
      factura: z.object({
        fecha: z.iso.date({ error: iss => (!iss.input ? ERROR_MESSAGES.FECHA_FACTURA.REQUIRED : ERROR_MESSAGES.FECHA_FACTURA.INVALID_FORMAT) }).refine(
          val => {
            const fechaIngresada = new Date(val);
            const hoy = new Date();
            return fechaIngresada <= hoy;
          },
          { error: ERROR_MESSAGES.FECHA_FACTURA.FUTURE_DATE }
        ),
        cuit: z
          .string()
          .trim()
          // .regex(/^[0-9]+$/, ERROR_MESSAGES.CUIT.REQUIRED)
          .length(13, ERROR_MESSAGES.CUIT.INVALID_LENGTH),
        valorTotal: z.coerce.number().positive(ERROR_MESSAGES.VALOR_TOTAL.NEGATIVE),
        personaAFacturar: z
          .string()
          .trim()
          .min(1, ERROR_MESSAGES.PERSONA_FACTURADA.REQUIRED)
          .regex(/^[^0-9]*$/, ERROR_MESSAGES.PERSONA_FACTURADA.INVALID_FORMAT)
      }),
      formaDePago: z.literal(['Cheque', 'Efectivo', 'Transferencia'], ERROR_MESSAGES.FORMA_DE_PAGO.REQUIRED),
      cbu: z.string().optional(),
      observaciones: z.string().optional()
    })
    .refine(
      data => {
        if (data.formaDePago === 'Transferencia') {
          return data.cbu?.length === 23;
        } else {
          return true;
        }
      },
      {
        error: iss => {
          const message = iss.input.cbu?.length > 0 ? ERROR_MESSAGES.CBU.LENGTH : ERROR_MESSAGES.CBU.REQUIRED;
          return message;
        },
        path: ['cbu']
      }
    );

  return { reintegroStepTwoSchema };
};
