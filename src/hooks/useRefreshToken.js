import axios from '../api/axios';
import { useUserStore } from '../store/userStore';

function useRefreshToken() {
  const { user, setUser } = useUserStore(state => state);

  const refresh = async () => {
    const response = await axios.get('/api/auth/refresh-token', {
      withCredentials: true
    });
    setUser({ ...user, accessToken: response.data?.accessToken });
    console.log('Access token viejo', user);
    console.log('Access token nuevo', response.data);
    return response.data?.accessToken;
  };

  return refresh;
}

export default useRefreshToken;
