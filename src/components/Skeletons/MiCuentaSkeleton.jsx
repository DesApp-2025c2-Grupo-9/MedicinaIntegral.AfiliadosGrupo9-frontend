import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SingleAfiliadoSkeleton from './SingleAfiliadoSkeleton';

function MiCuentaSkeleton() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-2'>
        <Skeleton
          height='28px'
          width='20%'
          baseColor='#cecece'
        />
        <SingleAfiliadoSkeleton />
      </div>
      <div className='flex flex-col gap-2'>
        <Skeleton
          height='28px'
          width='20%'
          baseColor='#cecece'
        />
        <div className='flex flex-col md:flex-row gap-3'>
          {[...Array(2)].map((_, index) => (
            <SingleAfiliadoSkeleton
              key={index}
              className='md:w-[348px] h-[138px]'
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default MiCuentaSkeleton;
