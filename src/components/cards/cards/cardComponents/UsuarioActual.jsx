import { icons } from '../../../../utils/icons';

function UsuarioActual({ paciente = 'Jane Doe' }) {
  /*
    El usuario logueado actualmente, propietario de turnos y trámites.
    */
  return (
    <div className='flex items-center gap-1 mb-1 text-gray-600'>
      <div className='h-3 aspect-square'>{icons.usuario}</div>
      <p className='text-sm h-fit leading-3 text-nowrap'>{paciente}</p>
    </div>
  );
}

export default UsuarioActual;
