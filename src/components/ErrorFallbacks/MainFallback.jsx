import { Link } from 'react-router-dom';
import { useResetErrorBoundaryStore } from '../../store/resetErrorBoundaryStore';
import { icons } from '../../utils/icons';

function MainFallback({ error, resetErrorBoundary }) {
  const setResetErrorBoundary = useResetErrorBoundaryStore(state => state.setResetErrorBoundary);
  setResetErrorBoundary(resetErrorBoundary);

  return (
    <div className='h-dvh flex flex-col items-center justify-center gap-4 p-4 md:p-10'>
      <div className='text-rojo-alerta w-24 md:w-32 aspect-square flex items-center justify-center'>{icons.sadFace}</div>
      <h2 className='text-[25px] md:text-[39.01px] font-bold md:leading-12 text-center'>Ups, ha ocurrido un error inesperado.</h2>
      <p className='font-mono text-base md:text-lg font-bold text-rojo-alerta text-center'>{error.message}</p>
      <p className='text-base md:text-xl text-center'>
        Por favor,{' '}
        <span
          className='font-bold text-menta-600 underline cursor-pointer'
          onClick={resetErrorBoundary}
        >
          refresque la página
        </span>{' '}
        o redirijase a{' '}
        <Link
          to='/'
          className='font-bold text-menta-600 underline'
          onClick={resetErrorBoundary}
        >
          Inicio
        </Link>{' '}
        para intentar nuevamente.
        <br />
        Si el problema continúa, reintente en otro momento.
      </p>
    </div>
  );
}
export default MainFallback;
