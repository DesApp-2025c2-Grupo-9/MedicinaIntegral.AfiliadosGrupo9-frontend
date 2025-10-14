import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

function RequireAuth() {
  const { user } = useUserStore();
  const location = useLocation();

  return user?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate
      to='/login'
      state={{ from: location }}
      replace
    />
  );
}

export default RequireAuth;
