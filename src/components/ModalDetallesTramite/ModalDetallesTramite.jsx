import clsx from 'clsx';
import { icons } from '../../utils/icons';

function ModalDetallesTramite({ estado, tramite, closeModalFn, isVisible, headerText }) {
  const keyValuesArr = Object.entries(tramite);
  const stateColor = {
    pendiente: '#FD7400',
    'en análisis': '#9C27B0',
    observado: '#1B76FF',
    aceptado: '#00AB01',
    rechazado: '#FF1D23'
  };

  return (
    <>
      {isVisible ? (
        <div className='fixed inset-0 flex items-center justify-center bg-negro-translucido z-10'>
          <div
            className={clsx('flex flex-col w-full max-w-[calc(100dvw-32px)] lg:max-w-150 gap-3 p-4 rounded-lg bg-fondo-documento shadow-custom-shadow', {
              'animate-modal': isVisible
            })}
          >
            <div
              className='flex items-center gap-2 w-fit cursor-pointer lg:hover:text-menta-200 transition-all'
              onClick={closeModalFn}
            >
              <div className='w-3 h-3 rotate-90'>{icons.chevronDown}</div>
              <p className='font-bold'>{headerText}</p>
            </div>

            <div className={`flex flex-col rounded-lg overflow-clip bg-[${stateColor[estado]}]`}>
              <div className='flex px-3 py-2 justify-center'>
                <p className='text-blanco-principal font-bold uppercase'>{estado}</p>
              </div>

              <div className={`flex flex-col bg-blanco-principal rounded-lg overflow-clip border border-[${stateColor[estado]}]`}>
                {keyValuesArr?.map(([key, value], index) => {
                  if (value) {
                    return (
                      <div
                        key={index}
                        className='text-sm flex justify-between even:bg-gris-border px-3 py-2'
                      >
                        <p className='font-bold w-fit select-none'>{key}:</p>
                        <p className='w-fit select-none'>{value}</p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default ModalDetallesTramite;
