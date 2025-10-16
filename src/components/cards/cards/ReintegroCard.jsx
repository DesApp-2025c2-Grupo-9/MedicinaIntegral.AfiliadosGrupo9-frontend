import ColumnaPrincipal from './cardComponents/ColumnaPrincipal';
import UsuarioActual from './cardComponents/UsuarioActual';
import BotonEditar from './cardComponents/BotonEditar';
import BotonPapelera from './cardComponents/BotonPapelera';
import BotonObservaciones from './cardComponents/BotonObservaciones';
import MarcoCard from './cardComponents/MarcoCard';
import TipoDeTramite from './cardComponents/TipoDeTramite';
import { format, addDays } from 'date-fns';
import pesosArg from '../../../utils/pesosArg';
import { useState } from 'react';
import { useEditReintegroStep } from '../../../store/editReintegroStepStore';
import { useEditDatosFacturaHandler } from '../../../hooks/useEditDatosFacturaHandler';
import EditReintegroForm from '../../../pages/EditReintegroForm';
import EditDatosFacturaReintegroForm from '../../../pages/EditDatosFacturaReintegroForm';
import { useDelReintegro } from '../../../hooks/useDeleteReintegro';

function ReintegroCard(props) {
  const dashboard = props.dashboard || false;
  const reintegro = props.reintegro;
  const { deleteReintegro } = useDelReintegro();
  const { currentStep, setCurrentStep } = useEditReintegroStep();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onSubmit: editDatosFactura } = useEditDatosFacturaHandler(reintegro, setIsModalOpen);
  const fechaDePrestacion = format(addDays(reintegro.fechaDePrestacion, 1), 'dd/MM/yyyy');
  const valorTotal = pesosArg.format(reintegro.factura.valorTotal);
  //Estilo de la card
  const cardStyle = 'grid-cols-2';

  return (
    <>
      {isModalOpen && (
        <div className='bg-negro-translucido fixed top-0 left-0 w-dvw h-dvh z-10 flex items-center justify-center'>
          {currentStep === 1 ? (
            <EditReintegroForm
              className='w-full'
              reintegro={reintegro}
              cancelBtnOnClick={() => setIsModalOpen(false)}
            />
          ) : (
            currentStep === 2 && (
              <EditDatosFacturaReintegroForm
                className='w-full max-h-[calc(100dvh-40px)] overflow-y-scroll scroll-hidden'
                reintegro={reintegro}
                cancelBtnOnClick={() => setCurrentStep(1)}
                onSubmit={editDatosFactura}
              />
            )
          )}
        </div>
      )}

      <MarcoCard
        estilo={cardStyle}
        estado={reintegro.estado}
      >
        <ColumnaPrincipal>
          {reintegro.especialidad}

          {`Dr. ${reintegro.medico}`}
          {`Fecha de la prestación: ${fechaDePrestacion}`}
          {valorTotal}
          {reintegro.lugarDeAtencion}
        </ColumnaPrincipal>
        {/**Columna dinámica con opciones o información del trámite */}
        <div className='grid grid-rows-4 justify-items-end relative'>
          {/*El estilo del estado es dinámico si está o no en el dashboard*/}
          {props.dashboard ? ( //Si es card de dashboard mostrar el tipo de tramite
            <TipoDeTramite tipo={'Reintegro'} />
          ) : (
            <>
              <UsuarioActual paciente={reintegro.paraAfiliado} />
              {reintegro.estado !== 'pendiente' ? ( //el estado está en minuscula
                <div className='row-start-4'>
                  <BotonObservaciones />
                </div>
              ) : (
                <></>
              )}
            </>
          )}
          {/*Aca si el estado es pendiente se puede modificar o elimnar la receta */}
          {reintegro.estado == 'pendiente' && dashboard == false ? ( //El estado está en minuscula
            <div className='flex items-baseline-last justify-end row-start-4'>
              <BotonEditar onClick={() => setIsModalOpen(true)} />
              <BotonPapelera onClick={() => deleteReintegro(reintegro, fechaDePrestacion, valorTotal)} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </MarcoCard>
    </>
  );
}

export default ReintegroCard;
