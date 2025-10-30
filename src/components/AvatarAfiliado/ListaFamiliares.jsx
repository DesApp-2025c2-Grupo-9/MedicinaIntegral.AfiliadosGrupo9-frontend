import Separador from '../Separador';
import AfiliadoOption from './AfiliadoOption';

function ListaFamiliares({ className, grupoFamiliar, onClick }) {
  return (
    <div className={`flex flex-col items-start w-60 pl-2 lg:p-4 lg:pb-5 gap-2 rounded-lg lg:border border-gris-border bg-blanco-principal lg:shadow-custom-shadow ${className}`}>
      <p className='text-negro-principal text-sm font-bold'>Ver como:</p>
      <Separador />
      {grupoFamiliar.map((afiliado, index) => (
        <AfiliadoOption
          key={index}
          afiliado={afiliado}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
export default ListaFamiliares;
