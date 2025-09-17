import Separador from '../Separador'
import AfiliadoOption from './AfiliadoOption'

function ListaFamiliares({ className }) {
  const familiares = [...Array(4)]; // De alguna manera, obtendremos los familiares (arreglo) del usuario actual

  return (
    <div className={`flex flex-col items-start w-60 pl-2 lg:p-4 lg:pb-5 gap-2 rounded-lg lg:border border-gris-border bg-blanco-principal lg:shadow-custom-shadow ${className}`}>
      <p className='text-negro-principal text-sm font-bold'>Ver como:</p>
      <Separador />
      {
        familiares.map((_, index) =>
          <AfiliadoOption key={index} />
        )
      }
    </div>
  )
}
export default ListaFamiliares