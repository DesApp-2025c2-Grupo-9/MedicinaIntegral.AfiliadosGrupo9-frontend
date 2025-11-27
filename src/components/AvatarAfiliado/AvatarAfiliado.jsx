import { useState } from 'react';
import ListaFamiliares from './ListaFamiliares';
import clsx from 'clsx';
import { icons } from '../../utils/icons';
import { useGetAfiliado } from '../../services/queries';
import AvatarAfiliadoSkeleton from '../Skeletons/AvatarAfiliadoSkeleton';
import { twMerge } from 'tailwind-merge';
import { useUserStore } from '../../store/userStore';
import { toast } from 'react-toastify';

function AvatarAfiliado({ className, setIsHamburgerOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetAfiliado();
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  if (isLoading) return <AvatarAfiliadoSkeleton />;

  const afiliado = data?.data;
  const inicialesUser = afiliado?.nombre?.charAt(0) + afiliado?.apellido?.charAt(0);

  const grupoFamiliar = afiliado?.grupoFamiliar;
  const afiliadoActual = grupoFamiliar?.find(familiar => familiar?.id === user?.idAfiliado);

  const toastContent = (
    <p className='text-sm text-negro-principal w-full text-center'>
      Viendo como{' '}
      <b className='text-menta-600'>
        {afiliado?.nombre} {afiliado?.apellido}
      </b>
    </p>
  );
  const handleClick = () => {
    setUser({ ...user, idAfiliado: afiliado?.id });
    toast.dismiss();
    toast(toastContent, {
      position: 'top-center',
      hideProgressBar: true,
      closeButton: false,
      autoClose: 3000,
      containerId: 'toasty',
      className: 'border border-menta-600 shadow-custom-shadow',
      style: { backgroundColor: '#e2ffe2', width: '360px', borderRadius: '8px' }
    });
  };

  return (
    <div className={twMerge('relative flex flex-col justify-center items-start lg:items-end gap-2 lg:w-60', className)}>
      {afiliado?.id !== user?.idAfiliado && (
        <div className='hidden absolute text-sm lg:flex items-center gap-1.5 right-41 whitespace-nowrap opacity-75 border border-gris-border rounded-full p-1 pl-3'>
          <p>
            Viendo como{' '}
            <span className='font-bold text-menta-600'>
              {afiliadoActual?.nombre} {afiliadoActual?.apellido}
            </span>
          </p>
          <div
            className='p-1.5 rounded-full flex justify-center items-center border border-gris-placeholder text-gris-placeholder cursor-pointer scale-90 hover:scale-110 transition-transform'
            onClick={handleClick}
          >
            <div className='w-2.5 aspect-square'>{icons.cerrar}</div>
          </div>
        </div>
      )}

      <div
        onClick={() => {
          if (grupoFamiliar.length > 1) {
            setIsOpen(!isOpen);
          }
        }}
        className={clsx('flex items-center gap-2 select-none w-full lg:w-fit', {
          'cursor-pointer': grupoFamiliar.length > 1,
          'cursor-default': !grupoFamiliar.length > 1
        })}
      >
        <div className='flex items-center justify-center lg:w-9 aspect-square rounded-full bg-menta-600 text-blanco-principal text-xl font-bold text-center uppercase p-3 lg:p-0'>
          {inicialesUser}
        </div>
        <p className='uppercase text-center text-xl font-bold text-negro-principal'>
          {afiliado?.nombre} <span className='lg:hidden'>{afiliado?.apellido}</span>
        </p>
        {afiliado?.grupoFamiliar.length > 1 && (
          <div className={clsx('w-5 lg:w-3.5 transition-all text-negro-principal ml-auto mr-4 lg:m-0', { 'rotate-90': !isOpen, 'rotate-0': isOpen })}>{icons.chevronDown}</div>
        )}
      </div>

      <ListaFamiliares
        grupoFamiliar={grupoFamiliar}
        className={clsx('lg:absolute -right-4 transition-all', {
          'absolute -top-136 opacity-0': !isOpen,
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
