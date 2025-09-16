import Separador from '../Separador'
import AfiliadoOption from './AfiliadoOption'

function ListaFamiliares({ className }) {
  return (
    <div className={`flex flex-col w-60 p-4 pb-5 items-start gap-2 rounded-lg border border-gris-border bg-blanco-principal shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] ${className}`}>
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