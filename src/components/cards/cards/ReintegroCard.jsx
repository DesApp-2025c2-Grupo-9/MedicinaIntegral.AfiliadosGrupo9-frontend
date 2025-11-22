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
import { useDelReintegro } from '../../../hooks/useDeleteReintegro';
import ModalObservaciones from '../../ModalObservaciones/ModalObservaciones';
import { useCommentReintegro } from '../../../hooks/useCommentReintegro';
import { useNavigate } from 'react-router-dom';
import { useReintegroStore } from '../../../store/reintegroStore';
import Swal from 'sweetalert2';
import { useUserStore } from '../../../store/userStore';

function ReintegroCard(props) {
  const dashboard = props.dashboard || false;
  const reintegro = props.reintegro;
  const { deleteReintegro } = useDelReintegro();
  const fechaDePrestacion = format(addDays(reintegro.fechaDePrestacion, 1), 'dd/MM/yyyy');
  const valorTotal = pesosArg.format(reintegro.factura.valorTotal);
  const navigate = useNavigate();

  const user = useUserStore(state => state.user);
  const rolSesion = user?.rolSesion;
  const showButtons = rolSesion === 'Titular' && reintegro?.rolAfiliado === 'Cónyuge';

  //Estilo de la card
  const cardStyle = 'grid-cols-2';

  const [isObservacionesOpen, setIsObservacionesOpen] = useState(false);
  const observacionPrestador = reintegro?.observaciones?.find(observacion => observacion.rolEmisor === 'Prestador');
  const { onSubmit: commentReintegro } = useCommentReintegro();
  const setReintegro = useReintegroStore(state => state.setReintegro);

  const mostrarObservacionesRechazado = () => {
    Swal.fire({
      icon: 'error',
      iconColor: '#dc143c',
      titleText: 'Motivo de rechazo:',
      text: observacionPrestador?.descripcion,
      confirmButtonText: 'Continuar',
      customClass: {
        title: 'swal-title',
        htmlContainer: 'swal-html',
        confirmButton: 'swal-confirm-button'
      }
    });
  };

  return (
    <>
      <ModalObservaciones
        open={isObservacionesOpen}
        onClose={() => setIsObservacionesOpen(false)}
        nombreUsuario={reintegro.paraAfiliado}
        headerText='Volver a Reintegros'
        fechaEnvio={observacionPrestador?.fecha}
        observacionesTexto={observacionPrestador?.descripcion}
        idTramite={reintegro.id}
        onSubmit={commentReintegro}
      />

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
            <>
              <div>
                <UsuarioActual paciente={reintegro.paraAfiliado} />
              </div>
              <div>
                <TipoDeTramite tipo={'Reintegro'} />
              </div>
            </>
          ) : (
            <>
              <UsuarioActual paciente={reintegro.paraAfiliado} />
              {reintegro.estado !== 'pendiente' && reintegro.estado !== 'aceptado' && reintegro.estado !== 'en análisis' ? ( //el estado está en minuscula
                !showButtons && (
                  <div className='row-start-4'>
                    <BotonObservaciones
                      onClick={() => {
                        if (reintegro.estado === 'observado') {
                          setIsObservacionesOpen(true);
                        } else if (reintegro.estado === 'rechazado') {
                          mostrarObservacionesRechazado();
                        }
                      }}
                    />
                  </div>
                )
              ) : (
                <></>
              )}
            </>
          )}
          {/*Aca si el estado es pendiente se puede modificar o elimnar la receta */}
          {reintegro.estado == 'pendiente' && dashboard == false ? ( //El estado está en minuscula
            !showButtons && (
              <div className='flex items-baseline-last justify-end row-start-4'>
                <BotonEditar
                  onClick={() => {
                    setReintegro(reintegro);
                    navigate('/reintegros/editar-reintegro');
                  }}
                />
                <BotonPapelera onClick={() => deleteReintegro(reintegro, fechaDePrestacion, valorTotal)} />
              </div>
            )
          ) : (
            <></>
          )}
        </div>
      </MarcoCard>
    </>
  );
}

export default ReintegroCard;
