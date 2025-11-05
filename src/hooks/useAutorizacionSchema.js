import {z} from 'zod'

const ERROR_MESSAGES = {
  AFILIADO: {
    REQUIRED: 'Debe seleccionar un afiliado.'
  },
  PRACTICA: {
    REQUIRED: 'Debe ingresar una práctica.'
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
    REQUIRED: 'Debe ingresar una cantidad de dias.',
    INVALID_FORMAT: 'La cantidad debe expresarse con dígitos.'
  }
}

// const especialidadesRes = await getEspecialidades();

export const useAutorizacionSchema = data => {
//Esquema de solicitud utilizando zod
  const  autorizacionSchema = z.object({
    paraAfiliado: z.literal(data.listaAfiliados, ERROR_MESSAGES.AFILIADO.REQUIRED),
      fechaSolicitud: z.string({
        required_error: ERROR_MESSAGES.FECHA_SOLICITUD.REQUIRED,
      })
      .min(1, ERROR_MESSAGES.FECHA_SOLICITUD.REQUIRED)
      .transform((val) => new Date(val))
      .refine(
        (val) => {
          const hoy = new Date();
          hoy.setHours(0,0,0,0);
          return val >= hoy;
        },
        {message: ERROR_MESSAGES.FECHA_SOLICITUD.PAST_DATE}
      ),
      especialidad : z.literal(data.listaEspecialidades, ERROR_MESSAGES.ESPECIALIDAD.REQUIRED),
      practica : z.string().trim().min(3, ERROR_MESSAGES.PRACTICA.REQUIRED), 
      medicoSolicitante : z.string().trim().min(3, ERROR_MESSAGES.MEDICO_SOLICITANTE.REQUIRED),
      lugarAtencion : z.string().trim().min(3, ERROR_MESSAGES.LUGAR_DE_ATENCION.REQUIRED),
      diasDeInternacion : z.coerce.number().min(0, ERROR_MESSAGES.DIAS_DE_INTERNACION.REQUIRED),
      observaciones : z.string().optional()
  });
  return { autorizacionSchema };
}