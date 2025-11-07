import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SingleTurnoSkeleton from './SingleTurnoSkeleton';

function TurnosSkeleton() {
  return (
    <div className='flex flex-col gap-3'>
      <Skeleton
        height='28px'
        width='36%'
        baseColor='#cecece'
      />
      <div className='flex flex-col md:flex-row flex-wrap gap-3'>
        {[...Array(9)].map((_, index) => (
          <SingleTurnoSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
export default TurnosSkeleton;
