import { Link } from 'react-router-dom';
import { icons } from '../utils/icons';

function NoTurnosAvailable({ path = '' }) {
  return (
    <div className='flex gap-4 text-gris-placeholder'>
      <div className='w-full max-w-20'>{icons.noTurnos}</div>

      <div className='font-bold flex flex-col gap-1'>
        <p>No tiene ningún turno reservado.</p>
        <Link
          to={path}
          className='cursor-pointer border border-blue-500 text-blue-500 p-2 rounded-lg max-w-52 lg:w-fit lg:hover:bg-blue-200 text-center'
        >
          Reservar turno
        </Link>
      </div>
    </div>
  );
}
export default NoTurnosAvailable;
