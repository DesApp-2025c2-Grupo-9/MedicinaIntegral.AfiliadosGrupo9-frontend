import { icons } from '../utils/icons';

function FechaIcono({ fecha = '2025-10-10' }) {
  // Si llega como string o Date se convierte a Date
  const dateObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
  const fechaFormateada = dateObj.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className='flex items-center gap-2 text-blanco-principal'>
      <div className='w-4 aspect-square'>{icons.turnos}</div>
      <b>{fechaFormateada}</b>
    </div>
  );
}

export default FechaIcono;
