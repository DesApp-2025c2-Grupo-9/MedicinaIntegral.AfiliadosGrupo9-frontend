import { useErrorBoundary } from 'react-error-boundary';
import Button from '../Button';
import { icons } from '../../utils/icons';

function TramitesFallback({ tipoTramite = '' }) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className='bg-red-100 w-fit max-w-full p-4 border border-rojo-alerta rounded-lg text-rojo-alerta flex flex-col gap-2'>
      <div className='text-rojo-alerta w-20 aspect-square'>{icons.sadFace}</div>
      <h3 className='text-xl font-bold'>Ups, algo salió mal.</h3>
      <p>
        Ha ocurrido un error en la solicitud de <b>{tipoTramite}</b>. Por favor, reintente nuevamente.
      </p>
      <Button
        onClick={resetBoundary}
        className='bg-rojo-alerta hover:bg-red-300 mt-4'
      >
        Reintentar
      </Button>
    </div>
  );
}
export default TramitesFallback;
