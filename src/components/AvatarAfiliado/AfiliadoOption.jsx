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
      className={clsx('flex gap-2 items-center p-2 rounded-full transition-all', {
        'text-negro-principal bg-fondo-documento hover:bg-menta-100 cursor-pointer': !isActive,
        'text-blanco-principal cursor-default bg-menta-600': isActive
      })}
      onClick={() => {
        if (user.idAfiliado !== afiliado.id) {
          handleClick();
        }
      }}
    >
      <div
        className={clsx('p-2 rounded-full border', {
          'border-fondo-documento bg-fondo-documento': !isActive,
          'border-blanco-principal bg-blanco-principal text-menta-600': isActive
        })}
      >
        <div className='h-4 aspect-square flex items-center justify-center'>{icons.usuario}</div>
      </div>
      <p
        className={clsx('text-sm', {
          'font-bold': isActive
        })}
      >
        {afiliado.nombre} {afiliado.apellido}
      </p>
      {isActive && <div className='w-4 aspect-square ml-auto mr-2'>{icons.aceptado}</div>}
    </div>
  );
}
export default AfiliadoOption;
