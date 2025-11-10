import axios from '../api/axios';
import { useUserStore } from '../store/userStore';

function useRefreshToken() {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  const refresh = async () => {
    const response = await axios.get('/api/auth/refresh-token', { withCredentials: true });
    const accessToken = response?.data?.accessToken;
    setUser({ ...user, accessToken });
    return accessToken;
  };

  return refresh;
}

export default useRefreshToken;
