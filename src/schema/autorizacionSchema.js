import {z} from 'zod'
import { getEspecialidades } from '../services/api';


const ERROR_MESSAGES = {
  NRO_AFILIADO: {
    REQUIRED: 'Debe seleccionar un afiliado.'
  },
  FECHA_SOLICITUD: {
    REQUIRED: 'Debe ingresar la fecha para la solicitud.',
    INVALID_FORMAT: 'La fecha ingresada no es válida.',
    PAST_DATE: 'La fecha de solicitud no puede ser anterior.'
  },
  ESPECIALIDAD: {
    REQUIRED: 'Debe seleccionar una especialidad.'
  },
  MEDICO_SOLICITANTE: {
    REQUIRED: 'Debe ingresar el nombre del médico.',
    INVALID_FORMAT: 'El nombre del médico solo puede contener letras.'
  },
  LUGAR_DE_ATENCION: {
    REQUIRED: 'Debe ingresar el lugar donde se va a atender.',
    TOO_SHORT: 'El lugar ingresado es demasiado corto.'
  },
  DIAS_DE_INTERNACION:{
    REQUIRED: 'Debe ingresar una cantidad.',
    INVALID_FORMAT: 'La cantidad debe expresarse con dígitos.',
    NEGATIVE: 'La cantidad debe ser positiva.'
  }
}

const especialidadesRes = await getEspecialidades();

//Esquema de solicitud utilizando zod
export const  autorizacionSchema = z.object({
  nroAfiliado: z.literal(['Carolina Benitez', 'John Doe', 'Jane Doe'], ERROR_MESSAGES.NRO_AFILIADO.REQUIRED),
  fechaSolicitud: z.coerce
  .date({
    invalid_type_error: ERROR_MESSAGES.FECHA_SOLICITUD.INVALID_FORMAT,
    required_error: ERROR_MESSAGES.FECHA_SOLICITUD.REQUIRED,
  })
  .refine(
    (val) => {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0); // limpiar hora para comparar solo fechas
      return val >= hoy; // debe ser hoy o posterior
    },
    { message: ERROR_MESSAGES.FECHA_SOLICITUD.PAST_DATE }
  ),
  especialidad : z.literal(especialidadesRes.data, ERROR_MESSAGES.ESPECIALIDAD.REQUIRED),
  medicoSolicitante : z
      .string()
      .trim()
      .min(1, ERROR_MESSAGES.MEDICO_SOLICITANTE.REQUIRED)
      .regex(/^[^0-9]*$/, ERROR_MESSAGES.MEDICO_SOLICITANTE.INVALID_FORMAT),
  lugarAtencion : z.string().trim().min(1, ERROR_MESSAGES.LUGAR_DE_ATENCION.REQUIRED),
  diasDeInternacion : z.coerce.number().positive(ERROR_MESSAGES.DIAS_DE_INTERNACION.NEGATIVE),
  observaciones : z.string().optional()
})