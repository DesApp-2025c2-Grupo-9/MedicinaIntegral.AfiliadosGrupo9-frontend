import Topbar from '../components/Topbar/Topbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

/* function MainFallbackFC({ error, resetErrorBoundary }) {
  const setResetErrorBoundary = useResetErrorBoundaryStore(state => state.setResetErrorBoundary);
  setResetErrorBoundary(resetErrorBoundary);

  return <div>Su sesión ha expirado: {error.message}</div>;
} */

function MainLayout() {
  /* const { reset } = useQueryErrorResetBoundary();
  const location = useLocation();
  const navigate = useNavigate(); */

  return (
/*     <ErrorBoundary
      onReset={reset}
      FallbackComponent={MainFallbackFC}
      onError={error => {
        console.log('Soy error en MainLayout', error)
        if (error.status === 401) navigate('/login', { replace: true, state: { from: location } });
      }}
    > */
    <>
      <Topbar className='mb-5 animate-topbar' />
      <div className='flex lg:gap-5 w-dvw lg:pr-10'>
        <div>
          <Sidebar className='min-h-[calc(100dvh-81px)] h-full hidden lg:flex lg:-translate-x-59 animate-sidebar' />
        </div>
        <div className='px-4 lg:px-0 w-full'>
          <Outlet />
        </div>
      </div>
    </>
    // </ErrorBoundary>
  );
}
export default MainLayout;
