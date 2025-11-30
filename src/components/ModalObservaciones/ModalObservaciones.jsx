import { useEffect, useState } from 'react';
import { icons } from '../../utils/icons';
import Input from '../Input';
import UsuarioActual from '../UsuarioActual';
import Button from '../Button';
import FechaIcono from '../FechaIcono';
import clsx from 'clsx';

function ModalObservaciones({ open, onClose, nombreUsuario, prefix, observacionesTexto, headerText = 'Volver a', fechaEnvio, idTramite, onSubmit }) {
  const [comentario, setComentario] = useState('');

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [open]);

  if (!open) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-negro-translucido z-10'>
      {/* Caja externa */}
      <div
        className={clsx('flex flex-col w-full max-w-[calc(100dvw-32px)] lg:max-w-180 gap-3 p-4 rounded-lg bg-fondo-documento shadow-custom-shadow', {
          'animate-modal': open
        })}
      >
        {/* Header */}
        <div
          className='flex items-center gap-2 w-fit cursor-pointer lg:hover:text-menta-200 transition-all'
          onClick={onClose}
        >
          <div className='w-3 h-3 rotate-90'>{icons.chevronDown}</div>
          <p className='font-bold'>{headerText}</p>
        </div>

        {/* Usuario,calendario y observaciones*/}
        <div className='flex flex-col rounded-lg overflow-clip'>
          {/* Usuario y calendario */}
          <div className='flex justify-between p-3 bg-menta-600'>
            <UsuarioActual
              prefix={prefix}
              nombre={nombreUsuario}
            />
            <FechaIcono fecha={fechaEnvio} />
          </div>

          {/* Observaciones */}
          <div className='p-3 flex flex-col gap-2 bg-blanco-principal border border-gris-border border-t-0 rounded-b-lg'>
            <p className='font-bold w-fit select-none'>Observaciones:</p>
            <div className='flex gap-2 text-sm'>
              <span>•</span>
              <p className='font-medium text-negro-principal min-h-28'>{observacionesTexto || 'No hay observaciones.'}</p>
            </div>
          </div>
        </div>

        {/* Comentario prestador */}
        <Input
          label='Comentario:'
          isTextArea
          value={comentario}
          onChange={e => setComentario(e.target.value)}
        />

        {/* Botón enviar */}

        <Button
          className='ml-auto'
          state={comentario ? 'active' : 'disabled'}
          disabled={!comentario}
          onClick={async () => {
            setComentario('');
            await onSubmit({ comentario, id: idTramite });
            onClose();
          }}
        >
          Enviar
        </Button>
      </div>
    </div>
  );
}

export default ModalObservaciones;
