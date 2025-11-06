import { twMerge } from 'tailwind-merge'


function SectionTitle({ children, className }) {
  return (
    <p className={twMerge(`text-menta-600 text-xl font-bold h-fit w-fit ${className}`)}>{children}</p>
  )
}
export default SectionTitle