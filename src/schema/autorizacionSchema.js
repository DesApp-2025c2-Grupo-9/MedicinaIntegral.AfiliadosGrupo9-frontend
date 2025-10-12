import {z} from 'zod'

//Esquema de solicitud utilizando zod
export const  autorizacionSchema = z.object({
  nroAfiliado: z.string(),
  fechaSolicitud : z.string(),//Pasar a Date
  especialidad : z.string(),
  medicoSolicitante : z.string(),
  lugarAtencion : z.string(),
  diasDeInternacion : z.coerce.number(),
  observaciones : z.string().optional()
})