import { useEffect, useState } from 'react';
import ListaFamiliares from './ListaFamiliares';
import clsx from 'clsx';
import { icons } from '../../utils/icons';
import { useGetAfiliado /* useGetAfiliadoPublic */ } from '../../services/queries';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';

function AvatarAfiliado({ className }) {
  // const { data, error, isLoading } = useGetAfiliadoPublic();
  const { user, setUser } = useUserStore(state => state);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { data, error, isLoading, isError } = useGetAfiliado();

  useEffect(() => {
    setUser({ ...user, grupoFamiliar: data?.data.grupoFamiliar });
  }, [setUser, data]);

  if (isLoading) return <div>Cargando...</div>;
  if (isError && error.status === 401) {
    // Si el refresh token está vencido (401), redirigimos a /login para autenticarse
    return (
      <Navigate
        to='/login'
        state={{ from: location }}
        replace
      />
    );
  }
  if (isError) return <div>Error: {error.message}</div>;

  const afiliado = data?.data;
  const inicialesUser = afiliado?.nombre?.charAt(0) + afiliado?.apellido?.charAt(0);

  // setUser({ ...user, grupoFamiliar: afiliado.grupoFamiliar });

  return (
    <div className={`relative flex flex-col justify-center items-start lg:items-end gap-2 w-60 ${className}`}>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className='flex items-center gap-2 cursor-pointer select-none'
      >
        <div className='flex items-center justify-center w-9 aspect-square rounded-full bg-menta-600 text-blanco-principal text-xl font-bold text-center uppercase'>
          {inicialesUser}
        </div>
        <p className='uppercase text-center text-xl font-bold text-negro-principal'>{afiliado?.nombre}</p>
        <div className={clsx('w-[14px] transition-all text-negro-principal', { 'rotate-90': !isOpen, 'rotate-0': isOpen })}>{icons.chevronDown}</div>
      </div>

      <ListaFamiliares
        grupoFamiliar={afiliado.grupoFamiliar}
        className={clsx('lg:absolute transition-all', {
          'absolute -top-45 opacity-0': !isOpen,
          'top-11 opacity-100': isOpen
        })}
      />
    </div>
  );
}
export default AvatarAfiliado;
