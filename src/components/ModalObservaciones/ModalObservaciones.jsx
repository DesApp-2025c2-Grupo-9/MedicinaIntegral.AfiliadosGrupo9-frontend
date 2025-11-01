import { useState } from 'react';
import { icons } from '../../utils/icons';
import Input from '../Input';
import UsuarioActual from '../UsuarioActual';
import Button from '../Button';
import FechaIcono from '../FechaIcono';

function ModalObservaciones({
  open,
  onClose,
  nombreUsuario,
  prefix,
  observacionesTexto,
  headerText = 'Volver a',
  fechaEnvio,
  idTramite,
  onSubmit
}) {
  const [comentario, setComentario] = useState('');

  if (!open) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-negro-translucido z-50'>
      {/* Caja externa */}
      <div
        className='flex flex-col w-[720px] p-3 gap-3 rounded-lg border border-gris-border
       bg-fondo-documento shadow-custom-shadow'
      >
        {/* Header */}
        <div
          className='flex justify-between items-start p-2  border-gris-border cursor-pointer'
          onClick={onClose}
        >
          <div className='flex items-center gap-2'>
            <span className='w-4 h-4'>{icons.flechaVolver}</span>
            <span className='font-bold'>{headerText}</span>
          </div>
        </div>

        {/* Usuario,calendario y observaciones*/}
        <div className='border border-gray-300 rounded-lg  flex flex-col  bg-blanco-principal'>
          {/* Usuario y calendario */}
          <div
            className='flex justify-between items-center w-full py-3 px-4 bg-menta-100 border-b
           border-gris-border'
          >
            <UsuarioActual
              prefix={prefix}
              nombre={nombreUsuario}
            />
            <FechaIcono fecha={fechaEnvio} />
          </div>

          {/* Observaciones */}
          <div className='flex flex-col gap-2 p-3 px-4  bg-blanco-principal rounded  min-h-[128px]'>
            <label className='text-base font-bold w-fit select-none'>Observaciones:</label>
            <p className='text-sm font-medium text-negro-principal'>{observacionesTexto || 'Sin observaciones'}</p>
          </div>
        </div>
        {/* Comentario prestador */}
        <div className='flex flex-col gap-2 rounded  min-h-[128px]'>
          <Input
            label='Comentario:'
            isTextArea={true}
            value={comentario}
            onChange={e => setComentario(e.target.value)}
          />
        </div>

        {/* Botón enviar */}

        <div className='flex justify-end'>
          <Button
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
    </div>
  );
}

export default ModalObservaciones;
