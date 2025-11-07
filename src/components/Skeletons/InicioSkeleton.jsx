import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SingleTurnoSkeleton from './SingleTurnoSkeleton';

function InicioSkeleton() {
  return (
    <div className='flex flex-col gap-3'>
      <Skeleton
        height='28px'
        width='36%'
        baseColor='#cecece'
      />
      <div className='flex flex-col md:flex-row flex-wrap gap-3'>
        {[...Array(6)].map((_, index) => (
          <SingleTurnoSkeleton key={index} className='md:w-[calc(50%-12px)]' />
        ))}
      </div>
    </div>
  );
}
export default InicioSkeleton;
