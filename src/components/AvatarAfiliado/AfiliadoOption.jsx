import clsx from 'clsx';
import { icons } from '../../utils/icons';
import { useUserStore } from '../../store/userStore';
import { toast } from 'react-toastify';

function AfiliadoOption({ afiliado = { nombre: 'John', apellido: 'Doe' }, onClick }) {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const isActive = user.idAfiliado === afiliado.id;

  const toastContent = (
    <p className='text-sm text-negro-principal w-full text-center'>
      Viendo como{' '}
      <b className='text-menta-600'>
        {afiliado.nombre} {afiliado.apellido}
      </b>
    </p>
  );

  const handleClick = () => {
    setUser({ ...user, idAfiliado: afiliado.id });
    onClick();
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
