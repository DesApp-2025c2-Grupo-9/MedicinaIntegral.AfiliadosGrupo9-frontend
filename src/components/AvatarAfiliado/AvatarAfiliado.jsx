import { useState } from 'react';
import ListaFamiliares from './ListaFamiliares';
import clsx from 'clsx';
import { icons } from '../../utils/icons';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useGetAfiliado } from '../../services/queries';
import { useLocation, useNavigate } from 'react-router-dom';

function AvatarAfiliado({ className }) {
  const axiosPrivate = useAxiosPrivate();
  const { data, error, isLoading } = useGetAfiliado(axiosPrivate);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) return <p>Cargando...</p>;
  if (error) {
    navigate('/login', { state: { from: location }, replace: true });
  }

  const afiliado = data?.data;
  const inicialesUser = afiliado?.nombre?.charAt(0) + afiliado?.apellido?.charAt(0);

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
