import { useLocation } from 'react-router-dom';

export const usePathPartials = arr => {
  const location = useLocation();

  const isActive = arr.some(partialUrl => location.pathname.includes(partialUrl));

  return isActive;
};
