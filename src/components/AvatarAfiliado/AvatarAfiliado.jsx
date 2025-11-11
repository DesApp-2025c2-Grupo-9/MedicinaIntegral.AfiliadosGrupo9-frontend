import { useState } from 'react';
import ListaFamiliares from './ListaFamiliares';
import clsx from 'clsx';
import { icons } from '../../utils/icons';
import { useGetAfiliado } from '../../services/queries';
import AvatarAfiliadoSkeleton from '../Skeletons/AvatarAfiliadoSkeleton';

function AvatarAfiliado({ className, setIsHamburgerOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetAfiliado();

  if (isLoading) return <AvatarAfiliadoSkeleton />;

  const afiliado = data?.data;
  const inicialesUser = afiliado?.nombre?.charAt(0) + afiliado?.apellido?.charAt(0);

  return (
    <div className={`relative flex flex-col justify-center items-start lg:items-end gap-2 lg:w-60 ${className}`}>
      <div
        onClick={() => {
          if (afiliado.grupoFamiliar.length > 1) {
            setIsOpen(!isOpen);
          }
        }}
        className={clsx('flex items-center gap-2 select-none w-full lg:w-fit', {
          'cursor-pointer': afiliado.grupoFamiliar.length > 1,
          'cursor-default': !afiliado.grupoFamiliar.length > 1
        })}
      >
        <div className='flex items-center justify-center lg:w-9 aspect-square rounded-full bg-menta-600 text-blanco-principal text-xl font-bold text-center uppercase p-3 lg:p-0'>
          {inicialesUser}
        </div>
        <p className='uppercase text-center text-xl font-bold text-negro-principal'>
          {afiliado?.nombre} <span className='lg:hidden'>{afiliado?.apellido}</span>
        </p>
        {afiliado.grupoFamiliar.length > 1 && (
          <div className={clsx('w-5 lg:w-[14px] transition-all text-negro-principal ml-auto mr-4 lg:m-0', { 'rotate-90': !isOpen, 'rotate-0': isOpen })}>{icons.chevronDown}</div>
        )}
      </div>

      <ListaFamiliares
        grupoFamiliar={afiliado.grupoFamiliar}
        className={clsx('lg:absolute -right-4 transition-all', {
          'absolute -top-108 opacity-0': !isOpen,
          'top-14 opacity-100': isOpen
        })}
        onClick={() => {
          setIsHamburgerOpen && setIsHamburgerOpen(false);
          setIsOpen(false);
        }}
        afiliado={afiliado}
        inicialesUser={inicialesUser}
      />
    </div>
  );
}
export default AvatarAfiliado;
