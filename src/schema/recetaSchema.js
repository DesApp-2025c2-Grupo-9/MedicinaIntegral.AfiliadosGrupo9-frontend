import {z} from 'zod'

//Esquema de solicitud utilizando zod
export const  recetaSchema = z.object({
  nroAfiliado: z.string(),
  medicamento : z.string(),
  cantidad : z.coerce.number(),
  presentacion : z.string(),
  observaciones : z.string().optional()
})