import { Link } from 'react-router-dom';
import { icons } from '../utils/icons';

function NoTramitesAvailable({ tipoTramite = '', path = '' }) {
  return (
    <div className='flex flex-col items-center gap-5 h-70 justify-center text-gris-placeholder'>
      <div className='max-w-72'>{icons.shrug}</div>
      <p className='font-bold text-center'>
        No tiene ninguna solicitud de {tipoTramite}.{' '}
        <Link
          to={path}
          className='text-menta-600 underline'
        >
          Solicitar nuevo {tipoTramite}
        </Link>
        .
      </p>
    </div>
  );
}
export default NoTramitesAvailable;
