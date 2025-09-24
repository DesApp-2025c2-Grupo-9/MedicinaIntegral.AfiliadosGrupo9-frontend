import { icons } from '../../utils/icons';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Sesión cerrada.');
    navigate('/login');
  }

  return (
    <button type='button' onClick={handleClick} className='flex w-5 aspect-square justify-center items-center hover:text-menta-200 cursor-pointer'>
      {icons.logout}
    </button>
  );
}
export default LogoutButton;
