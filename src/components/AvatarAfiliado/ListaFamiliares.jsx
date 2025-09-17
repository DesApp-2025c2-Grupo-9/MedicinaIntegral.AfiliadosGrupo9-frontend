import Separador from '../Separador'
import AfiliadoOption from './AfiliadoOption'

function ListaFamiliares({ className }) {
  return (
    <div className={`flex flex-col items-start w-60 pl-2 lg:p-4 lg:pb-5 gap-2 rounded-lg lg:border border-gris-border bg-blanco-principal lg:shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] ${className}`}>
      <p className='text-negro-principal text-sm font-bold'>Ver como:</p>
      <Separador />
      <AfiliadoOption />
      <AfiliadoOption />
      <AfiliadoOption />
      <AfiliadoOption />
    </div>
  )
}
export default ListaFamiliares