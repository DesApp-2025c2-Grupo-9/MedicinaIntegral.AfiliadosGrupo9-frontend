import { z } from 'zod';

export const reintegroSchema = z.object({
  paraAfiliado: z.literal(['Carolina Benitez', 'John Doe', 'Jane Doe']),
  fechaDePrestacion: z.string().min(1),
  especialidad: z.literal(['Lorem', 'Ipsum', 'Dolor', 'Sit']),
  medico: z.string().min(1),
  lugarDeAtencion: z.string().min(1),
  factura: z.object({
    fecha: z.string().min(1),
    cuit: z.string().min(1),
    valorTotal: z.string().min(1),
    personaAFacturar: z.string().min(1)
  }),
  formaDePago: z.literal(['Cheque', 'Efectivo', 'Transferencia']),
  cbu: z.string().min(1),
  observaciones: z.string().min(1)
});
