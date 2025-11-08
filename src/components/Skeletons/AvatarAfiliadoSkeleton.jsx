import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function AvatarAfiliadoSkeleton() {
  return (
    <div className='flex items-center gap-2 w-[147px] h-9 leading-1'>
      <Skeleton
        width='36px'
        height='36px'
        circle
        containerClassName='flex-1'
      />
      <Skeleton
        width='111px'
        height='28px'
        containerClassName='flex-1'
      />
    </div>
  );
}
export default AvatarAfiliadoSkeleton;
