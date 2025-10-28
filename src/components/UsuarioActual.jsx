import { icons } from '../utils/icons';

function UsuarioActual({ prefix = 'Para', nombre = 'John Doe' }) {
  return (
    <div className='flex items-center gap-2 text-sm text-gray-600'>
      <span className='w-4 h-4'>{icons.usuario}</span>
      <span>
        {prefix} {nombre}
      </span>
    </div>
  );
}

export default UsuarioActual;
