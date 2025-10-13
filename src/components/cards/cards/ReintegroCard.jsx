import ColumnaPrincipal from './cardComponents/ColumnaPrincipal';
import UsuarioActual from './cardComponents/UsuarioActual';
import BotonEditar from './cardComponents/BotonEditar';
import BotonPapelera from './cardComponents/BotonPapelera';
import BotonObservaciones from './cardComponents/BotonObservaciones';
import MarcoCard from './cardComponents/MarcoCard';
import TipoDeTramite from './cardComponents/TipoDeTramite';
import { format, addDays } from 'date-fns';
import { useDeleteReintegro } from '../../../services/queries';
import Swal from 'sweetalert2';
import pesosArg from '../../../utils/pesosArg';
import { useState } from 'react';
import { useEditReintegroStep } from '../../../store/editReintegroStepStore';
import { useEditDatosFacturaHandler } from '../../../hooks/useEditDatosFacturaHandler';
import EditReintegroForm from '../../../pages/EditReintegroForm';
import EditDatosFacturaReintegroForm from '../../../pages/EditDatosFacturaReintegroForm';

function ReintegroCard(props) {
  const dashboard = props.dashboard || false;
  const reintegro = props.reintegro;
  const { mutateAsync } = useDeleteReintegro();
  const { currentStep, setCurrentStep } = useEditReintegroStep();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onSubmit: editDatosFactura } = useEditDatosFacturaHandler(reintegro, setIsModalOpen);
  const fechaDePrestacion = format(addDays(reintegro.fechaDePrestacion, 1), 'dd/MM/yyyy');
  const valorTotal = pesosArg.format(reintegro.factura.valorTotal);
  //Estilo de la card
  const cardStyle = 'grid-cols-2';

  const deleteReintegro = async () => {
    try {
      Swal.fire({
        html: `<p>Está a punto de cancelar la solicitud de reintegro:</p>
          <br />
          <p>Para afiliado: <b>${reintegro.paraAfiliado}</b></p>
          <p>Fecha de prestación: <b>${fechaDePrestacion}</b></p>
          <p>Especialidad: <b>${reintegro.especialidad}</b></p>
          <p>Lugar de atención: <b>${reintegro.lugarDeAtencion}</b></p>
          <p>Valor total: <b>${valorTotal}</b></p>
          <br />
          <p>¿Desea continuar?</p>
        `,
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#dc143c',
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#00ab01',
        customClass: {
          cancelButton: 'reintegros-cancel-button',
          confirmButton: 'reintegros-confirm-button'
        }
      }).then(async result => {
        try {
          if (result.isConfirmed) {
            const res = await mutateAsync(reintegro.id);
            Swal.fire({
              html: res.message,
              icon: 'success',
              confirmButtonText: 'Continuar',
              confirmButtonColor: '#00ab01'
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.close();
          }
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

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
              <BotonPapelera onClick={deleteReintegro} />
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
