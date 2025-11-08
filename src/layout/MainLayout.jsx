import Topbar from '../components/Topbar/Topbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import MainFallback from '../components/ErrorFallbacks/MainFallback';

function MainLayout() {
  const { reset } = useQueryErrorResetBoundary();
  const location = useLocation();
  const navigate = useNavigate();

  const handleError = error => {
    if (error.message.includes('401')) {
      navigate('/login', { replace: true, state: { from: location } });
    }
  };

  return (
    <ErrorBoundary
      onReset={reset}
      FallbackComponent={MainFallback}
      // onError={handleError} // Descomentar para ser redirigido a /login cuando error.status === 401
    >
      <Topbar className='mb-5 animate-topbar' />
      <div className='flex lg:gap-5 w-dvw lg:pr-10'>
        <div>
          <Sidebar className='min-h-[calc(100dvh-81px)] h-full hidden lg:flex lg:-translate-x-59 animate-sidebar' />
        </div>
        <div className='px-4 lg:px-0 w-full'>
          <Outlet />
        </div>
      </div>
    </ErrorBoundary>
  );
}
export default MainLayout;
