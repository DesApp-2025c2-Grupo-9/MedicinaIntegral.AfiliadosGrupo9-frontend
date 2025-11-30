import clsx from 'clsx';
import { icons } from '../../utils/icons';
import UsuarioActual from '../UsuarioActual';
import { useEffect } from 'react';

function ModalSituacionTerapeutica({ open, onClose, prefix, nombreUsuario, diagnosticoTexto, headerText = 'Volver' }) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, []);
  
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

        {/* Usuario y situacion terapeutica*/}
        <div className='flex flex-col rounded-lg overflow-clip'>
          {/* Usuario*/}
          <div className='flex justify-center p-3 bg-menta-600'>
            <UsuarioActual
              prefix={prefix}
              nombre={nombreUsuario}
            />
          </div>

          {/* Diagnóstico principal */}
          <div className='p-3 flex flex-col gap-2 bg-blanco-principal border border-gris-border border-t-0 rounded-b-lg'>
            <p className='font-bold w-fit select-none'>Diagnóstico principal:</p>
            <div className='flex gap-2 text-sm'>
              <span>•</span>
              <p className='font-medium text-negro-principal min-h-28'>{diagnosticoTexto || 'No hay observaciones.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalSituacionTerapeutica;
