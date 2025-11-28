import { Link } from 'react-router-dom';
import { icons } from '../utils/icons';

function NoTurnosAvailable({path = '' }) {
  return (
      <div className='flex items-center gap-4 pl-4 text-gris-placeholder'>
        <div>{icons.noTurnos}</div>
        <div className='font-bold flex flex-col gap-2'>
            <p className=''>No hay ningún turno reservado.</p>
            <Link to={path}><button className="cursor-pointer border border-blue-500 text-blue-500 py-2 px-2 rounded-lg w-full lg:w-fit hover:bg-blue-100" > Reservar nuevo turno </button></Link>
        </div>
      </div>
  );
}
export default NoTurnosAvailable;
