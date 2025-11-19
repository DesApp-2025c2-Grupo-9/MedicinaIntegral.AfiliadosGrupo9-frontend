import { icons } from '../utils/icons';

function NoTramitesEstado({ tipoTramite = '', estado = '' }) {
  return (
    <div className='flex flex-col items-center gap-5 h-70 justify-center w-full'>
      <div className='max-w-72'>{icons.shrug}</div>
      <p className='text-center'>
        No hay {tipoTramite} en estado <span className='capitalize font-bold'>{estado}</span>.
      </p>
    </div>
  );
}
export default NoTramitesEstado;
