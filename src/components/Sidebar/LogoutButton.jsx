import { icons } from '../../utils/icons';

function LogoutButton() {
  const handleClick = () => {
    console.log('Sesión cerrada.');
  }

  return (
    <button type='button' onClick={handleClick} className='flex w-5 aspect-square justify-center items-center hover:text-menta-200 cursor-pointer'>
      {icons.logout}
    </button>
  );
}
export default LogoutButton;
