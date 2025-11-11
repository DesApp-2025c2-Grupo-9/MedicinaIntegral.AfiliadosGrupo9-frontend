import Separador from '../Separador';
import AfiliadoOption from './AfiliadoOption';

function ListaFamiliares({ className, grupoFamiliar, onClick, afiliado, inicialesUser }) {
  return (
    <div
      className={`flex flex-col items-center w-full lg:w-92 lg:p-4 gap-3 lg:rounded-lg lg:border border-gris-border lg:bg-blanco-principal lg:shadow-custom-shadow ${className}`}
    >
      <div className='w-18 aspect-square rounded-full bg-menta-600 hidden lg:flex items-center justify-center text-blanco-principal font-bold text-[39.06px]'>{inicialesUser}</div>
      <p className='font-bold text-xl hidden lg:flex'>
        {afiliado.nombre} {afiliado.apellido}
      </p>
      <Separador className='bg-menta-100 lg:bg-gris-border' />
      <p className='text-negro-principal text-sm font-bold mr-auto px-3'>Ver como miembro familiar:</p>
      <div className='w-full grid grid-cols-3 lg:flex lg:flex-col gap-2 lg:gap-1 lg:bg-fondo-documento lg:p-1 rounded-[28px]'>
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
