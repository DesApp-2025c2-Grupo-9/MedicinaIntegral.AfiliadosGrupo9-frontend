import { icons } from '../utils/icons';

function UsuarioActual({ prefix = 'Para', nombre = 'John Doe' }) {
  return (
    <div className='flex items-center gap-2 text-blanco-principal'>
      <div className='w-4 aspect-square'>{icons.usuario}</div>
      <p>
        {prefix} <b>{nombre}</b>
      </p>
    </div>
  );
}

export default UsuarioActual;
