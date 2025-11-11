import { twMerge } from 'tailwind-merge'

function Separador({ className }) {
  return (
    <div className={twMerge('h-[1px] self-stretch bg-gris-border', className)}></div>
  )
}
export default Separador