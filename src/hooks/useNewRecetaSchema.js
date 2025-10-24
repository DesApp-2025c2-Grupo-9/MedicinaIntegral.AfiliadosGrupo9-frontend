import { z } from 'zod';

export const useNewRecetaSchema = data => {
  const recetaSchema = z.object({
    paraAfiliado: z.literal(data.listaAfiliados, ''),
    medicamento: z.string().min(1),
    cantidad: z.number(),
    presentacion: z.string().min(1),
    observaciones: z.string().optional()
  });

  return { recetaSchema };
};
