import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { twMerge } from 'tailwind-merge';

function SingleTurnoSkeleton({ className }) {
  return (
    <div className={twMerge('h-[138px] w-full md:w-[calc(33.33%-12px)] p-3 rounded-lg bg-gris-border flex flex-col justify-between shadow-custom-shadow', className)}>
      <Skeleton width='24%' />
      <Skeleton width='32%' />
      <Skeleton width='40%' />
      <Skeleton width='16%' />
      <Skeleton width='24%' />
    </div>
  );
}
export default SingleTurnoSkeleton;