import Topbar from '../components/Topbar/Topbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import MainFallback from '../components/ErrorFallbacks/MainFallback';
import { ToastContainer } from 'react-toastify';
import { useUserStore } from '../store/userStore';

function MainLayout() {
  const { reset } = useQueryErrorResetBoundary();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  const handleError = error => {
    if (error?.response?.status === 401) {
      navigate('/login', { replace: true, state: { from: location } });
      setUser({ ...user, accessToken: undefined });
    }
  };

  return (
    <ErrorBoundary
      onReset={reset}
      FallbackComponent={MainFallback}
      onError={handleError}
    >
      <Topbar className='mb-5 animate-topbar' />
      <ToastContainer
        containerId='toasty'
        limit={1}
      />
      <div className='flex lg:gap-5 w-full lg:w-dvw lg:pr-10'>
        <div>
          <Sidebar className='hidden lg:flex lg:-translate-x-59 min-h-[calc(100dvh-81px)] h-full animate-sidebar' />
        </div>
        <div className='px-4 lg:px-0 w-full'>
          <Outlet />
        </div>
      </div>
    </ErrorBoundary>
  );
}
export default MainLayout;
