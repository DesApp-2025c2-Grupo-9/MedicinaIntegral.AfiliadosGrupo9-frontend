import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from './Button';
import { useResetDemoData } from '../hooks/useResetDemoData';

function DemoResetButton({ className }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const resetDemoMutation = useResetDemoData();

  const handleResetDemoData = async () => {
    try {
      await resetDemoMutation.mutateAsync();
      setConfirmOpen(false);
      toast.success('Los datos de demostración fueron restablecidos.');
    } catch (error) {
      const message = error?.response?.data?.message || 'No se pudieron restablecer los datos de demostración.';
      toast.error(message);
    }
  };

  return (
    <>
      <Button
        type='button'
        style='outln'
        className={className}
        disabled={resetDemoMutation.isPending}
        isLoading={resetDemoMutation.isPending}
        onClick={() => setConfirmOpen(true)}
      >
        Restablecer datos de demostración
      </Button>

      {confirmOpen && (
        <div
          className='demo-reset-dialog__backdrop'
          onClick={() => !resetDemoMutation.isPending && setConfirmOpen(false)}
        >
          <div
            className='demo-reset-dialog'
            role='dialog'
            aria-modal='true'
            aria-labelledby='demo-reset-title'
            aria-describedby='demo-reset-description'
            onClick={e => e.stopPropagation()}
          >
            <h3 id='demo-reset-title'>Restablecer datos de demostración</h3>
            <p id='demo-reset-description'>
              ¿Desea restablecer los datos de demostración? Esta acción eliminará todos los cambios realizados y restaurará el estado inicial de la aplicación.
            </p>

            <div className='demo-reset-dialog__actions'>
              <Button
                type='button'
                style='outln'
                state={resetDemoMutation.isPending ? 'disabled' : 'active'}
                className='demo-reset-dialog__button'
                onClick={() => setConfirmOpen(false)}
                disabled={resetDemoMutation.isPending}
              >
                Cancelar
              </Button>

              <Button
                type='button'
                state={resetDemoMutation.isPending ? 'disabled' : 'active'}
                className='demo-reset-dialog__button'
                onClick={handleResetDemoData}
                disabled={resetDemoMutation.isPending}
                isLoading={resetDemoMutation.isPending}
              >
                Restablecer
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DemoResetButton;