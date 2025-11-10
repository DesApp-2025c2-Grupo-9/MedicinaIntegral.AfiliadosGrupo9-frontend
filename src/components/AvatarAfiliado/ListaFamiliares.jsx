import Separador from '../Separador';
import AfiliadoOption from './AfiliadoOption';

function ListaFamiliares({ className, grupoFamiliar, onClick, afiliado, inicialesUser }) {
  return (
    <div
      className={`flex flex-col items-center w-60 lg:w-92 pl-2 lg:p-4 lg:pb-5 gap-3 rounded-lg lg:border border-gris-border bg-blanco-principal lg:shadow-custom-shadow ${className}`}
    >
      <div className='w-18 aspect-square rounded-full bg-menta-600 flex items-center justify-center text-blanco-principal font-bold text-[39.06px]'>{inicialesUser}</div>
      <p className='font-bold text-xl'>
        {afiliado.nombre} {afiliado.apellido}
      </p>
      <Separador />
      <p className='text-negro-principal text-sm font-bold mr-auto'>Ver como miembro familiar:</p>
      <div className='w-full flex flex-col gap-1 bg-fondo-documento border border-gris-border p-1 rounded-[28px]'>
        {grupoFamiliar.map((afiliado, index) => (
          <AfiliadoOption
            key={index}
            afiliado={afiliado}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}
export default ListaFamiliares;
