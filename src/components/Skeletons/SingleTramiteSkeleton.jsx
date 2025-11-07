import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SingleTramiteSkeleton() {
  return (
    <div className='h-[149px] w-full md:w-[calc(50%-12px)] p-3 rounded-lg bg-gris-border flex flex-col justify-between shadow-custom-shadow'>
      <Skeleton width='24%' />
      <Skeleton width='32%' />
      <Skeleton width='40%' />
      <Skeleton width='16%' />
      <Skeleton width='24%' />
    </div>
  );
}
export default SingleTramiteSkeleton;
