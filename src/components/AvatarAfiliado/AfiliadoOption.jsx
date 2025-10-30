import clsx from 'clsx';
import { icons } from '../../utils/icons';
import { useUserStore } from '../../store/userStore';

function AfiliadoOption({ afiliado = { nombre: 'John', apellido: 'Doe' }, onClick }) {
  const { user, setUser } = useUserStore(state => state);
  const isActive = user.idAfiliado === afiliado.id;

  const handleClick = () => {
    setUser({ ...user, idAfiliado: afiliado.id });
    onClick();
  };

  return (
    <div
      className={clsx('flex gap-2 items-center w-fit', {
        'text-negro-principal hover:text-menta-200 cursor-pointer': !isActive,
        'text-menta-600 cursor-default': isActive
      })}
      onClick={handleClick}
    >
      <div className='h-4 aspect-square flex items-center justify-center'>{icons.usuario}</div>
      <p className='text-sm'>
        {afiliado.nombre} {afiliado.apellido}
      </p>
    </div>
  );
}
export default AfiliadoOption;
