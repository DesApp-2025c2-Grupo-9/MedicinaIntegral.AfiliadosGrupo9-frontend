import { useState } from 'react';
import ListaFamiliares from './ListaFamiliares';
import clsx from 'clsx';
import { icons } from '../../utils/icons';
import { useGetAfiliado } from '../../services/queries';
import AvatarAfiliadoSkeleton from '../Skeletons/AvatarAfiliadoSkeleton';

function AvatarAfiliado({ className }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetAfiliado();

  if (isLoading) return <AvatarAfiliadoSkeleton />;

  const afiliado = data?.data;
  const inicialesUser = afiliado?.nombre?.charAt(0) + afiliado?.apellido?.charAt(0);

  return (
    <div className={`relative flex flex-col justify-center items-start lg:items-end gap-2 w-60 ${className}`}>
      <div
        onClick={() => {
          if (afiliado.grupoFamiliar.length > 1) {
            setIsOpen(!isOpen);
          }
        }}
        className='flex items-center gap-2 cursor-pointer select-none'
      >
        <div className='flex items-center justify-center w-9 aspect-square rounded-full bg-menta-600 text-blanco-principal text-xl font-bold text-center uppercase'>
          {inicialesUser}
        </div>
        <p className='uppercase text-center text-xl font-bold text-negro-principal'>{afiliado?.nombre}</p>
        {afiliado.grupoFamiliar.length > 1 && (
          <div className={clsx('w-[14px] transition-all text-negro-principal', { 'rotate-90': !isOpen, 'rotate-0': isOpen })}>{icons.chevronDown}</div>
        )}
      </div>

      <ListaFamiliares
        grupoFamiliar={afiliado.grupoFamiliar}
        className={clsx('lg:absolute -right-6 transition-all', {
          'absolute -top-108 opacity-0': !isOpen,
          'top-16 opacity-100': isOpen
        })}
        onClick={() => setIsOpen(false)}
        afiliado={afiliado}
        inicialesUser={inicialesUser}
      />
    </div>
  );
}
export default AvatarAfiliado;
