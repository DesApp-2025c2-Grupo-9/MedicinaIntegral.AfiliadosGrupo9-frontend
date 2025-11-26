import { twMerge } from 'tailwind-merge';

function InputContainer({ children, className }) {
  return <div className={twMerge('flex flex-col md:flex-row self-stretch items-center gap-4', className)}>{children}</div>;
}
export default InputContainer;
