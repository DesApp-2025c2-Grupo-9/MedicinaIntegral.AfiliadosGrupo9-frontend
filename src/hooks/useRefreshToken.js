import axios from '../api/axios';
import { useUserStore } from '../store/userStore';

function useRefreshToken() {
  const { user, setUser } = useUserStore(state => state);

  const refresh = async () => {
    const response = await axios.get('/api/auth/refresh-token', { withCredentials: true });
    setUser({ ...user, accessToken: response.data?.accessToken });
    return response.data?.accessToken;
  };

  return refresh;
}

export default useRefreshToken;
