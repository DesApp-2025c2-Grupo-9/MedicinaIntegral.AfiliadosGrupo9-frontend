import { useErrorBoundary } from 'react-error-boundary';
import Button from '../Button';
import { icons } from '../../utils/icons';

function InicioFallback() {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className='flex justify-center mt-32'>
        <div className='bg-red-50 xl:w-1/2 max-w-full border border-rojo-alerta rounded-lg flex flex-col gap-2 items-center py-24 px-4 text-center text-pretty'>
        <div className='text-rojo-alerta w-24 aspect-square'>{icons.errorInicio}</div>
        <h3 className='text-rojo-alerta text-2xl font-bold'>Ups, algo salió mal.</h3>
        <p>Ha ocurrido un error en <b>Inicio</b>. Por favor, reintente nuevamente.</p>
        <Button
            onClick={resetBoundary}
            className='bg-rojo-alerta hover:bg-red-300 mt-8 '>
            Reintentar
        </Button>
        </div>
    </div>
  );
}
export default InicioFallback;