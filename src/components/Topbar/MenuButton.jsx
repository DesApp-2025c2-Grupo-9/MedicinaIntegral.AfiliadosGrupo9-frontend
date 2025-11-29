import { twMerge } from 'tailwind-merge';

function MenuButton({ children, className, onClick }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={twMerge('flex w-5 aspect-square justify-center items-center cursor-pointer', className)}
    >
      {children}
    </button>
  );
}
export default MenuButton;
