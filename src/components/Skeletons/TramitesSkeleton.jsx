import SingleTramiteSkeleton from './SingleTramiteSkeleton';

function TramitesSkeleton() {
  return (
    <div className='flex flex-col md:flex-row md:flex-wrap gap-3'>
      {[...Array(4)].map((_, index) => (
        <SingleTramiteSkeleton key={index} />
      ))}
    </div>
  );
}
export default TramitesSkeleton;
