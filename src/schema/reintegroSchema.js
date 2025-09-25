import { z } from 'zod';

export const reintegroSchema = z.object({
  paraAfiliado: z.literal(['Carolina Benitez', 'John Doe', 'Jane Doe']),
  fechaPrestacion: z.string().min(1),
  especialidad: z.literal(['Lorem', 'Ipsum', 'Dolor', 'Sit']),
  medico: z.string().min(1),
  lugarPrestacion: z.string().min(1),
  fechaFactura: z.string().min(1),
  cuit: z.string().min(1),
  valorTotal: z.string().min(1),
  personaFactura: z.string().min(1),
  formaDeReintegro: z.literal(['Cheque', 'Efectivo', 'Transferencia']),
  cbu: z.string().min(1),
  observaciones: z.string().min(1)
});